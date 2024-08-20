import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Question from "../types/Question.types";
import QuestionsList from "../components/Quiz/QuestionList";
import QuestionDisplay from "../components/Quiz/QuestionDisplay";
import { useNavigate } from "react-router-dom";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraGranted, setCameraGranted] = useState<boolean>(false);
  const navigate = useNavigate()

  const handleSubmitButton = async () => {
    let score = 0;
    questions.forEach((question, index) => {
      if (selectedAnswers[index] === question.correct_answer) {
        score++;
      }
    });

    // Send the score to the backend
    try {
      // -------------------------------------------------MAKE ROUTE TO HANDLE SCORE
      await axios.post('/api/submit-score', { score });

    } catch (error) {
      console.error("Error submitting score:", error);
      alert("There was an error submitting your score. Please try again.");
    }
  }

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
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

    // Set up camera stream
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
        setCameraGranted(true);
      } catch (error) {
        console.error("Camera access denied:", error);
        setCameraGranted(false);
      }
    };
    setupCamera();
  }, []);

  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
    // ---------------------------------------------------------------Vgc
    console.log(selectedAnswers)
  };

  return (
    <div className="relative w-full border border-black h-[90vh]">
      {loading ? <p>Loading...</p> :
        <>
          <div className="flex">
            <QuestionsList questions={questions} currentQuestionIndex={currentQuestionIndex} setCurrentQuestionIndex={setCurrentQuestionIndex} />

            <QuestionDisplay
              question={questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              selectedAnswer={selectedAnswers[currentQuestionIndex] || null}
              onSelectAnswer={handleSelectAnswer}
            />
          </div>
          <div className="mt-8 ms-16">
            <button onClick={handleSubmitButton} className="mx-6 w-[150px] bg-red-500 text-white text-xl rounded-md  py-4 font-semibold">Submit</button>
          </div>

        </>
      }

      {/* Small Video Window for Camera Preview */}
      {cameraGranted && (
        <div className="absolute bottom-4 right-4 w-40 h-30 b border-green-500 rounded-lg overflow-hidden shadow-lg">
          <video
            ref={videoRef}
            autoPlay
            muted
            className="w-full h-full object-cover"
          />
        </div>
      )}
    </div>
  );
};

export default Quiz;

