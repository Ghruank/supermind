"use client";

import { Sidebar } from "@/components/dashboard/sidebar";

export default function DashboardLayout({
  children,
}) {
  return (
    <div className="flex h-screen">
      {/* <Sidebar /> */}
      <main className="flex-1 overflow-y-auto bg-background">
        {children}
      </main>
    </div>
  );
}