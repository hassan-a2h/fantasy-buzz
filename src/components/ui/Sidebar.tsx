"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import React from "react";

function Sidebar() {
  const router = useRouter();

  function navigateToContests() {
    router.push("/contests");
  }

  function navigateToCreateContest() {
    router.push("/contests/create");
  }

  return (
    <div className="hidden md:flex w-full h-screen bg-primary-bg text-white flex-shrink-0 flex-col px-4 py-8 overflow-y-auto sm:px-6 sm:py-[50px] md:w-[254px]">
      <div className="mb-12 w-full max-w-[150px] mx-auto sm:mb-[106px] md:max-w-full">
        <Image
          src="/images/logo.png"
          width={76}
          height={153}
          alt="logo"
          className="w-full h-auto"
        />
      </div>

      <button
        onClick={navigateToCreateContest}
        className="hover:cursor-pointer bg-primary-main text-white px-4 py-3 rounded-full text-sm font-semibold mb-8 text-center hover:bg-primary-main/90 transition-colors sm:mb-12 sm:text-[15px]"
      >
        + Create New Contest
      </button>

      <hr className="border-white/24 mb-8 sm:mb-12" />

      <nav className="space-y-4 mb-6 sm:space-y-6">
        <div className="relative" onClick={navigateToContests}>
          <div className="absolute right-[-16px] top-0 bottom-0 w-1 bg-primary-main sm:right-[-24px]"></div>
          <div className="text-white font-bold text-sm leading-[150%] tracking-[0.6px] cursor-pointer sm:text-[15px]">
            Contests
          </div>
        </div>
      </nav>
      <nav className="space-y-4 sm:space-y-6">
        <div className="text-secondary-font font-light text-sm leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors sm:text-[15px]">
          User Management
        </div>
        <div className="text-secondary-font font-light text-sm leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors sm:text-[15px]">
          Marketing Campaigns
        </div>
        <div className="text-secondary-font font-light text-sm leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors sm:text-[15px]">
          Leaderboard Control
        </div>
        <div className="text-secondary-font font-light text-sm leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors sm:text-[15px]">
          Analytics
        </div>
      </nav>

      <hr className="border-white/24 my-6" />

      <nav className="space-y-4 sm:space-y-6">
        <div className="text-secondary-font font-light text-sm leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors sm:text-[15px]">
          Notifications
        </div>
        <div className="text-secondary-font font-light text-sm leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors sm:text-[15px]">
          Security
        </div>
        <div className="text-secondary-font font-light text-sm leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors sm:text-[15px]">
          Feedback & Support
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
