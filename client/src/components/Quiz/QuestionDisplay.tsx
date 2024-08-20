import React from "react";
import Question from "../../types/Question.types";

interface QuestionDisplayProps {
  question: Question;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: (index: number | ((prevIndex: number) => number)) => void;
  selectedAnswer: string | null;
  onSelectAnswer: (answer: string) => void;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({
  question,
  currentQuestionIndex,
  setCurrentQuestionIndex,
  selectedAnswer,
  onSelectAnswer,
}) => {

  const optionLetters = ['A', 'B', 'C', 'D'];

  const handleOnClickNext = () => {
    setCurrentQuestionIndex((prevIndex: number) => (prevIndex + 1) % 10);
  };

  const handleOnClickPrevious = () => {
    setCurrentQuestionIndex((prevIndex: number) => (prevIndex - 1 + 10) % 10);
  };

  const handleSelectAnswer = (answer: string) => {
    onSelectAnswer(answer);
  };

  return (
    <div className="w-3/4 p-6 flex h-full flex-col justify-between">
      <div className="bg-zinc-100 p-6 my-10 shadow-md rounded-lg">
        <div className="text-2xl text-black mb-4 flex gap-4">
          <h2 className="font-semibold">Q.{currentQuestionIndex + 1}</h2>
          <h2>{question.question}</h2>
        </div>

        <ul className="space-y-2 mt-6">
          {[...question.incorrect_answers, question.correct_answer].sort().map((answer, index) => (
            <li
              key={index}
              className={`border border-black text-black p-3 rounded cursor-pointer  
                ${selectedAnswer === answer ? 'bg-blue-500 text-white border-blue-600 font-semibold' : 'hover:bg-blue-200 hover:border-blue-600 hover:text-blue-600 '}`}
              onClick={() => handleSelectAnswer(answer)}
            >
              <div className="flex justify-between items-center">
                <div className="flex gap-4">
                  <p>{optionLetters[index]}.</p>
                  <p>{answer}</p>
                </div>
                {selectedAnswer === answer && <div className="text-white font-semibold">Selected</div>}
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="px-6 w-full h-10 flex justify-between items-center">
        <button
          className="px-7 py-1 bg-blue-600 text-xl font-semibold text-white rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleOnClickPrevious}
        >
          Previous
        </button>
        <button
          className="px-7 py-1 bg-blue-600 text-xl font-semibold text-white rounded-md hover:bg-blue-700 transition duration-300"
          onClick={handleOnClickNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default QuestionDisplay;
