import React, { useEffect, useState } from "react";
import axios from "axios";
import Question from "../types/Question.types";
import QuestionsList from "../components/Quiz/QuestionList";
import QuestionDisplay from "../components/Quiz/QuestionDisplay";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [score, setScore] = useState<number | null>(null); // Set score to null initially
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false); // Add a state to handle submission

  useEffect(() => {

    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php?amount=10&category=21&difficulty=easy', {
          params: {
            amount: 10,  // Number of questions
            type: 'multiple'  // Multiple-choice questions
          }
        });
        setQuestions(response.data.results);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching trivia questions:', error);
        setLoading(false);
      }
    };
    fetchQuestions();
  }, []);

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  const handleSubmitQuiz = () => {
    const totalScore = calculateScore();
    setScore(totalScore);
    setIsSubmitted(true); // Mark the quiz as submitted
  };

  const calculateScore = () => {
    return questions.reduce((totalScore, question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        return totalScore + 1;
      }
      return totalScore;
    }, 0);
  };

  return (
    <div className="w-full border border-black">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="flex flex-col">
          {!isSubmitted ? (
            <>
              <div className="flex">
                <QuestionsList
                  questions={questions}
                  currentQuestionIndex={currentQuestionIndex}
                  setCurrentQuestionIndex={setCurrentQuestionIndex}
                />
                <div className="border w-full">
                  <QuestionDisplay
                    question={questions[currentQuestionIndex]}
                    currentQuestionIndex={currentQuestionIndex}
                    setCurrentQuestionIndex={setCurrentQuestionIndex}
                    selectedAnswer={selectedAnswers[currentQuestionIndex] || ""}
                    onSelectAnswer={handleSelectAnswer}
                  />
                  <button
                    onClick={handleSubmitQuiz}
                    className="mt-6 px-6 py-1 bg-red-500 text-lg font-semibold text-white rounded-md hover:bg-red-700"
                  >
                    Submit
                  </button>
                </div>


              </div>
            </>
          ) : (
            <div className="mt-10 text-xl font-semibold">
              <p>Your Score: {score} / {questions.length}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Quiz;
