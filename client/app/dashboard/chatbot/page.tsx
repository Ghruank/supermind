"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! How can I help you today?",
    },
  ]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim()) return;
    
    setMessages((prev) => [
      ...prev,
      { role: "user", content: input },
      { role: "assistant", content: "I'm a demo chatbot. This is a simulated response." },
    ]);
    setInput("");
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
                {message.content}
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
            />
            <Button type="submit" size="icon" className="rounded-full hover:animate-glow">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}