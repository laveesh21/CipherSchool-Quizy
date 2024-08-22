import React, { useEffect, useState, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Permission: React.FC = () => {
  const [cameraGranted, setCameraGranted] = useState<boolean>(false);
  const [micGranted, setMicGranted] = useState<boolean>(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const location = useLocation()
  const navigate = useNavigate();


  useEffect(() => {
    const requestPermissions = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: true,
          audio: true,
        });

        if (videoRef.current) {
          videoRef.current.srcObject = stream;

        }

        streamRef.current = stream;
        setCameraGranted(true);
        setMicGranted(true);
      } catch (error) {
        console.error("Permission denied:", error);
        setCameraGranted(false);
        setMicGranted(false);
      }
    };

    requestPermissions();

    return () => {
      // Stop the video stream when the component unmounts or the route changes
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
    };
  }, [location]);

  const handleStartTest = () => {
    if (cameraGranted && micGranted) {
      navigate("/quiz/category");
    } else {
      alert("Please grant camera and microphone permissions to start the quiz.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-[90vh] gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold">Grant Permissions</h1>
        <p className="text-gray-600">Please allow camera and microphone access to proceed with the test.</p>
      </div>

      <div
        className={`w-64 h-48 border-4 ${cameraGranted ? "border-green-500" : "border-red-500"
          }`}
      >
        <video
          ref={videoRef}
          autoPlay
          muted
          className="w-full h-full object-cover"
        />
      </div>

      <div
        className={`p-4 rounded-full border-4 ${micGranted ? "border-green-500" : "border-red-500"
          }`}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-10 h-10 text-black"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 14c1.657 0 3-1.343 3-3V7a3 3 0 10-6 0v4c0 1.657 1.343 3 3 3z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19 10v2a7 7 0 01-14 0v-2M15 21H9"
          />
        </svg>
      </div>

      <button
        className={`px-8 py-4 text-white font-semibold rounded-md ${cameraGranted && micGranted
          ? "bg-green-600 hover:bg-green-700"
          : "bg-gray-600 cursor-not-allowed"
          }`}
        onClick={handleStartTest}
      >
        Start Test
      </button>
    </div>
  );
};

export default Permission;

