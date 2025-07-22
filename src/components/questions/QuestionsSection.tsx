"use client";
import QuestionForm from "./QuestionForm";
import SavedQuestionCard from "./SavedQuestionCard";
import { Plus } from "lucide-react";
import { QuestionsSectionProps, Question } from "@/types/contest";
import React from "react";

function QuestionsSection({
  questions,
  setQuestions,
  errors,
  addNewQuestion,
  handleSubmit,
}: QuestionsSectionProps) {
  return (
    <div>
      {questions.map((question: Question, index: number) => {
        if (index === questions.length - 1) {
          return (
            <QuestionForm
              key={question.id}
              question={question}
              questionIndex={index}
              setQuestions={setQuestions}
              errors={errors}
              isEditable={true}
            />
          );
        } else {
          return (
            <SavedQuestionCard
              key={question.id}
              question={question}
              questionIndex={index}
              setQuestions={setQuestions}
            />
          );
        }
      })}

      <div className="flex flex-col sm:flex-row justify-between items-center mt-6 gap-4 sm:mt-8 md:flex-row md:justify-between md:items-center md:mt-8">
        <button
          onClick={addNewQuestion}
          className="text-primary-main text-lg font-medium flex items-center gap-2 hover:underline hover:cursor-pointer whitespace-nowrap sm:text-xl"
        >
          New Question <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleSubmit}
          className="bg-primary-main text-white px-8 py-2 rounded-full hover:bg-primary-main/90 transition-colors text-lg font-medium sm:px-[45px] sm:py-[9px] sm:text-xl"
        >
          Submit
        </button>
      </div>

      {errors.questions && (
        <p className="text-red-500 text-xs mt-2">{errors.questions}</p>
      )}
    </div>
  );
}

export default QuestionsSection;
