"use client";
import { useState } from "react";
import Image from "next/image";
import QuestionsSection from "@/components/questions/QuestionsSection";
import {
  ContestFormData,
  Question,
  ContestValidationErrors,
  ContestFormProps,
} from "@/types/contest";
import React from "react";

function ContestForm({ contest, setContest, errors }: ContestFormProps) {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files ? e.target.files[0] : null;
    setContest((prev) => ({ ...prev, image: file }));
  };

  return (
    <div className="w-full flex flex-col sm:flex-row gap-4 sm:gap-8 md:w-full">
      <div className="w-full sm:w-[164px] h-[164px] bg-questions-bg rounded-lg border-gray-300 flex flex-col items-center justify-center relative flex-shrink-0">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        {contest.image instanceof File ? (
          <Image
            src={URL.createObjectURL(contest.image)}
            width={164}
            height={164}
            alt="Uploaded Contest Image"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <>
            <Image
              src="/images/icons/uploadIcon.png"
              width={32}
              height={32}
              alt="upload icon"
              className="w-8 h-8 text-gray-400 mb-2"
            />
            <span className="text-sm text-gray-500 text-center underline">
              Upload the Image
            </span>
          </>
        )}
      </div>

      <div className="flex-1 max-w-full h-auto sm:h-[164px] flex flex-col justify-between md:flex-1 md:max-w-full">
        <div>
          <label
            htmlFor="contestName"
            className="block text-primary-font/80 text-base font-normal"
          >
            Name of the contest
          </label>
          <input
            id="contestName"
            type="text"
            value={contest.name}
            onChange={(e) =>
              setContest((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-full h-8 border-[0.5px] border-black/24 rounded-[15px] px-4 mt-3 focus:outline-none focus:border-primary-main text-base text-primary-font/80 placeholder:text-primary-font/80 md:w-[516px]"
          />
          {errors.contestName && (
            <p className="text-red-500 text-xs mt-1">{errors.contestName}</p>
          )}
        </div>

        <div>
          <label className="block text-primary-font/80 text-base font-normal">
            Contest Active till
          </label>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-3">
            <div className="flex-1 relative">
              <input
                type="date"
                value={contest.endDate}
                onChange={(e) =>
                  setContest((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full h-8 border-[0.5px] border-black/24 rounded-[15px] px-4 focus:outline-none focus:border-primary-main text-base text-primary-font/80 placeholder:text-primary-font/80"
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="time"
                value={contest.endTime}
                onChange={(e) =>
                  setContest((prev) => ({ ...prev, endTime: e.target.value }))
                }
                className="w-full h-8 border-[0.5px] border-black/24 rounded-[15px] px-4 focus:outline-none focus:border-primary-main text-base text-primary-font/80 placeholder:text-primary-font/80"
              />
            </div>
          </div>
          {(errors.endDate || errors.endTime) && (
            <p className="text-red-500 text-xs mt-1">
              {errors.endDate || errors.endTime}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

function CreateContest() {
  const [contest, setContest] = useState<ContestFormData>({
    name: "",
    image: null,
    endDate: "",
    endTime: "",
  });

  const [questions, setQuestions] = useState<Question[]>([]);
  const [errors, setErrors] = useState<ContestValidationErrors>({});

  const validateContest = (): boolean => {
    const newErrors: ContestValidationErrors = {};

    if (!contest.name.trim()) {
      newErrors.contestName = "Contest name is required";
    }

    if (!contest.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (!contest.endTime) {
      newErrors.endTime = "End time is required";
    }

    if (questions.length === 0) {
      newErrors.questions = "At least one question is required";
    }

    questions.forEach((q, index) => {
      if (!q.question.trim()) {
        newErrors[`question_${index}`] = "Question text is required";
      }

      const validAnswers = q.answers.filter((a) => a.trim());
      if (validAnswers.length < 2) {
        newErrors[`answers_${index}`] = "At least 2 answers are required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateContest()) {
      console.log("Contest submitted:", { contest, questions });
      alert("Contest created successfully!");
    }
  };

  const addNewQuestion = () => {
    if (questions.length === 0 || validateCurrentQuestions()) {
      const newQuestion: Question = {
        id: Date.now(),
        question: "",
        answers: ["", ""],
        questionEndDate: "",
        questionEndTime: "",
      };
      setQuestions([...questions, newQuestion]);
      setErrors({});
    } else {
      validateContest();
    }
  };

  const validateCurrentQuestions = (): boolean => {
    const lastQuestion = questions[questions.length - 1];
    if (!lastQuestion) return true;

    const newErrors: ContestValidationErrors = {};
    if (!lastQuestion.question.trim()) {
      newErrors[`question_${questions.length - 1}`] =
        "Question text is required";
    }
    const validAnswers = lastQuestion.answers.filter((a) => a.trim());
    if (validAnswers.length < 2) {
      newErrors[`answers_${questions.length - 1}`] =
        "At least 2 answers are required";
    }

    setErrors((prev) => ({ ...prev, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  };

  return (
    <div className="">
      <div className="md:max-w-[713px]">
        <h1 className="text-2xl sm:text-[28px] text-primary-bg font-bold mb-6 sm:mb-10">
          Create new contest
        </h1>

        <ContestForm
          contest={contest}
          setContest={setContest}
          errors={errors}
        />

        <hr className="border-primary-bg/20 mt-6 sm:mt-8 mb-6 sm:mb-8" />

        <QuestionsSection
          questions={questions}
          setQuestions={setQuestions}
          errors={errors}
          addNewQuestion={addNewQuestion}
          handleSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}

export default CreateContest;
