"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Settings,
  HelpCircle,
  ChevronLeft,
  ChevronRight,
  MessageSquare,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const routes = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    color: "text-violet-500",
  },
  {
    label: "Analytics",
    icon: BarChart2,
    href: "/dashboard/analytics",
    color: "text-blue-500",
  },
  {
    label: "Customers",
    icon: Users,
    href: "/dashboard/customers",
    color: "text-pink-500",
  },
  {
    label: "Chatbot",
    icon: MessageSquare,
    href: "/dashboard/chatbot",
    color: "text-green-500",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-orange-500",
  },
  {
    label: "Help",
    icon: HelpCircle,
    href: "/dashboard/help",
    color: "text-teal-500",
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "relative flex flex-col h-full bg-gradient-to-b from-background via-primary/5 to-background border-r border-primary/10 transition-all duration-300",
      isCollapsed ? "w-[80px]" : "w-[240px]"
    )}>
      <Button
        variant="ghost"
        size="icon"
        className="absolute -right-4 top-6 h-8 w-8 rounded-full border border-primary/20 bg-background hover:animate-glow"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="px-3 py-2 flex-1">
        <div className="flex items-center justify-between mb-14 pl-3">
          <Link href="/dashboard" className={cn(
            "flex items-center transition-all duration-300",
            isCollapsed ? "justify-center" : "justify-start"
          )}>
            <h1 className={cn(
              "font-bold bg-gradient-to-r from-primary via-violet-400 to-primary bg-clip-text text-transparent",
              isCollapsed ? "text-xl" : "text-2xl"
            )}>
              {isCollapsed ? "AP" : "Analytics Pro"}
            </h1>
          </Link>
          {!isCollapsed && <ThemeToggle />}
        </div>
        <div className="space-y-1">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                "relative group flex p-3 w-full cursor-pointer rounded-lg transition-all duration-200",
                "hover:bg-primary/10 hover-scale",
                pathname === route.href ? "bg-primary/15 text-primary" : "text-muted-foreground",
                isCollapsed && "justify-center"
              )}
            >
              <div className={cn(
                "flex items-center",
                !isCollapsed && "flex-1"
              )}>
                <route.icon className={cn("h-5 w-5", route.color)} />
                {!isCollapsed && (
                  <span className="ml-3 font-medium">{route.label}</span>
                )}
              </div>
              {isCollapsed && (
                <div className="absolute left-full rounded-md px-2 py-1 ml-6 bg-primary text-primary-foreground text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0">
                  {route.label}
                </div>
              )}
            </Link>
          ))}
        </div>
      </div>
      {isCollapsed && (
        <div className="p-3">
          <ThemeToggle />
        </div>
      )}
    </div>
  );
}