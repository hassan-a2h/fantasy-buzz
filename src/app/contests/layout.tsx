"use client";
import Providers from "../Providers";
import Topbar from "@/components/ui/Topbar";
import Sidebar from "@/components/ui/Sidebar";
import React from "react";

function ContestsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex flex-col h-screen bg-white md:flex-row">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar />
          <div className="flex-1 p-6 pr-12 overflow-auto overflow-y-auto overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>
    </Providers>
  );
}

export default ContestsLayout;
