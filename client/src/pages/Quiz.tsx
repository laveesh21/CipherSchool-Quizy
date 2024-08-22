import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import Question from "../types/Question.types";
import QuestionsList from "../components/Quiz/QuestionList";
import QuestionDisplay from "../components/Quiz/QuestionDisplay";
import { useLocation, useNavigate } from "react-router-dom";
import {jwtDecode} from 'jwt-decode';

interface DecodedToken {
  _id: string;
  email: string;
  username: string;
}

const Quiz: React.FC = () => {
  const domain = import.meta.env.VITE_SERVER_URL as string;
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [cameraGranted, setCameraGranted] = useState<boolean>(false);
  const streamRef = useRef<MediaStream | null>(null);
  const location = useLocation();
  const navigate = useNavigate();

  const handleSubmitButton = async () => {
    const questionData = questions.map((question, index) => ({
      questionText: question.question,
      correctAnswer: question.correct_answer,
      selectedAnswer: selectedAnswers[index] || "",
      options: [question.correct_answer, ...question.incorrect_answers],
    }));

    const token = localStorage.getItem('token');
    const userId = token ? jwtDecode<DecodedToken>(token)._id : null;

    if (!userId) {
      alert("User ID not found. Please log in.");
      return;
    }

    try {
      await axios.post(`${domain}/test/submit`, {
        userId,
        questions: questionData,
      });

      navigate('/finish');
    } catch (error) {
      console.error("Error submitting score:", error);
      alert("There was an error submitting your score. Please try again.");
    }
  };

  // Fetching questions
  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get('https://opentdb.com/api.php', {
          params: {
            amount: 10,
            type: 'multiple',
          },
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

  // Setting up and tearing down camera
  useEffect(() => {
    const setupCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        streamRef.current = stream;
        setCameraGranted(true);

        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (error) {
        console.error("Camera access denied:", error);
        setCameraGranted(false);
      }
    };

    setupCamera();

    // Cleanup to stop the camera when the component unmounts or when leaving the page
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [location]);

  // Handling answer selection
  const handleSelectAnswer = (answer: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = answer;
    setSelectedAnswers(newAnswers);
  };

  return (
    <div className="relative w-full border border-black h-[90vh]">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="flex">
            <QuestionsList
              questions={questions}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
            <QuestionDisplay
              question={questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              setCurrentQuestionIndex={setCurrentQuestionIndex}
              selectedAnswer={selectedAnswers[currentQuestionIndex] || null}
              onSelectAnswer={handleSelectAnswer}
            />
          </div>
          <div className="mt-8 ms-16">
            <button
              onClick={handleSubmitButton}
              className="mx-6 w-[150px] bg-red-500 text-white text-xl rounded-md py-4 font-semibold"
            >
              Submit
            </button>
          </div>
        </>
      )}

      {cameraGranted && (
        <div className="absolute bottom-4 right-4 w-40 h-30 b border-green-500 rounded-lg overflow-hidden shadow-lg bg-black">
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
