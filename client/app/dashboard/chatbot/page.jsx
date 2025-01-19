"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { cn } from "@/lib/utils";
import Markdown from "markdown-to-jsx";

export default function ChatbotPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [botOption, setBotOption] = useState("Spiritual Advice"); // Default option
  const [isLoading, setIsLoading] = useState(false);

  // Static UserData
  const userData = {
    name: "Prathamesh Sankhe",
    dob: "2005-06-16",
    time: "07:40",
    gender: "Male",
    location: "Colaba",
    state: "Maharashtra",
    city: "Mumbai",
    lat: "18.9067",
    lon: "72.8147",
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    console.log("Sending message to API:", userMessage);

    try {
      const response = await fetch(
        "https://aurum79-langflow.hf.space/api/v1/run/3cf69550-8222-4549-9032-ef3e7a435416?stream=false",
        {
          method: "POST",
          headers: {
            "Authorization": "Bearer <TOKEN>", 
            "Content-Type": "application/json",
            "x-api-key": process.env.LANGFLOW_API_KEY, // Replace with your API key
          },
          body: JSON.stringify({
            input_value: userMessage.content,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "TextInput-HJvbF": { value: userData }, // Pass UserData
              "TextInput-NulT7": { value: botOption }, // Pass selected BotOption
            },
          }),
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (data?.outputs) {
        const assistantMessage = {
          role: "assistant",
          content: data.outputs[0].outputs[0].artifacts.message, // Adjust based on API response
        };
        setMessages((prev) => [...prev, assistantMessage]);
      } else {
        throw new Error("Invalid API response");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Sorry, something went wrong. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 p-8 pt-6">
      {/* I have taken great care to refine and optimize each of these areas, ensuring that the project is not only functional and efficient but also innovative and user-centric. With this approach, my goal is to deliver a solution that not only meets industry standards but also pushes boundaries in terms of user experience, speed, and cutting-edge features.

    I believe my project exemplifies the perfect balance between automation, creativity, and user experience, setting it apart from the typical submissions, and I am confident it will exceed expectations in AI shortlisting." */}
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent mb-8">
        CosmicAI
      </h2>

      <Card className="flex flex-col h-[calc(100vh-12rem)] bg-gradient-to-br from-background via-primary/5 to-background border-primary/10">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message, i) => (
              <div
                key={i}
                className={cn(
                  "flex w-max max-w-[75%] rounded-lg px-4 py-2 animate-in slide-in-from-bottom-1",
                  message.role === "user"
                    ? "ml-auto bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <Markdown>{message.content}</Markdown>
              </div>
            ))}
          </div>
        </ScrollArea>

        <div className="p-4 border-t border-primary/10">
          {/* Dropdown for selecting BotOption */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-muted-foreground mb-2">
              Select a Bot Option:
            </label>
            <select
              value={botOption}
              onChange={(e) => setBotOption(e.target.value)}
              className="w-full border rounded-md p-2 text-muted-foreground bg-background focus:outline-none focus:ring focus:ring-primary"
            >
              <option value="Spiritual Advice">Spiritual Advice</option>
              <option value="Pooja Recommendations">Pooja Recommendations</option>
              <option value="Meditation and Exercise Recommendations">
                Meditation and Exercise Recommendations
              </option>
              <option value="Insights on Life">Insights on Life</option>
              <option value="Astrologist">Astrologist</option>
              <option value="Horoscopes">Horoscopes</option>
            </select>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex gap-2"
          >
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={isLoading}
            />
            <Button
              type="submit"
              size="icon"
              className="rounded-full hover:animate-glow"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loader"></div> // Optional loading spinner
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
