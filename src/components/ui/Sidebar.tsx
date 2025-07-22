"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function Sidebar() {
  const router = useRouter();

  function navigateToContests() {
    router.push("/contests");
  }

  function navigateToCreateContest() {
    router.push("/contests/create");
  }

  return (
    <div className="md:w-[254px] overflow-scroll h-screen bg-primary-bg text-white flex flex-col px-6 py-[50px]">
      <div className="mb-[106px]">
        <Image
          src="/images/logo.png"
          width={76}
          height={153}
          alt="logo"
          className="w-full"
        />
      </div>

      <button
        onClick={navigateToCreateContest}
        className="hover:cursor-pointer bg-primary-main text-white px-4 py-3 rounded-full text-[15px] font-semibold hover:bg-primary-main/90 transition-colors mb-12"
      >
        + Create New Contest
      </button>

      <hr className="border-white/24 mb-12" />

      <nav className="space-y-6 mb-6">
        <div className="relative" onClick={navigateToContests}>
          <div className="absolute right-[-24px] top-0 bottom-0 w-1 bg-primary-main"></div>
          <div className="text-white font-bold text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer">
            Contests
          </div>
        </div>
      </nav>
      <nav className="space-y-6">
        <div className="text-secondary-font font-light text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors">
          User Management
        </div>
        <div className="text-secondary-font font-light text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors">
          Marketing Campaigns
        </div>
        <div className="text-secondary-font font-light text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors">
          Leaderboard Control
        </div>
        <div className="text-secondary-font font-light text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors">
          Analytics
        </div>
      </nav>

      <hr className="border-white/24 my-6" />

      <nav className="space-y-6">
        <div className="text-secondary-font font-light text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors">
          Notifications
        </div>
        <div className="text-secondary-font font-light text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors">
          Security
        </div>
        <div className="text-secondary-font font-light text-[15px] leading-[150%] tracking-[0.6px] cursor-pointer hover:text-white transition-colors">
          Feedback & Support
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
