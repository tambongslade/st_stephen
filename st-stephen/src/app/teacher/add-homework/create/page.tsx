'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type Question = {
  question: string;
  image?: string;
  options: { text: string; isCorrect: boolean }[];
};

export default function CreateAssignment() {
  const router = useRouter();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question>({
    question: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [assignmentTitle, setAssignmentTitle] = useState('');

  const handleAddQuestion = () => {
    if (!currentQuestion.question || 
        currentQuestion.options.some(opt => !opt.text) ||
        !currentQuestion.options.some(opt => opt.isCorrect)) {
      alert('Please fill all fields and select a correct answer');
      return;
    }

    setQuestions([...questions, currentQuestion]);
    setCurrentQuestion({
      question: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    });
  };

  const handleSubmitAssignment = async () => {
    if (!assignmentTitle || questions.length === 0) {
      alert('Please add a title and at least one question');
      return;
    }

    setLoading(true);
    try {
      const formattedQuestions = questions.map(q => ({
        content: q.question,
        options: q.options.map(opt => ({
          text: opt.text,
          isCorrect: opt.isCorrect
        }))
      }));

      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: assignmentTitle,
          questions: formattedQuestions
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create assignment');
      }

      router.back();
    } catch (error) {
      console.error('Error creating assignment:', error);
      setError('Failed to create assignment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col p-4 max-w-3xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={() => router.back()} className="p-2">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold">Create New Assignment</h1>
      </div>

      {error && (
        <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Assignment Title */}
        <div>
          <label className="block text-sm font-medium mb-2">
            Assignment Title
          </label>
          <input
            type="text"
            value={assignmentTitle}
            onChange={(e) => setAssignmentTitle(e.target.value)}
            className="w-full p-2 border rounded-lg"
            placeholder="Enter assignment title"
          />
        </div>

        {/* Current Question Form */}
        <div className="border p-4 rounded-lg">
          <h3 className="font-semibold mb-4">Add Question</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({
                ...currentQuestion,
                question: e.target.value
              })}
              className="w-full p-2 border rounded-lg"
              placeholder="Enter question"
            />

            {currentQuestion.options.map((option, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={option.text}
                  onChange={(e) => {
                    const newOptions = [...currentQuestion.options];
                    newOptions[index].text = e.target.value;
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: newOptions
                    });
                  }}
                  className="flex-1 p-2 border rounded-lg"
                  placeholder={`Option ${index + 1}`}
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={option.isCorrect}
                  onChange={() => {
                    const newOptions = currentQuestion.options.map((opt, i) => ({
                      ...opt,
                      isCorrect: i === index
                    }));
                    setCurrentQuestion({
                      ...currentQuestion,
                      options: newOptions
                    });
                  }}
                />
              </div>
            ))}

            <button
              onClick={handleAddQuestion}
              className="w-full py-2 bg-navy-blue text-white rounded-lg hover:bg-opacity-90"
            >
              Add Question
            </button>
          </div>
        </div>

        {/* Questions List */}
        {questions.length > 0 && (
          <div className="space-y-4">
            <h3 className="font-semibold">Added Questions</h3>
            {questions.map((q, index) => (
              <div key={index} className="p-4 border rounded-lg">
                <p className="font-medium">{q.question}</p>
                <ul className="mt-2 space-y-1">
                  {q.options.map((opt, optIndex) => (
                    <li key={optIndex} className={opt.isCorrect ? 'text-green-600' : ''}>
                      {opt.text} {opt.isCorrect && '✓'}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {/* Submit Button */}
        <button
          onClick={handleSubmitAssignment}
          disabled={loading}
          className="w-full py-3 bg-green-600 text-white rounded-lg hover:bg-opacity-90 disabled:bg-opacity-50"
        >
          {loading ? 'Creating Assignment...' : 'Create Assignment'}
        </button>
      </div>
    </div>
  );
} 