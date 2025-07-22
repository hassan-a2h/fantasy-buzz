"use client";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import React from "react";

function Topbar() {
  return (
    <div className="bg-white p-4 pb-2 flex justify-end items-center sm:p-10 sm:pb-3">
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="w-6 h-6 hover:cursor-pointer rounded-full flex items-center justify-center flex-shrink-0">
          <Image
            src="/images/icons/bellIcon.png"
            width={18}
            height={21}
            alt="notification icon"
          />
        </div>
        <div className="border-r border-border h-8 mx-2 sm:h-12 sm:mx-4"></div>
        <div className="flex items-center">
          <div className="w-10 h-10 bg-background-highlight rounded-full flex items-center justify-center flex-shrink-0 sm:w-[46px] sm:h-[46px]">
            <span className="text-base text-secondary-font font-bold sm:text-lg">
              PD
            </span>
          </div>

          <div className="py-1 px-2 text-right sm:py-3 sm:px-[10px] sm:text-left">
            <p className="text-[9px] text-lite-font font-bold sm:text-[10px]">
              Admin
            </p>

            <div className="flex items-center gap-2 sm:gap-5">
              <p className="text-sm font-medium">Prerit Das</p>
              <ChevronDown className="text-black w-4 h-4 sm:w-auto sm:h-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
