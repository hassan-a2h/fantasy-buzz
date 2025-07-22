"use client";
import { useState } from "react";
import Image from "next/image";
import Sidebar from "@/components/ui/Sidebar";
import Topbar from "@/components/ui/Topbar";
import QuestionsSection from "@/components/questions/QuestionsSection";

function CreateContest() {
  const [contest, setContest] = useState({
    name: "",
    image: null,
    endDate: "",
    endTime: "",
  });

  const [questions, setQuestions] = useState([]);
  const [errors, setErrors] = useState({});

  const validateContest = () => {
    const newErrors = {};

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
      const newQuestion = {
        id: Date.now(),
        question: "",
        answers: ["", ""],
        questionEndDate: "",
        questionEndTime: "",
      };
      setQuestions([...questions, newQuestion]);
    }
  };

  const validateCurrentQuestions = () => {
    const lastQuestion = questions[questions.length - 1];
    return (
      lastQuestion &&
      lastQuestion.question.trim() &&
      lastQuestion.answers.filter((a) => a.trim()).length >= 2
    );
  };

  return (
    <div>
      <div>
        <div>
          <div className="md:max-w-[713px]">
            <h1 className="text-[28px] text-primary-bg font-bold mb-10">
              Create new contest
            </h1>

            <ContestForm
              contest={contest}
              setContest={setContest}
              errors={errors}
            />

            <hr className="border-primary-bg/20 mt-8 mb-8" />

            <QuestionsSection
              questions={questions}
              setQuestions={setQuestions}
              errors={errors}
              addNewQuestion={addNewQuestion}
              handleSubmit={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function ContestForm({ contest, setContest, errors }) {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setContest((prev) => ({ ...prev, image: file }));
  };

  return (
    <div className="w-full flex gap-8">
      {/* Image Upload - 164px square */}
      <div className="w-[164px] h-[164px] bg-questions-bg rounded-lg border-gray-300 flex flex-col items-center justify-center relative">
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
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
      </div>

      <div className="flex-1 max-w-full h-[164px] flex flex-col justify-between">
        <div>
          <label className="block text-primary-font/80 text-[16px] font-normal">
            Name of the contest
          </label>
          <input
            type="text"
            value={contest.name}
            onChange={(e) =>
              setContest((prev) => ({ ...prev, name: e.target.value }))
            }
            className="w-[516px] h-[32px] border-[0.5px] border-black/24 rounded-[15px] px-4 mt-3 focus:outline-none focus:border-primary-main  text-[16px] text-primary-font/80 placeholder:text-primary-font/80"
          />
          {errors.contestName && (
            <p className="text-red-500 text-xs mt-1">{errors.contestName}</p>
          )}
        </div>

        <div>
          <label className="block text-primary-font/80 text-[16px] font-normal">
            Contest Active till
          </label>
          <div className="flex gap-4 mt-3">
            <div className="flex-1 relative">
              <input
                type="date"
                value={contest.endDate}
                onChange={(e) =>
                  setContest((prev) => ({ ...prev, endDate: e.target.value }))
                }
                className="w-full h-[32px] border-[0.5px] border-black/24 rounded-[15px] px-4 focus:outline-none focus:border-primary-main text-[16px] text-primary-font/80 placeholder:text-primary-font/80"
                placeholder="yy/mm/dd"
              />
            </div>
            <div className="flex-1 relative">
              <input
                type="time"
                value={contest.endTime}
                onChange={(e) =>
                  setContest((prev) => ({ ...prev, endTime: e.target.value }))
                }
                className="w-full h-[32px] border-[0.5px] border-black/24 rounded-[15px] px-4 focus:outline-none focus:border-primary-main  text-[16px] text-primary-font/80 placeholder:text-primary-font/80"
                placeholder="00h:00m:00s"
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

export default CreateContest;
