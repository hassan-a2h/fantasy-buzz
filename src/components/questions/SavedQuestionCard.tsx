"use client";

import { useState } from "react";
import QuestionForm from "./QuestionForm";
import { Edit } from "lucide-react";

function SavedQuestionCard({ question, questionIndex, setQuestions }) {
  const [isEditing, setIsEditing] = useState(false);

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
    <div className="w-[713px] border-1 border-primary-bg rounded-[16px] px-[18px] py-7 mb-4 bg-questions-bg">
      <div className="flex items-center justify-between mb-2">
        <h4 className="text-[16px] text-primary-main font-bold">
          Question {questionIndex + 1}
        </h4>
        <button
          onClick={editQuestion}
          className="w-6 h-6 hover:cursor-pointer flex items-center justify-center text-gray-500 hover:text-primary-main"
        >
          <Edit className="w-4 h-4" />
        </button>
      </div>

      <div className="mb-7">
        <h5 className="mb-4 text-ternart-font font-semibold">
          {question.question}
        </h5>

        <div className="mb-4">
          {question.answers
            .filter((a) => a.trim())
            .map((answer, index) => (
              <div key={index} className="flex items-center gap-3 mb-2">
                <input
                  type="radio"
                  className="border-1 border-ternary-font"
                  name={`question_${questionIndex}`}
                  disabled
                />
                <span className="text-sm">{answer}</span>
              </div>
            ))}
        </div>
      </div>

      <div className="text-xs text-gray-500">
        <div className="mb-5 flex items-center">
          {" "}
          <strong className="text-[16px] font-extrabold text-primary-font/80 w-[170px] mr-20">
            Question Active Till:
          </strong>{" "}
          <div className="text-[16px] font-normal text-primary-font/80 flex">
            {" "}
            <span className="mr-10">{question.questionEndDate}</span>
            <span>{question.questionEndTime}</span>
          </div>
        </div>
        <div className="flex items-center">
          {" "}
          <strong className="text-[16px] font-extrabold text-primary-font/80 w-[170px] mr-10">
            Source:
          </strong>{" "}
          <p className="underline text-[16px] font-normal text-primary-font/80">
            Placeholder for the link of the source of answer
          </p>
        </div>
      </div>
    </div>
  );
}

export default SavedQuestionCard;
