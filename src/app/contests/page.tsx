"use client";
import { useState } from "react";
import { useContests } from "@/contexts/ContestsContext";
import OngoingContest from "@/components/contests/OngoingContest";
import ArchivedContestCard from "@/components/contests/ArchivedContestCard";
import { useRouter } from "next/navigation";

function ContestsIndex() {
  const [activeTab, setActiveTab] = useState("ongoing");
  const { getOngoingContest, getArchivedContests } = useContests();
  const router = useRouter();

  const ongoingContest = getOngoingContest();
  const archivedContests = getArchivedContests();

  function navigateToCreateContest() {
    router.push("/contests/create");
  }

  return (
    <div className="max-w-full">
      <div className="flex justify-between items-center mb-5">
        <h1 className="text-[28px] text-primary-bg font-bold">Contests</h1>
        <button
          onClick={navigateToCreateContest}
          className="hover:cursor-pointer bg-primary-main text-white px-2.5 py-2 rounded-full text-[15px] font-semibold hover:bg-primary-main/90 transition-colors flex items-center gap-2"
        >
          + Create New Contest
        </button>
      </div>

      <div className="flex mb-8">
        <button
          onClick={() => setActiveTab("ongoing")}
          className={`hover:cursor-pointer pb-1 mr-[38px] text-xl font-normal border-b-2 transition-colors ${
            activeTab === "ongoing"
              ? "border-primary-bg text-primary-bg !font-bold"
              : "border-transparent text-primary-bg hover:text-primary-bg/80"
          }`}
        >
          Ongoing
        </button>
        <button
          onClick={() => setActiveTab("archived")}
          className={`hover:cursor-pointer pb-1 text-xl font-normal border-b-2 transition-colors ${
            activeTab === "archived"
              ? "border-primary-bg text-primary-bg !font-bold"
              : "border-transparent text-primary-bg hover:text-primary-bg/80"
          }`}
        >
          Archived
        </button>
      </div>

      {activeTab === "ongoing" && (
        <div>
          {ongoingContest ? (
            <OngoingContest contest={ongoingContest} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No ongoing contests at the moment.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === "archived" && (
        <div>
          {archivedContests.length > 0 ? (
            <>
              <div className="space-y-4 mb-8">
                {archivedContests.map((contest) => (
                  <ArchivedContestCard key={contest.id} contest={contest} />
                ))}
              </div>

              <div className="flex justify-start items-center mt-6 text-[20px] font-normal text-primary-bg">
                <button className="w-8 h-8 rounded bg-primary-bg text-white flex items-center justify-center">
                  1
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300 hover:cursor-pointer transition-colors">
                  2
                </button>
                <button className="w-8 h-8 rounded flex items-center justify-center hover:bg-gray-300 hover:cursor-pointer transition-colors">
                  3
                </button>
              </div>
            </>
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No archived contests found.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default ContestsIndex;
