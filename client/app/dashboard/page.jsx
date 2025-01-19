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
import { useRouter } from "next/navigation";

const zodiacSigns = [
  { sign: "Aries", start: "03-21", end: "04-19" },
  { sign: "Taurus", start: "04-20", end: "05-20" },
  { sign: "Gemini", start: "05-21", end: "06-20" },
  { sign: "Cancer", start: "06-21", end: "07-22" },
  { sign: "Leo", start: "07-23", end: "08-22" },
  { sign: "Virgo", start: "08-23", end: "09-22" },
  { sign: "Libra", start: "09-23", end: "10-22" },
  { sign: "Scorpio", start: "10-23", end: "11-21" },
  { sign: "Sagittarius", start: "11-22", end: "12-21" },
  { sign: "Capricorn", start: "12-22", end: "01-19" },
  { sign: "Aquarius", start: "01-20", end: "02-18" },
  { sign: "Pisces", start: "02-19", end: "03-20" },
];

const getZodiacSign = (dateOfBirth) => {
  const [year, month, day] = dateOfBirth.split("-");
  const birthDate = new Date(year, month - 1, day);
  for (const sign of zodiacSigns) {
    const [startMonth, startDay] = sign.start.split("-");
    const [endMonth, endDay] = sign.end.split("-");
    const startDate = new Date(year, startMonth - 1, startDay);
    const endDate = new Date(year, endMonth - 1, endDay);
    if (birthDate >= startDate && birthDate <= endDate) {
      return sign.sign;
    }
  }
  return "Unknown";
};

export default function DashboardPage() {
  const router = useRouter();
  const [horoscopes, setHoroscopes] = useState([]);
  const [chart, setChart] = useState("");
  const [userName, setUserName] = useState("");
  const [dailyHoroscope, setDailyHoroscope] = useState("");
  const [monthlyHoroscope, setMonthlyHoroscope] = useState("");
  const [zodiacSign, setZodiacSign] = useState("");
  const [date, setDate] = useState(new Date().toLocaleDateString());
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const email = localStorage.getItem("email");
        const response = await fetch("http://127.0.0.1:5000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password: localStorage.getItem("password") }),
        });

        if (response.ok) {
          const data = await response.json();
          setUserName(data.name);
          const sign = getZodiacSign(data.date_of_birth);
          setZodiacSign(sign);

          // Fetch daily horoscope via Flask proxy
          const dailyResponse = await fetch(`http://127.0.0.1:5000/proxy/horoscope?sign=${sign}&day=TODAY`, {
            method: "GET",
            headers: {
              "accept": "application/json",
            },
          });
          const dailyData = await dailyResponse.json();
          setDailyHoroscope(dailyData.horoscope_data);

          // Fetch monthly horoscope via Flask proxy
          const monthlyResponse = await fetch(`http://127.0.0.1:5000/proxy/horoscope/monthly?sign=${sign}`, {
            method: "GET",
            headers: {
              "accept": "application/json",
            },
          });
          const monthlyData = await monthlyResponse.json();
          setMonthlyHoroscope(monthlyData.horoscope_data);
        } else {
          setError("Failed to fetch user data");
        }
      } catch (err) {
        setError("Network error. Please try again later.");
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-8">
        Your Cosmic Dashboard
      </h1>
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-4">
        Hello, {userName}!
      </h2>
      <p className="text-xl text-violet-200/80 mb-8">
        {dailyHoroscope}
      </p>
      <h3 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-violet-400 via-purple-400 to-violet-400 bg-clip-text text-transparent mb-4">
        {zodiacSign} - {date}
      </h3>
      
      {error && <p className="text-red-500 text-center">{error}</p>}

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
            Daily Horoscope
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-violet-900/20 border border-violet-700/30">
              <h4 className="font-semibold text-violet-200">{zodiacSign}</h4>
              <p className="text-sm text-violet-300 mt-1">{dailyHoroscope}</p>
            </div>
          </div>
        </Card>

        <Card className="col-span-2 p-6 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50">
          <h3 className="text-lg font-semibold text-violet-100 mb-4 flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-violet-400" />
            Monthly Horoscope
          </h3>
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-violet-900/20 border border-violet-700/30">
              <h4 className="font-semibold text-violet-200">{zodiacSign}</h4>
              <p className="text-sm text-violet-300 mt-1">{monthlyHoroscope}</p>
            </div>
          </div>
        </Card>

        <Card 
          className="p-6 bg-gradient-to-br from-violet-950/50 via-purple-900/30 to-violet-950/50 border-violet-700/50 cursor-pointer"
          onClick={() => router.push("/dashboard/chatbot")}
        >
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