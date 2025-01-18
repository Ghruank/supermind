"use client";

import { Card } from "@/components/ui/card";
import { 
  Sun, 
  Moon, 
  Star,
  Sparkles,
  MessageCircle,
  Calendar,
  Hash
} from "lucide-react";
import { useEffect, useState } from "react";

import { fetchBirthChart } from "@/app/getdata/birthchart";
import { fetchHoroscope } from "@/app/getdata/horoscope";

const horoscaopes = [
  { sign: "Aries", prediction: "A powerful day for new beginnings. Trust your instincts." },
  // { sign: "Taurus", prediction: "Financial opportunities arise. Stay grounded." },
  // { sign: "Gemini", prediction: "Communication flows easily. Express your ideas." }
];

export default function DashboardPage() {

  const [horoscopes, setHoroscopes] = useState([]);
  const [chart, setChart] = useState("");

  useEffect(() => {
    // fetchBirthChart(
    //   "John Doe",
    //   1990,
    //   1,
    //   1,
    //   12,
    //   0,
    //   -74.006,
    //   40.7128,
    //   "New York",
    //   "USA",
    //   "America/New_York",
    //   "Tropic",
    //   setChart
    // );

    // fetchHoroscope("libra", setHoroscopes);
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-8">
        Your Cosmic Dashboard
      </h2>
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="p-4 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50">
          <div className="flex items-center space-x-2">
            <Sun className="h-8 w-8 text-amber-400" />
            <div>
              <h3 className="font-semibold text-violet-100">Daily Energy</h3>
              <p className="text-sm text-violet-300">Highly Positive</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50">
          <div className="flex items-center space-x-2">
            <Moon className="h-8 w-8 text-violet-300" />
            <div>
              <h3 className="font-semibold text-violet-100">Moon Phase</h3>
              <p className="text-sm text-violet-300">Waxing Crescent</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50">
          <div className="flex items-center space-x-2">
            <Star className="h-8 w-8 text-yellow-400" />
            <div>
              <h3 className="font-semibold text-violet-100">Lucky Star</h3>
              <p className="text-sm text-violet-300">Venus Rising</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50">
          <div className="flex items-center space-x-2">
            <Hash className="h-8 w-8 text-purple-400" />
            <div>
              <h3 className="font-semibold text-violet-100">Life Path</h3>
              <p className="text-sm text-violet-300">Number 7</p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="col-span-2 p-6 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50">
          <h3 className="text-lg font-semibold text-violet-100 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-violet-400" />
            Daily Horoscopes
          </h3>
          <div className="space-y-4">
            {horoscopes.map((horoscope) => (
              <div key={horoscope.sign} className="p-4 rounded-lg bg-violet-900/20 border border-violet-700/30">
                <h4 className="font-semibold text-violet-200">{horoscope.sign}</h4>
                <p className="text-sm text-violet-300 mt-1">{horoscope.prediction}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50">
          <h3 className="text-lg font-semibold text-violet-100 mb-4 flex items-center">
            <MessageCircle className="h-5 w-5 mr-2 text-violet-400" />
            AI Guidance
          </h3>
          <div className="space-y-4">
            <p className="text-sm text-violet-300">
              The stars indicate a period of growth and transformation. Focus on personal development
              and trust your intuition. Your spiritual journey is about to reach new heights.
            </p>
            <div className="flex justify-center">
              <Sparkles className="h-6 w-6 text-violet-400 animate-pulse" />
            </div>
          </div>
        </Card>
      </div>
      
      <div className="p-6 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50 rounded-md"
        dangerouslySetInnerHTML={{ __html: chart }}
      ></div>

    </div>
  );
}