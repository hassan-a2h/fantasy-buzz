"use client";

import { useState } from "react";
import QuestionForm from "./QuestionForm";
import Image from "next/image";
import { SavedQuestionCardProps } from "@/types/contest";
import React from "react";

function SavedQuestionCard({
  question,
  questionIndex,
  setQuestions,
}: SavedQuestionCardProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);

  const deleteQuestion = () => {
    setQuestions((prev) => prev.filter((_, i) => i !== questionIndex));
  };

  const editQuestion = () => {
    setIsEditing(true);
  };

  if (isEditing) {
    return (
      <QuestionForm
        question={question}
        questionIndex={questionIndex}
        setQuestions={setQuestions}
        errors={{}}
        isEditable={true}
      />
    );
  }

  return (
    <div className="w-full border border-primary-bg rounded-[16px] px-4 py-6 mb-4 bg-questions-bg sm:px-[18px] sm:py-7 md:w-[713px]">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-sm text-primary-main font-bold sm:text-[16px]">
          Question {questionIndex + 1}
        </h4>
        <button
          onClick={editQuestion}
          className="w-6 h-6 hover:cursor-pointer flex items-center justify-center text-gray-500 hover:text-primary-main"
        >
          <Image
            src="/images/icons/edit-pen.png"
            width={24}
            height={24}
            alt="edit button"
          />
        </button>
      </div>

      <div className="mb-4 sm:mb-7">
        <h5 className="mb-3 text-base font-semibold text-ternart-font sm:mb-4">
          {question.question}
        </h5>

        <div className="mb-3 flex flex-col gap-1 sm:mb-4 sm:gap-0">
          {question.answers
            .filter((a) => a.trim())
            .map((answer: string, index: number) => (
              <div
                key={index}
                className="flex items-center gap-2 mb-1 sm:gap-3 sm:mb-2"
              >
                <input
                  type="radio"
                  className="border border-ternary-font flex-shrink-0"
                  name={`question_${questionIndex}`}
                  disabled
                />
                <span className="text-sm">{answer}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <div className="mb-3 flex flex-col items-start sm:mb-5 sm:flex-row sm:items-center">
          {" "}
          <strong className="text-sm font-extrabold text-primary-font/80 w-auto mb-1 whitespace-nowrap sm:text-[16px] sm:w-[170px] sm:mr-20 sm:mb-0">
            Question Active Till:
          </strong>{" "}
          <div className="text-sm font-normal text-primary-font/80 flex flex-col gap-1 sm:text-[16px] sm:flex-row sm:gap-0">
            {" "}
            <span className="mr-0 sm:mr-10">{question.questionEndDate}</span>
            <span>{question.questionEndTime}</span>
          </div>
        </div>
        <div className="flex flex-col items-start sm:flex-row sm:items-center">
          {" "}
          <strong className="text-sm font-extrabold text-primary-font/80 w-auto mb-1 whitespace-nowrap sm:text-[16px] sm:w-[170px] sm:mr-10 sm:mb-0">
            Source:
          </strong>{" "}
          <p className="underline text-sm font-normal text-primary-font/80 sm:text-[16px]">
            Placeholder for the link of the source of answer
          </p>
        </div>
      </div>
    </div>
  );
}

export default SavedQuestionCard;
