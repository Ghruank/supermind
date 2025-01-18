from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
import uuid
from dotenv import load_dotenv
import os

app = Flask(__name__)
bcrypt = Bcrypt(app)

# Load environment variables
load_dotenv()

# Validate environment variables
required_env_vars = ['DATASTAX_USERNAME', 'DATASTAX_PASSWORD', 'DATASTAX_SECURE_CONNECT_BUNDLE', 'DATASTAX_KEYSPACE']
for var in required_env_vars:
    if not os.getenv(var):
        raise EnvironmentError(f"Missing required environment variable: {var}")

# Print the secure connect bundle path for debugging
print(f"Secure connect bundle path: {os.getenv('DATASTAX_SECURE_CONNECT_BUNDLE')}")

# DataStax connection setup
auth_provider = PlainTextAuthProvider(
    username=os.getenv('DATASTAX_USERNAME'),
    password=os.getenv('DATASTAX_PASSWORD')
)
cluster = Cluster(
    cloud={'secure_connect_bundle': os.getenv('DATASTAX_SECURE_CONNECT_BUNDLE')},
    auth_provider=auth_provider
)
session = cluster.connect(os.getenv('DATASTAX_KEYSPACE'))

# Create users table and email index if not exists
session.execute("""
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    name TEXT,
    email TEXT,
    password TEXT,
    date_of_birth DATE,
    time TEXT,
    gender TEXT,
    state TEXT,
    city TEXT
)
""")
session.execute("""
CREATE INDEX IF NOT EXISTS ON users (email);
""")

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json

        # Validate required fields
        required_fields = ['name', 'email', 'password', 'date_of_birth', 'time', 'gender', 'state', 'city']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Hash password and insert user
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user_id = uuid.uuid4()
        session.execute("""
        INSERT INTO users (id, name, email, password, date_of_birth, time, gender, state, city)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (user_id, data['name'], data['email'], hashed_password, data['date_of_birth'],
              data['time'], data['gender'], data['state'], data['city']))
        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        return jsonify({'error': 'Failed to register user'}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json

        # Validate required fields
        if 'email' not in data or 'password' not in data:
            return jsonify({'error': 'Missing email or password'}), 400

        email = data['email']
        password = data['password']

        # Query user by email
        user = session.execute("SELECT * FROM users WHERE email=%s", (email,)).one()
        if user and bcrypt.check_password_hash(user.password, password):
            return jsonify({
                'id': str(user.id),
                'name': user.name,
                'email': user.email,
                'date_of_birth': str(user.date_of_birth),
                'time': user.time,
                'gender': user.gender,
                'state': user.state,
                'city': user.city
            }), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401

    except Exception as e:
        return jsonify({'error': 'Failed to log in'}), 500

@app.route('/test', methods=['POST'])
def test():
    try:
        data = request.json

        # Validate required fields
        required_fields = ['name', 'email', 'password', 'date_of_birth', 'time', 'gender', 'state', 'city']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Hash password and insert user
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user_id = uuid.uuid4()
        session.execute("""
        INSERT INTO users (id, name, email, password, date_of_birth, time, gender, state, city)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (user_id, data['name'], data['email'], hashed_password, data['date_of_birth'],
              data['time'], data['gender'], data['state'], data['city']))

        # Fetch the user data from the database
        user = session.execute("SELECT * FROM users WHERE id=%s", (user_id,)).one()
        if user:
            print({
                'id': str(user.id),
                'name': user.name,
                'email': user.email,
                'date_of_birth': str(user.date_of_birth),
                'time': user.time,
                'gender': user.gender,
                'state': user.state,
                'city': user.city
            })
            return jsonify({'message': 'Data saved and fetched successfully'}), 200
        else:
            return jsonify({'error': 'Failed to fetch user data'}), 500

    except Exception as e:
        return jsonify({'error': 'Failed to process test data'}), 500

if __name__ == '__main__':
    app.run(debug=True)
