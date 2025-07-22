"use client";
import { useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";
import { OngoingQuestionCardProps, Question } from "@/types/contest";
import React from "react";

function OngoingQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  isExpanded,
  onToggleExpanded,
  onUpdate,
  onDelete,
}: OngoingQuestionCardProps) {
  const [editData, setEditData] = useState<Question>({
    ...question,
    answers: [...question.answers],
  });

  const handleSave = () => {
    onUpdate(editData);
  };

  const updateAnswer = (answerIndex: number, value: string) => {
    setEditData((prev) => ({
      ...prev,
      answers: prev.answers.map((a, i) => (i === answerIndex ? value : a)),
    }));
  };

  const addAnswer = () => {
    setEditData((prev) => ({
      ...prev,
      answers: [...prev.answers, ""],
    }));
  };

  const removeAnswer = (answerIndex: number) => {
    if (editData.answers.length > 2) {
      setEditData((prev) => ({
        ...prev,
        answers: prev.answers.filter((_, i) => i !== answerIndex),
      }));
    }
  };

  const formatTimeLeft = (): string => {
    return "5d : 21h : 40m left";
  };

  if (isExpanded) {
    return (
      <div className="w-full bg-questions-bg rounded-[16px] border-l-4 pt-4 pb-5 px-4 mb-4 sm:border-l-8 sm:pt-6 sm:pb-7.5 sm:px-5 sm:mb-6 md:w-7/10">
        <div className="flex items-center justify-between mb-4 sm:mb-[18px]">
          <h4 className="text-sm text-[#323A53] font-medium sm:text-[16px]">
            QUESTION {questionIndex + 1}/{totalQuestions}
          </h4>
          <button
            onClick={onDelete}
            className="w-6 h-6 hover:cursor-pointer flex items-center justify-center text-red-500 hover:text-red-700"
          >
            <Image
              src="/images/icons/delete.png"
              width={24}
              height={24}
              alt="delete button"
            />
          </button>
        </div>

        <div className="w-full md:w-6/7">
          <div className="mb-4 sm:mb-6">
            <label
              htmlFor={`question-text-${question.id}`}
              className="block text-sm text-primary-font/80 font-medium mb-[5px] sm:text-[16px]"
            >
              Type the question:
            </label>
            <textarea
              id={`question-text-${question.id}`}
              value={editData.question}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setEditData((prev) => ({ ...prev, question: e.target.value }))
              }
              className="w-full min-h-[80px] border border-black/24 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-main resize-none text-icons-primary text-sm font-normal sm:min-h-[110px] sm:text-[16px]"
              placeholder="Enter your question here..."
              rows={4}
            />
          </div>

          <div className="mb-6 border border-black/24 rounded-xl py-3 px-4 sm:mb-8 sm:py-4 sm:px-5">
            {editData.answers.map((answer: string, answerIndex: number) => (
              <div
                key={answerIndex}
                className="flex items-center gap-2 mb-2 sm:gap-3 sm:mb-3"
              >
                <input
                  type="text"
                  value={answer}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    updateAnswer(answerIndex, e.target.value)
                  }
                  className="flex-1 border-b border-black/20 bg-transparent px-0 focus:outline-none focus:border-primary-main text-icons-primary text-sm pb-0 sm:pt-2 sm:text-base"
                  placeholder={`Option ${answerIndex + 1}`}
                />
                <button
                  onClick={() => removeAnswer(answerIndex)}
                  disabled={editData.answers.length <= 2}
                  className={`w-5 h-5 self-end flex items-center justify-center text-base ${
                    editData.answers.length <= 2
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:text-red-500"
                  } sm:w-6 sm:h-6 sm:text-lg`}
                >
                  -
                </button>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={addAnswer}
                className="w-5 h-5 justify-self-end self-end flex items-center justify-center text-primary-font hover:text-primary-font/80 text-base sm:w-6 sm:h-6 sm:text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex flex-col items-start gap-3 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:mb-6">
            <label className="text-sm text-primary-font/80 font-extrabold w-content whitespace-nowrap sm:text-[16px]">
              Question Active Till:
            </label>
            <div className="flex flex-col gap-3 w-full sm:flex-row sm:gap-4">
              <input
                type="date"
                value={editData.questionEndDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setEditData((prev) => ({
                    ...prev,
                    questionEndDate: e.target.value,
                  }))
                }
                className="w-full h-8 text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main"
              />
              <div className="relative w-full">
                <input
                  type="time"
                  value={editData.questionEndTime}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setEditData((prev) => ({
                      ...prev,
                      questionEndTime: e.target.value,
                    }))
                  }
                  className="w-full h-8 text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main pr-8"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-icons-primary pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">
            <label className="block text-sm text-primary-font/80 font-extrabold sm:text-[16px]">
              Source:
            </label>
            <div className="text-xs text-link-blue sm:text-sm">
              <span className="underline cursor-pointer">
                {question.source || (
                  <span>
                    <span className="font-medium">Verified By </span>
                    <span className="font-normal">Source Name</span>
                  </span>
                )}
              </span>
            </div>
          </div>

          <button
            onClick={handleSave}
            className="mt-6 py-2 px-8 bg-primary-bg text-base font-medium text-white rounded-full hover:bg-primary-bg/90 transition-colors sm:mt-10 sm:py-2.5 sm:px-14 sm:text-[20px]"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-min bg-questions-bg border border-secondary-border rounded-lg py-6 px-4 mb-4 sm:py-8 sm:px-5 md:w-7/10">
      <div className="flex flex-col items-start justify-between mb-4 sm:flex-row sm:items-center">
        <div className="flex flex-col items-start gap-2 mb-2 sm:flex-row sm:items-center sm:gap-4 sm:mb-0">
          <span className="text-sm text-[#323A53] font-medium sm:text-[16px]">
            QUESTION {questionIndex + 1}/{totalQuestions}
          </span>
          <div className="flex items-center gap-2 bg-white border border-primary-main text-xs text-primary-main font-semibold rounded-full py-1 px-2 sm:text-[13px] sm:px-3.5">
            <span className="">Active</span>
            <span className="text-secondary-boder font-medium">until</span>{" "}
            <span className="font-normal">{formatTimeLeft()}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={onToggleExpanded}
            className="p-1 text-gray-500 hover:cursor-pointer hover:text-primary-main transition-colors"
          >
            <Image
              src="/images/icons/edit-pen.png"
              width={24}
              height={24}
              alt="edit button"
            />
          </button>
          <button
            onClick={onDelete}
            className="p-1 text-gray-500 hover:cursor-pointer hover:text-red-500 transition-colors"
          >
            <Image
              src="/images/icons/delete.png"
              width={24}
              height={24}
              alt="delete button"
            />
          </button>
        </div>
      </div>

      <hr className="mt-4 mb-4 text-[#D9D9D9] sm:mt-6 sm:mb-5" />

      <h3 className="text-lg font-semibold text-question mb-3 sm:text-2xl sm:mb-4">
        {question.question}
      </h3>

      <div className="flex flex-col gap-1 mb-4 sm:gap-0 sm:mb-5">
        {question.answers
          .filter((a) => a.trim())
          .map((answer: string, index: number) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-3 h-3 border border-primary-main rounded-full flex-shrink-0 sm:w-4 sm:h-4"></div>
              <span className="text-sm text-question font-normal sm:text-[20px]">
                {answer}
              </span>
            </div>
          ))}
      </div>

      <div className="text-xs text-link-blue sm:text-sm">
        <span className="underline cursor-pointer">
          {question.source || (
            <span>
              <span className="font-medium">Verified By </span>
              <span className="font-normal">Source Name</span>
            </span>
          )}
        </span>
      </div>
    </div>
  );
}

export default OngoingQuestionCard;
