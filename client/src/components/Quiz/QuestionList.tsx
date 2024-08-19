import React from "react";
import Question from "../../types/Question.types";

interface QuestionsListProps {
  questions: Question[];
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number) => void;
}

const QuestionsList: React.FC<QuestionsListProps> = ({
  questions,
  currentQuestionIndex,
  setCurrentQuestionIndex,
}) => {
  return (
    <div className="w-1/4 bg-white p-4 border-r border-gray-300 shadow-lg">
      <ul className="space-y-3">
        {questions.map((_, index) => (
          <li
            key={index}
            className={`cursor-pointer rounded-lg py-2 px-4 text-gray-700 hover:bg-blue-100 hover:text-blue-600 transition duration-300 shadow-sm ${currentQuestionIndex === index ? "bg-blue-100 text-blue-600 font-semibold" : "bg-gray-100"}`}
            onClick={() => setCurrentQuestionIndex(index)}
          >
            Question {index + 1}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionsList;

