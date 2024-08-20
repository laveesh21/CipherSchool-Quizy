
import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

const FinishTest: React.FC = () => {
  const navigate = useNavigate();
  const streamRef = useRef<MediaStream | null>(null);

  // Stop camera and microphone
  useEffect(() => {
    const stopMediaTracks = (stream: MediaStream) => {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
    };

    // Access the media stream (camera and microphone)
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then((stream) => {
        streamRef.current = stream;
        stopMediaTracks(stream);
      })
      .catch((error) => {
        console.error('Error stopping media tracks:', error);
      });

    // Cleanup on component unmount
    return () => {
      if (streamRef.current) {
        stopMediaTracks(streamRef.current);
      }
    };
  }, []);

  const handleExit = () => {
    navigate('/');  // Navigate to the home or another desired page
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Test Completed</h1>
      <p className="text-lg text-gray-600 mb-8">
        Your test is completed. You can now exit.
      </p>
      <button
        onClick={handleExit}
        className="px-6 py-3 bg-blue-500 text-white rounded-md text-xl font-semibold hover:bg-blue-600"
      >
        Exit
      </button>
    </div>
  );
};

export default FinishTest;
