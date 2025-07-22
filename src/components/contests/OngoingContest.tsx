"use client";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { useContests } from "@/contexts/ContestsContext";
import OngoingQuestionCard from "./OngoingQuestionCard";
import Image from "next/image";

function OngoingContest({ contest }) {
  const [expandedQuestions, setExpandedQuestions] = useState({});
  const { updateQuestion, deleteQuestion } = useContests();

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
    });
  };

  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    return `${start} - ${end}`;
  };

  const toggleQuestionExpanded = (questionId) => {
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: !prev[questionId],
    }));
  };

  const handleQuestionUpdate = (questionId, updatedData) => {
    updateQuestion(contest.id, questionId, updatedData);
    setExpandedQuestions((prev) => ({
      ...prev,
      [questionId]: false,
    }));
  };

  const handleQuestionDelete = (questionId) => {
    deleteQuestion(contest.id, questionId);
  };

  return (
    <div>
      <div className="flex justify-between items-start mb-8 ">
        <div className="flex-1 min-h-[182px] p-8 bg-secodary-bg rounded-tl-2xl rounded-bl-2xl">
          <div className="flex items-center gap-4 mb-1.5 text-[28px] font-semibold text-question">
            <h2 className="">{contest.name}</h2>
            <span className="font-normal">|</span>
            <span className="font-normal mr-8 md:mr-20">
              {formatDateRange("2025-06-01", contest.endDate)}
            </span>
            <span className="font-light">Second timer</span>
          </div>
          <p className="text-primary-font/80 text-[16px] font-normal">
            {contest.description}
          </p>
        </div>

        <div className="w-[236px] h-full bg-gray-900 rounded-tr-2xl overflow-hidden">
          <Image
            src="/images/question-placeholder.png"
            alt="Contest background"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        {contest.questions.map((question, index) => (
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
