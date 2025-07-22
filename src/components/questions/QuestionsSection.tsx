import QuestionForm from "./QuestionForm";
import SavedQuestionCard from "./SavedQuestionCard";
import { Plus } from "lucide-react";

function QuestionsSection({
  questions,
  setQuestions,
  errors,
  addNewQuestion,
  handleSubmit,
}) {
  return (
    <div>
      {questions.map((question, index) => {
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

      <div className="flex justify-between items-center mt-8">
        <button
          onClick={addNewQuestion}
          className="text-primary-main text-xl font-medium flex items-center gap-2 hover:underline hover:cursor-pointer"
        >
          New Question <Plus className="w-4 h-4" />
        </button>

        <button
          onClick={handleSubmit}
          className="bg-primary-main text-white px-[45px] py-[9px] rounded-full hover:bg-primary-main/90 transition-colors text-xl font-medium"
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
