import React from "react";
import Image from "next/image";

function ArchivedContestCard({ contest }) {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  return (
    <div className="flex justify-between items-start mb-8 ">
      <div className="flex-1 min-h-[182px] p-8 bg-secodary-bg rounded-tl-2xl rounded-bl-2xl">
        <div className="flex items-center gap-4 mb-1.5 text-[28px] font-semibold text-question">
          <h2 className="">{contest.name}</h2>
          <span className="font-normal">|</span>
          <span className="font-normal mr-8 md:mr-20">
            {formatDate(contest.endDate)}{" "}
          </span>
        </div>
        <p className="text-primary-font/80 text-[16px] font-normal mb-3">
          {contest.description}
        </p>
        <button className="text-primary-main text-sm font-medium hover:underline">
          See Details
        </button>
      </div>

      <div className="w-[236px] bg-gray-900 rounded-tr-2xl rounded-br-2xl overflow-hidden self-stretch">
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
