"use client";
import { Clock, Trash2 } from "lucide-react";
import { QuestionFormProps, Question } from "@/types/contest";
import Image from "next/image";

function QuestionForm({
  question,
  questionIndex,
  setQuestions,
  errors,
}: QuestionFormProps) {
  const updateQuestion = (field: keyof Question, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === questionIndex ? { ...q, [field]: value } : q))
    );
  };

  const updateAnswer = (answerIndex: number, value: string) => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex
          ? {
              ...q,
              answers: q.answers.map((a, ai) =>
                ai === answerIndex ? value : a
              ),
            }
          : q
      )
    );
  };

  const addAnswer = () => {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === questionIndex ? { ...q, answers: [...q.answers, ""] } : q
      )
    );
  };

  const removeAnswer = (answerIndex: number) => {
    if (question.answers.length > 2) {
      setQuestions((prev) =>
        prev.map((q, i) =>
          i === questionIndex
            ? {
                ...q,
                answers: q.answers.filter((_, ai) => ai !== answerIndex),
              }
            : q
        )
      );
    }
  };

  const deleteQuestion = () => {
    setQuestions((prev) => prev.filter((_, i) => i !== questionIndex));
  };

  return (
    <div className="w-full bg-questions-bg rounded-[16px] border-l-4 pt-4 pb-5 px-4 mb-4 sm:border-l-8 sm:pt-6 sm:pb-10 sm:px-5 sm:mb-6 md:w-[713px]">
      <div className="flex items-center justify-between mb-4 sm:mb-6">
        <h4 className="text-sm text-primary-main font-bold sm:text-[16px]">
          Question {questionIndex + 1}
        </h4>
        <button
          onClick={deleteQuestion}
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

      <div className="mb-4 sm:mb-6">
        <label
          htmlFor={`question-text-${question.id}`}
          className="block text-sm text-primary-font/80 font-medium mb-[5px] sm:text-[16px]"
        >
          Type the question:
        </label>
        <textarea
          id={`question-text-${question.id}`}
          value={question.question}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            updateQuestion("question", e.target.value)
          }
          className="w-full min-h-[80px] max-h-40 overflow-scroll border border-black/24 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-main resize-none text-icons-primary text-sm font-normal sm:min-h-[110px] sm:text-[16px]"
          placeholder="Enter your question here..."
          rows={4}
        />
        {errors[`question_${questionIndex}`] && (
          <p className="text-red-500 text-xs mt-1">
            {errors[`question_${questionIndex}`]}
          </p>
        )}
      </div>

      <div className="mb-6 border border-black/24 rounded-xl py-3 px-4 sm:mb-8 sm:py-4 sm:px-5">
        {question.answers.map((answer: string, answerIndex: number) => (
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
              className="flex-1 border-b border-black/20 bg-transparent px-0 focus:outline-none focus:border-primary-main text-icons-primary text-sm pb-0 pt-2 sm:text-base"
              placeholder={`Option ${answerIndex + 1}`}
            />

            <button
              onClick={() => removeAnswer(answerIndex)}
              disabled={question.answers.length <= 2}
              className={`w-5 h-5 self-end flex items-center justify-center text-base ${
                question.answers.length <= 2
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

        {errors[`answers_${questionIndex}`] && (
          <p className="text-red-500 text-xs mt-1">
            {errors[`answers_${questionIndex}`]}
          </p>
        )}
      </div>

      <div className="flex flex-col items-start gap-3 mb-4 sm:flex-row sm:items-center sm:gap-4 sm:mb-4">
        <label className="text-sm text-primary-font/80 font-extrabold w-content whitespace-nowrap sm:text-[16px]">
          Question Active Till:
        </label>

        <div className="flex flex-col gap-3 w-full sm:flex-row sm:gap-4">
          <div className="relative w-full">
            <input
              type="date"
              value={question.questionEndDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateQuestion("questionEndDate", e.target.value)
              }
              className="w-full h-8 text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main"
            />
          </div>

          <div className="relative w-full">
            <input
              type="time"
              value={question.questionEndTime}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                updateQuestion("questionEndTime", e.target.value)
              }
              className="w-full h-8 text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main pr-8"
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-icons-primary pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row sm:gap-30">
        <label className="block text-sm text-primary-font/80 font-extrabold mb-2 sm:text-[16px]">
          Source:
        </label>
        <p className="underline text-sm font-normal text-primary-font/80 sm:text-[16px]">
          Placeholder for the link of the source of answer
        </p>
      </div>
    </div>
  );
}

export default QuestionForm;
