"use client";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary">
      <div className="container mx-auto px-4 py-16">
        <nav className="flex justify-between items-center mb-16">
          <div className="text-2xl font-bold">Analytics Pro</div>
          <Button variant="outline" onClick={() => router.push("/dashboard")}>
            Login
          </Button>
        </nav>
        
        <div className="flex flex-col items-center text-center space-y-8 mt-32">
          <h1 className="text-6xl font-bold tracking-tight">
            Powerful Analytics for Your Business
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Get real-time insights and beautiful visualizations to make data-driven decisions. 
            Start your journey to better business intelligence today.
          </p>
          <Button 
            size="lg" 
            onClick={() => router.push("/dashboard")}
            className="mt-8"
          >
            Get Started <ArrowRight className="ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}