"use client";
import { useState } from "react";
import Image from "next/image";
import { Clock } from "lucide-react";

function OngoingQuestionCard({
  question,
  questionIndex,
  totalQuestions,
  isExpanded,
  onToggleExpanded,
  onUpdate,
  onDelete,
}) {
  const [editData, setEditData] = useState({
    question: question.question,
    answers: [...question.answers],
    questionEndDate: question.questionEndDate,
    questionEndTime: question.questionEndTime,
  });

  const handleSave = () => {
    onUpdate(editData);
  };

  const updateAnswer = (answerIndex, value) => {
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

  const removeAnswer = (answerIndex) => {
    if (editData.answers.length > 2) {
      setEditData((prev) => ({
        ...prev,
        answers: prev.answers.filter((_, i) => i !== answerIndex),
      }));
    }
  };

  const formatTimeLeft = () => {
    return "5d : 21h : 40m left";
  };

  if (isExpanded) {
    return (
      <div className="md:w-7/10 bg-questions-bg rounded-[16px] border-l-8 border-l-primary-bg pt-6 pb-7.5 px-5 mb-6">
        <div className="flex items-center justify-between mb-[18px]">
          <h4 className="text-[16px] text-[#323A53] font-medium">
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

        <div className="md:w-6/7">
          <div className="mb-6">
            <label className="block text-[16px] text-primary-font/80 font-medium mb-[5px]">
              Type the question:
            </label>
            <textarea
              value={editData.question}
              onChange={(e) =>
                setEditData((prev) => ({ ...prev, question: e.target.value }))
              }
              className="w-full min-h-[110px] border border-black/24 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-main resize-none text-icons-primary text-[16px] font-normal"
              placeholder="Enter your question here..."
              rows={4}
            />
          </div>

          <div className="mb-8 border border-black/24 rounded-xl py-4 px-5">
            {editData.answers.map((answer, answerIndex) => (
              <div key={answerIndex} className="flex items-center gap-3 mb-3">
                <input
                  type="text"
                  value={answer}
                  onChange={(e) => updateAnswer(answerIndex, e.target.value)}
                  className="flex-1 border-b border-black/20 bg-transparent px-0 py-2 focus:outline-none focus:border-primary-main text-icons-primary pb-0"
                  placeholder={`Option ${answerIndex + 1}`}
                />
                <button
                  onClick={() => removeAnswer(answerIndex)}
                  disabled={editData.answers.length <= 2}
                  className={`w-6 h-6 self-end flex items-center justify-center text-lg ${
                    editData.answers.length <= 2
                      ? "text-gray-300 cursor-not-allowed"
                      : "text-gray-500 hover:text-red-500"
                  }`}
                >
                  -
                </button>
              </div>
            ))}

            <div className="flex justify-end">
              <button
                onClick={addAnswer}
                className="w-6 h-6 justify-self-end self-end flex items-center justify-center text-primary-font hover:text-primary-font/80 text-lg"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <label className="text-[16px] text-primary-font/80 font-extrabold w-content whitespace-nowrap">
              Question Active Till:
            </label>
            <div className="flex gap-4 w-full">
              <input
                type="date"
                value={editData.questionEndDate}
                onChange={(e) =>
                  setEditData((prev) => ({
                    ...prev,
                    questionEndDate: e.target.value,
                  }))
                }
                className="w-full h-[32px] text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main"
              />
              <div className="relative w-full">
                <input
                  type="time"
                  value={editData.questionEndTime}
                  onChange={(e) =>
                    setEditData((prev) => ({
                      ...prev,
                      questionEndTime: e.target.value,
                    }))
                  }
                  className="w-full h-[32px] text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main pr-8"
                />
                <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-icons-primary pointer-events-none" />
              </div>
            </div>
          </div>

          <div className="flex gap-4">
            <label className="block text-[16px] text-primary-font/80 font-extrabold">
              Source:
            </label>
            <div className="text-sm text-link-blue">
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
            className="mt-10 py-2.5 px-14 bg-primary-bg text-[20px] font-medium text-white rounded-full hover:bg-primary-bg/90 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="md:w-7/10 h-min bg-questions-bg border-1 border-secondary-border rounded-lg py-8 px-5 mb-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <span className="text-[16px] text-[#323A53] font-medium">
            QUESTION {questionIndex + 1}/{totalQuestions}
          </span>
          <div className="flex items-center gap-2 bg-white border-1 border-primary-main text-[13px] text-primary-main font-semibold rounded-full py-1 px-3.5">
            <span className="">Active</span>
            <span className="text-secondary-boder font-medium">until</span>{" "}
            <span className="font-normal">{formatTimeLeft()}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
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

      <hr className="mt-6 mb-5 text-[#D9D9D9]" />

      <h3 className="text-2xl font-semibold text-question mb-4">
        {question.question}
      </h3>

      <div className="flex flex-col gap-0 mb-5">
        {question.answers
          .filter((a) => a.trim())
          .map((answer, index) => (
            <div key={index} className="flex items-center gap-2">
              <div className="w-4 h-4 border-1 border-primary-main rounded-full"></div>
              <span className="text-[20px] font-normal">{answer}</span>
            </div>
          ))}
      </div>

      <div className="text-sm text-link-blue">
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
