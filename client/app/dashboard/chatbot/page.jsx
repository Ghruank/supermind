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
  const [isLoading, setIsLoading] = useState(false);

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
            "Authorization": "Bearer <TOKEN>", // Replace <TOKEN> with your actual token
            "Content-Type": "application/json",
            "x-api-key": process.env.LANGFLOW_KEY, // Replace with your API key
          },
          body: JSON.stringify({
            input_value: userMessage.content,
            output_type: "chat",
            input_type: "chat",
            tweaks: {
              "ChatInput-PVzFe": {},
              "ChatOutput-lvbPv": {},
              "GroqModel-vyoVc": {},
            },
          }),
        }
      );

      const data = await response.json();
      console.log("API response:", data);

      if (data?.outputs) {
        const assistantMessage = {
          role: "assistant",
          content: data.outputs[0].outputs[0].artifacts.message, // Adjust this if the API's response format differs
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
      <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent mb-8">
        AI Assistant
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
