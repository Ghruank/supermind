"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Moon, KeyRound, Mail, User } from "lucide-react";
import Link from "next/link";

export default function RegisterPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === confirmPassword) {
      router.push("/details");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-violet-950 via-purple-900 to-indigo-950 flex items-center justify-center">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba')] opacity-10 bg-cover bg-center" />
      
      <div className="w-full max-w-md space-y-8 p-8 relative">
        <div className="flex flex-col items-center">
          <Moon className="h-12 w-12 text-violet-300 mb-4" />
          <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-violet-200 via-purple-300 to-violet-200 bg-clip-text text-transparent">
            Begin Your Journey
          </h2>
          <p className="mt-2 text-violet-300">Create your spiritual account</p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-violet-400" />
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-violet-950/50 border-violet-700 text-violet-100 placeholder:text-violet-400"
                required
              />
            </div>
            
            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-violet-400" />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-violet-950/50 border-violet-700 text-violet-100 placeholder:text-violet-400"
                required
              />
            </div>

            <div className="relative">
              <KeyRound className="absolute left-3 top-3 h-5 w-5 text-violet-400" />
              <Input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 bg-violet-950/50 border-violet-700 text-violet-100 placeholder:text-violet-400"
                required
              />
            </div>
          </div>

          <div className="flex justify-center">
            <Link 
              href="/login"
              className="text-sm text-violet-300 hover:text-violet-200"
            >
              Already have an account? Sign in
            </Link>
          </div>

          <Button
            type="submit"
            className="w-full bg-violet-700 hover:bg-violet-600 text-violet-100"
          >
            Create Account
          </Button>
        </form>
      </div>
    </div>
  );
}