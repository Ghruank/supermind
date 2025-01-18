"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Moon } from "lucide-react";

const states = ["Maharashtra", "Karnataka", "Tamil Nadu", "Uttar Pradesh"];
const cities = {
  Maharashtra: ["Mumbai", "Pune", "Nagpur"],
  Karnataka: ["Bangalore", "Mysore", "Mangalore"],
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai"],
  "Uttar Pradesh": ["Lucknow", "Kanpur", "Varanasi"],
};

export default function DetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    time: "",
    gender: "",
    state: "",
    city: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const response = await fetch("http://127.0.0.1:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: formData.name,
        date_of_birth: formData.dob,
        time: formData.time,
        gender: formData.gender,
        state: formData.state,
        city: formData.city,
        email: "john.doe@example.com",
        password: "password123",
      }),
    });

    if (response.ok) {
      router.push("/testing");
    } else {
      const result = await response.json();
      setError(result.message || "Failed to save details");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-900 to-indigo-950 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-10 bg-cover bg-center" />

      <div className="w-full max-w-md space-y-8 p-8 relative">
        <div className="flex flex-col items-center">
          <Moon className="h-12 w-12 text-violet-300 mb-4" />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-violet-200 via-purple-300 to-violet-200 bg-clip-text text-transparent">
            Complete Your Profile
          </h2>
          <p className="mt-2 text-violet-300">Tell us about yourself</p>
        </div>

        {error && <p className="text-red-500 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <Input
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="bg-violet-950/50 border-violet-700 text-violet-100 placeholder:text-violet-400"
              required
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-violet-200  mb-2 block">Date of Birth</label>
                <Input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="bg-violet-950/50 border-violet-700 text-violet-100"
                  required
                />
              </div>
              <div>
                <label className="text-violet-200 mb-2 block">Time of Birth</label>
                <Input
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-violet-950/50 border-violet-700 text-violet-100"
                />
              </div>
            </div>
            <div className=" bg-transparent">
              <label className="text-white">
                <input
                  className="border-violet-400 dark:border-violet-500 bg-violet-200/50 dark:bg-violet-900/50 focus:ring-violet-400 checked:bg-violet-500 checked:border-violet-500 hover:scale-110 transition-all duration-500 ease-in-out w-6 h-6 mr-2"
                  type="checkbox"
                />
                I dont know the time of birth
              </label>
            </div>

            <Select
              value={formData.gender}
              onValueChange={(value) => setFormData({ ...formData, gender: value })}
            >
              <SelectTrigger className="bg-violet-950/50 border-violet-700 text-violet-100">
                <SelectValue placeholder="Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="male">Male</SelectItem>
                <SelectItem value="female">Female</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={formData.state}
              onValueChange={(value) => setFormData({ ...formData, state: value, city: "" })}
            >
              <SelectTrigger className="bg-violet-950/50 border-violet-700 text-violet-100">
                <SelectValue placeholder="State" />
              </SelectTrigger>
              <SelectContent>
                {states.map((state) => (
                  <SelectItem key={state} value={state}>
                    {state}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {formData.state && (
              <Select
                value={formData.city}
                onValueChange={(value) => setFormData({ ...formData, city: value })}
              >
                <SelectTrigger className="bg-violet-950/50 border-violet-700 text-violet-100">
                  <SelectValue placeholder="City" />
                </SelectTrigger>
                <SelectContent>
                  {cities[formData.state as keyof typeof cities].map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-700 hover:bg-violet-600 text-violet-100"
          >
            Continue
          </Button>
        </form>
      </div>
    </div>
  );
}