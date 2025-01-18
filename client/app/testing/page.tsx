"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function TestingPage() {
  const [email, setEmail] = useState("");
  interface UserData {
    id: string;
    name: string;
    email: string;
    date_of_birth: string;
    time: string;
    gender: string;
    state: string;
    city: string;
  }

  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState("");

  const handleFetchUserData = async () => {
    const response = await fetch("http://127.0.0.1:5000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password: "dummyPassword" }), // Use a dummy password for testing
    });

    if (response.ok) {
      const data = await response.json();
      setUserData(data);
      setError("");
    } else {
      const result = await response.json();
      setError(result.message || "Failed to fetch user data");
      setUserData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-900 to-indigo-950 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-10 bg-cover bg-center" />
      
      <div className="w-full max-w-md space-y-8 p-8 relative">
        <div className="flex flex-col items-center">
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-violet-200 via-purple-300 to-violet-200 bg-clip-text text-transparent">
            Testing Page
          </h2>
          <p className="mt-2 text-violet-300">Fetch user data for testing</p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <div className="mt-8 space-y-6">
          <div className="relative">
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 bg-violet-950/50 border-violet-700 text-violet-100 placeholder:text-violet-400"
              required
            />
          </div>

          <Button
            onClick={handleFetchUserData}
            className="w-full bg-violet-700 hover:bg-violet-600 text-violet-100"
          >
            Fetch User Data
          </Button>

          {userData && (
            <div className="mt-8 bg-violet-950/50 p-4 rounded-lg text-violet-100">
              <h3 className="text-xl font-bold">User Data:</h3>
              <p><strong>ID:</strong> {userData.id}</p>
              <p><strong>Name:</strong> {userData.name}</p>
              <p><strong>Email:</strong> {userData.email}</p>
              <p><strong>Date of Birth:</strong> {userData.date_of_birth}</p>
              <p><strong>Time:</strong> {userData.time}</p>
              <p><strong>Gender:</strong> {userData.gender}</p>
              <p><strong>State:</strong> {userData.state}</p>
              <p><strong>City:</strong> {userData.city}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
