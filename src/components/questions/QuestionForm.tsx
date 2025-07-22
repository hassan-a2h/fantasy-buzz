import { Clock, Trash2 } from "lucide-react";

function QuestionForm({
  question,
  questionIndex,
  setQuestions,
  errors,
  isEditable,
}) {
  const updateQuestion = (field, value) => {
    setQuestions((prev) =>
      prev.map((q, i) => (i === questionIndex ? { ...q, [field]: value } : q))
    );
  };

  const updateAnswer = (answerIndex, value) => {
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

  const removeAnswer = (answerIndex) => {
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
    <div className="w-[713px] bg-questions-bg rounded-[16px] border-l-8 border-l-primary-bg pt-6 pb-10 px-5 mb-6">
      <div className="flex items-center justify-between mb-6">
        <h4 className="text-[16px] text-primary-main font-bold">
          Question {questionIndex + 1}
        </h4>
        <button
          onClick={deleteQuestion}
          className="w-6 h-6 hover:cursor-pointer flex items-center justify-center text-red-500 hover:text-red-700"
        >
          <Trash2 className="w-[18px] h-[16px]" />
        </button>
      </div>

      <div className="mb-6">
        <label className="block text-[16px] text-primary-font/80 font-medium mb-[5px]">
          Type the question:
        </label>
        <textarea
          value={question.question}
          onChange={(e) => updateQuestion("question", e.target.value)}
          className="w-full min-h-[110px] max-h-25 overflow-scroll border border-black/24 rounded-xl px-4 py-3 focus:outline-none focus:border-primary-main resize-none text-icons-primary text-[16px] font-normal"
          placeholder="Enter your question here..."
          rows={4}
        />
        {errors[`question_${questionIndex}`] && (
          <p className="text-red-500 text-xs mt-1">
            {errors[`question_${questionIndex}`]}
          </p>
        )}
      </div>

      <div className="mb-8  border border-black/24 rounded-xl py-4 px-5">
        {question.answers.map((answer, answerIndex) => (
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
              disabled={question.answers.length <= 2}
              className={`w-6 h-6 self-end flex items-center justify-center text-lg ${
                question.answers.length <= 2
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

        {errors[`answers_${questionIndex}`] && (
          <p className="text-red-500 text-xs mt-1">
            {errors[`answers_${questionIndex}`]}
          </p>
        )}
      </div>

      <div className="flex items-center gap-4 mb-4">
        <label className="text-[16px] text-primary-font/80 font-extrabold w-content whitespace-nowrap">
          Question Active Till:
        </label>

        <div className="flex gap-4 w-full">
          <div className="relative w-full">
            <input
              type="date"
              value={question.questionEndDate}
              onChange={(e) =>
                updateQuestion("questionEndDate", e.target.value)
              }
              className="w-full h-[32px] text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main"
              placeholder="yy/mm/dd"
            />
          </div>

          <div className="relative w-full">
            <input
              type="time"
              value={question.questionEndTime}
              onChange={(e) =>
                updateQuestion("questionEndTime", e.target.value)
              }
              className="w-full h-[32px] text-primary-font/80 border-[0.5px] border-black/24 rounded-[15px] px-3 text-sm focus:outline-none focus:border-primary-main pr-8"
              placeholder="00h:00m:00s"
            />
            <Clock className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-icons-primary pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="flex gap-30">
        <label className="block text-[16px] text-primary-font/80 font-extrabold mb-2">
          Source:
        </label>
        <p className="underline text-[16px] font-normal text-primary-font/80">
          Placeholder for the link of the source of answer
        </p>
      </div>
    </div>
  );
}

export default QuestionForm;
