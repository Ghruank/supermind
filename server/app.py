from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from cassandra.cluster import Cluster
from cassandra.auth import PlainTextAuthProvider
from flask_cors import CORS
import uuid
from dotenv import load_dotenv
import os
import logging
import requests

app = Flask(__name__)
CORS(app)
bcrypt = Bcrypt(app)

# Configure logging
logging.basicConfig(level=logging.INFO)

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
    auth_provider=auth_provider,
    protocol_version=4,  # Explicitly set the protocol version
    connect_timeout=20,  # Increase the connection timeout
    control_connection_timeout=20  # Increase the control connection timeout
)
session = cluster.connect()

# Set keyspace
keyspace = os.getenv('DATASTAX_KEYSPACE')
session.set_keyspace(keyspace)

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
    location TEXT,
    lat DOUBLE,
    lon DOUBLE
)
""")
session.execute("""
CREATE INDEX IF NOT EXISTS ON users (email);
""")

@app.route('/register', methods=['POST'])
def register():
    try:
        data = request.json
        logging.info(f"Received registration data: {data}")

        # Validate required fields
        required_fields = ['name', 'email', 'password', 'date_of_birth', 'time', 'gender', 'location', 'lat', 'lon']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Check if user already exists
        existing_user = session.execute("SELECT * FROM users WHERE email=%s", (data['email'],)).one()
        logging.info(f"Existing user query result: {existing_user}")
        if existing_user:
            return jsonify({'message': 'User already exists, please log in'}), 409

        # Hash password and insert user
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user_id = uuid.uuid4()
        session.execute("""
        INSERT INTO users (id, name, email, password, date_of_birth, time, gender, location, lat, lon)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (user_id, data['name'], data['email'], hashed_password, data['date_of_birth'],
              data['time'], data['gender'], data['location'], data['lat'], data['lon']))
        return jsonify({'message': 'User registered successfully'}), 201

    except Exception as e:
        logging.error(f"Error during registration: {e}")
        return jsonify({'error': 'Failed to register user', 'details': str(e)}), 500

@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.json
        logging.info(f"Received login data: {data}")

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
                'location': user.location,
                'lat': user.lat,
                'lon': user.lon
            }), 200
        else:
            return jsonify({'message': 'Invalid email or password'}), 401

    except Exception as e:
        logging.error(f"Error during login: {e}")
        return jsonify({'error': 'Failed to log in', 'details': str(e)}), 500

@app.route('/test', methods=['POST'])
def test():
    try:
        data = request.json
        logging.info(f"Received test data: {data}")

        # Validate required fields
        required_fields = ['name', 'email', 'password', 'date_of_birth', 'time', 'gender', 'location', 'lat', 'lon']
        if not all(field in data for field in required_fields):
            return jsonify({'error': 'Missing required fields'}), 400

        # Hash password and insert user
        hashed_password = bcrypt.generate_password_hash(data['password']).decode('utf-8')
        user_id = uuid.uuid4()
        session.execute("""
        INSERT INTO users (id, name, email, password, date_of_birth, time, gender, location, lat, lon)
        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
        """, (user_id, data['name'], data['email'], hashed_password, data['date_of_birth'],
              data['time'], data['gender'], data['location'], data['lat'], data['lon']))

        # Fetch the user data from the database
        user = session.execute("SELECT * FROM users WHERE id=%s", (user_id,)).one()
        if user:
            logging.info(f"Fetched user data: {user}")
            print({
                'id': str(user.id),
                'name': user.name,
                'email': user.email,
                'date_of_birth': str(user.date_of_birth),
                'time': user.time,
                'gender': user.gender,
                'location': user.location,
                'lat': user.lat,
                'lon': user.lon
            })
            return jsonify({'message': 'Data saved and fetched successfully'}), 200
        else:
            return jsonify({'error': 'Failed to fetch user data'}), 500

    except Exception as e:
        logging.error(f"Error during test: {e}")
        return jsonify({'error': 'Failed to process test data', 'details': str(e)}), 500

@app.route('/proxy/horoscope', methods=['GET'])
def proxy_horoscope():
    sign = request.args.get('sign')
    day = request.args.get('day')
    url = f"https://horoscope-app-api.vercel.app/api/v1/get-horoscope/daily?sign={sign}&day={day}"
    response = requests.get(url)
    return jsonify(response.json())
if __name__ == '__main__':
    app.run(debug=True)
