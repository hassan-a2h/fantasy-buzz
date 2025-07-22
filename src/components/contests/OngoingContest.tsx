"use client";
import { useState } from "react";
import { useContests } from "@/contexts/ContestsContext";
import OngoingQuestionCard from "./OngoingQuestionCard";
import Image from "next/image";
import { OngoingContestProps, Question } from "@/types/contest";
import React from "react";

function OngoingContest({ contest }: OngoingContestProps) {
  const [expandedQuestions, setExpandedQuestions] = useState<
    Record<string, boolean>
  >({});
  const { updateQuestion, deleteQuestion } = useContests();

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const formatDateRange = (startDate: string, endDate: string): string => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  const toggleQuestionExpanded = (questionId: number | string) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleQuestionUpdate = (
    questionId: number | string,
    updatedData: Partial<Question>
  ) => {
    updateQuestion(contest.id, questionId, updatedData);
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  };

  const handleQuestionDelete = (questionId: number | string) => {
    deleteQuestion(contest.id, questionId);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start mb-4 sm:mb-8 bg-secodary-bg rounded-2xl  sm:rounded-br-none overflow-hidden md:flex-row md:justify-between md:items-start md:mb-8">
        <div className="flex-1 min-h-[182px] p-4 sm:p-8 rounded-tl-2xl rounded-bl-2xl w-full sm:w-auto md:flex-1 md:min-h-[182px] md:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 mb-1.5 text-xl sm:text-[28px] font-semibold text-question md:flex-row md:items-center md:gap-4 md:text-[28px]">
            <h2 className="text-xl sm:text-[28px] md:text-[28px]">
              {contest.name}
            </h2>
            <span className="hidden sm:inline font-normal md:inline">|</span>

            <span className="font-normal text-base sm:text-[28px] mr-0 sm:mr-4 md:mr-2 md:text-[28px]">
              {formatDateRange("2025-06-01", contest.endDate)}
            </span>

            <span className="font-light">Second timer</span>
          </div>

          <p className="text-primary-font/80 text-sm sm:text-[16px] font-normal md:text-[16px]">
            {contest.description}
          </p>
        </div>

        <div className="w-full sm:w-[236px] h-[182px] bg-gray-900 rounded-b-2xl sm:rounded-tr-2xl sm:rounded-br-none sm:rounded-bl-none overflow-hidden flex-shrink-0 md:w-[236px] md:h-full">
          <Image
            src="/images/question-placeholder.png"
            alt="Contest background"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <div className="space-y-4">
        {contest.questions.map((question: Question, index: number) => (
          <OngoingQuestionCard
            key={question.id}
            question={question}
            questionIndex={index}
            totalQuestions={contest.questions.length}
            isExpanded={expandedQuestions[question.id] || false}
            onToggleExpanded={() => toggleQuestionExpanded(question.id)}
            onUpdate={(updatedData) =>
              handleQuestionUpdate(question.id, updatedData)
            }
            onDelete={() => handleQuestionDelete(question.id)}
          />
        ))}
      </div>
    </div>
  );
}

export default OngoingContest;
