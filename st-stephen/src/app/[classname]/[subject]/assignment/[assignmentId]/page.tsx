'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";

interface Question {
  id: string;
  content: string;
  answer: string;
}

interface Assignment {
  id: string;
  title: string;
  questions: Question[];
}

export default function AssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`/api/assignments/${params.assignmentId}`);
        const data = await response.json();
        setAssignment(data);
        setUserAnswers(new Array(data.questions.length).fill(''));
      } catch (error) {
        console.error('Error fetching assignment:', error);
      }
    };

    fetchAssignment();
  }, [params.assignmentId]);

  const handleNext = () => {
    if (!assignment) return;

    const newAnswers = [...userAnswers];
    newAnswers[currentQuestionIndex] = selectedAnswer || '';
    setUserAnswers(newAnswers);

    // Check if answer is correct
    const currentQuestion = assignment.questions[currentQuestionIndex];
    const isAnswerCorrect = selectedAnswer === currentQuestion.answer;
    setIsCorrect(isAnswerCorrect);
    setShowFeedback(true);

    // Wait for feedback before moving to next question
    setTimeout(() => {
      setShowFeedback(false);
      if (currentQuestionIndex < assignment.questions.length - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedAnswer(null);
      } else {
        // Calculate final score
        const score = newAnswers.reduce((total, answer, index) => {
          return total + (answer === assignment.questions[index].answer ? 1 : 0);
        }, 0);
        
        router.push(
          `/${params.classname}/${params.subject}/assignment/${params.assignmentId}/success?score=${score}`
        );
      }
    }, 1500);
  };

  if (!assignment) return <div>Loading...</div>;

  const currentQuestion = assignment.questions[currentQuestionIndex];

  return (
    <div className="flex flex-col p-4">
      <button onClick={() => router.back()}>
        <ArrowLeft size={25} />
      </button>

      <div className="mt-8">
        <h1 className="text-2xl font-bold mb-4">{assignment.title}</h1>
        
        <div className="mb-4">
          Question {currentQuestionIndex + 1} of {assignment.questions.length}
        </div>

        <div className="mb-6">
          <h2 className="text-xl mb-4">{currentQuestion.content}</h2>
          
          <div className="space-y-2">
            {['A', 'B', 'C', 'D'].map((option) => (
              <button
                key={option}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full p-3 text-left rounded ${
                  selectedAnswer === option 
                    ? 'bg-blue-100 border-blue-500' 
                    : 'bg-white border-gray-200'
                } border`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>

        {showFeedback && (
          <div className={`p-4 rounded mb-4 ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
          }`}>
            {isCorrect ? 'Correct!' : 'Incorrect. Try again!'}
          </div>
        )}

        <button
          onClick={handleNext}
          disabled={!selectedAnswer}
          className={`w-full py-3 rounded-lg ${
            selectedAnswer 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-300 text-gray-500'
          }`}
        >
          {currentQuestionIndex === assignment.questions.length - 1 ? 'Finish' : 'Next'}
        </button>
      </div>
    </div>
  );
} 