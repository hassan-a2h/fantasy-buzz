"use client";

import { useState, createContext, useContext } from "react";

const ContestContext = createContext();

export const useContests = () => {
  const context = useContext(ContestContext);
  if (!context) {
    throw new Error("useContests must be used within ContestProvider");
  }
  return context;
};

export const ContestProvider = ({ children }) => {
  const [contests, setContests] = useState([
    {
      id: 1,
      name: "Ongoing Contest",
      image: null,
      endDate: "2025-07-30",
      endTime: "23:59",
      description: "Add, remove questions",
      questions: [
        {
          id: 1,
          question: "Will the 2024 MacBook Pro have a 5G chip?",
          answers: ["Yes", "No"],
          questionEndDate: "2025-07-23",
          questionEndTime: "21:40",
          source: "Verified By Source Name",
          isActive: true,
        },
        {
          id: 2,
          question: "Will the 2024 MacBook Pro have a 5G chip?",
          answers: ["Yes", "No"],
          questionEndDate: "2025-07-21",
          questionEndTime: "21:40",
          source: "Verified By Source Name",
          isActive: true,
        },
        {
          id: 3,
          question: "Will the 2024 MacBook Pro have a 5G chip?",
          answers: ["Yes", "No"],
          questionEndDate: "2025-07-21",
          questionEndTime: "21:40",
          source: "Verified By Source Name",
          isActive: true,
        },
      ],
    },
    {
      id: 2,
      name: "Contest 1",
      image: null,
      endDate: "2025-06-23",
      endTime: "18:00",
      description:
        "Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit dolores",
      questions: [],
    },
    {
      id: 3,
      name: "Contest 2",
      image: null,
      endDate: "2025-06-23",
      endTime: "20:00",
      description:
        "Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit dolores",
      questions: [],
    },
    {
      id: 4,
      name: "Contest 3",
      image: null,
      endDate: "2025-06-23",
      endTime: "16:30",
      description:
        "Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit est Lorem Ipsum dolores omit dolores",
      questions: [],
    },
  ]);

  const isContestOngoing = (contest) => {
    const now = new Date();
    const endDateTime = new Date(`${contest.endDate}T${contest.endTime}`);
    return endDateTime > now;
  };

  const getOngoingContest = () => {
    return contests.find((contest) => isContestOngoing(contest));
  };

  const getArchivedContests = () => {
    return contests.filter((contest) => !isContestOngoing(contest));
  };

  const addContest = (contest) => {
    setContests((prev) => [...prev, { ...contest, id: Date.now() }]);
  };

  const updateContest = (id, updatedContest) => {
    setContests((prev) =>
      prev.map((contest) =>
        contest.id === id ? { ...contest, ...updatedContest } : contest
      )
    );
  };

  const deleteContest = (id) => {
    setContests((prev) => prev.filter((contest) => contest.id !== id));
  };

  const updateQuestion = (contestId, questionId, updatedQuestion) => {
    setContests((prev) =>
      prev.map((contest) =>
        contest.id === contestId
          ? {
              ...contest,
              questions: contest.questions.map((q) =>
                q.id === questionId ? { ...q, ...updatedQuestion } : q
              ),
            }
          : contest
      )
    );
  };

  const deleteQuestion = (contestId, questionId) => {
    setContests((prev) =>
      prev.map((contest) =>
        contest.id === contestId
          ? {
              ...contest,
              questions: contest.questions.filter((q) => q.id !== questionId),
            }
          : contest
      )
    );
  };

  return (
    <ContestContext.Provider
      value={{
        contests,
        addContest,
        updateContest,
        deleteContest,
        getOngoingContest,
        getArchivedContests,
        updateQuestion,
        deleteQuestion,
        isContestOngoing,
      }}
    >
      {children}
    </ContestContext.Provider>
  );
};
