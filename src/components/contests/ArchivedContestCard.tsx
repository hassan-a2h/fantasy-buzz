import React from "react";
import Image from "next/image";
import { ArchivedContestCardProps } from "@/types/contest";

function ArchivedContestCard({ contest }: ArchivedContestCardProps) {
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-8 bg-secodary-bg rounded-2xl overflow-hidden md:flex-row">
      <div className="flex-1 min-h-[182px] p-4 sm:p-8 rounded-tl-2xl rounded-bl-2xl w-full sm:w-auto md:flex-1 md:min-h-[182px] md:p-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1.5 text-xl sm:text-[28px] font-semibold text-question md:flex-row md:items-center md:gap-4 md:text-[28px]">
          <h2 className="text-xl sm:text-[28px] md:text-[28px]">
            {contest.name}
          </h2>
          <span className="hidden sm:inline font-normal md:inline">|</span>
          <span className="font-normal text-base sm:text-[28px] mr-0 sm:mr-8 md:mr-20 md:text-[28px]">
            {formatDate(contest.endDate)}{" "}
          </span>
        </div>
        <p className="text-primary-font/80 text-sm sm:text-[16px] font-normal mb-3 md:text-[16px]">
          {contest.description}
        </p>
        <button className="text-primary-main text-sm font-medium hover:underline">
          See Details
        </button>
      </div>

      <div className="w-full sm:w-[236px] h-[182px] bg-gray-900 rounded-b-2xl sm:rounded-tr-2xl sm:rounded-br-2xl sm:rounded-bl-none overflow-hidden flex-shrink-0 md:w-[236px] md:h-full md:rounded-tr-2xl md:rounded-br-2xl md:rounded-bl-none md:self-stretch">
        <Image
          src="/images/question-placeholder.png"
          alt="Contest background"
          width={236}
          height={182}
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}

export default ArchivedContestCard;
