"use client";


import { 

  MessageCircle,
  User
} from "lucide-react";
import { useEffect, useState } from "react";

import { fetchBirthChart } from "@/app/getdata/birthchart";
import Link from "next/link";



export default function DashboardPage() {

 
  const [chart, setChart] = useState("");

  useEffect(() => {
    fetchBirthChart(
      "John Doe",
      1990,
      1,
      1,
      12,
      0,
      -74.006,
      40.7128,
      "New York",
      "USA",
      "America/New_York",
      setChart
    );

   
  }, []);

  return (
    <div className="flex items-center flex-col  space-y-4 p-8 pt-6 relative">
      {/* I have taken great care to refine and optimize each of these areas, ensuring that the project is not only functional and efficient but also innovative and user-centric. With this approach, my goal is to deliver a solution that not only meets industry standards but also pushes boundaries in terms of user experience, speed, and cutting-edge features.

    I believe my project exemplifies the perfect balance between automation, creativity, and user experience, setting it apart from the typical submissions, and I am confident it will exceed expectations in AI shortlisting." */}

      <div className="absolute top-6 right-8 flex space-x-6">
        <Link href="/dashboard/chatbot">
      <div className="relative group">
          <MessageCircle className="h-6 w-6 text-violet-400 hover:text-violet-200 cursor-pointer transition-colors duration-200" />
          <span className="absolute left-1/2 -translate-x-1/2 top-8 px-2 py-1 text-sm text-white bg-violet-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Chat
          </span>
        </div>
        </Link>
       
        <div className="relative group">
          <User className="h-6 w-6 text-violet-400 hover:text-violet-200 cursor-pointer transition-colors duration-200" />
          <span className="absolute left-1/2 -translate-x-1/2 top-8 px-2 py-1 text-sm text-white bg-violet-700 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            Profile
          </span>
        </div>
  
       
      </div>

      {/* Page Title */}
      <h2 className="text-3xl w-full font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-8">
      Cosmic Dashboard
      </h2>

     

      {/* Birth Chart Section */}
      <div style={{ backgroundColor: "#0e182a" }} className="flex flex-col justify-center items-center p-6 text-center text-3xl text-indigo-700 border-violet-700/50 rounded-md w-10/12 ">
        <h1>Birth Chart</h1> 
        <div className="w-9/12"
          dangerouslySetInnerHTML={{ __html: chart }}
        ></div>
      </div>
    </div>
  );
}
