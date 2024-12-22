'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft } from "lucide-react";

interface Question {
  content: string;
  options: {
    text: string;
    isCorrect: boolean;
  }[];
}

export default function CreateAssignment() {
  const params = useParams();
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([{
    content: '',
    options: [
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false },
      { text: '', isCorrect: false }
    ]
  }]);

  const handleAddQuestion = () => {
    setQuestions([...questions, {
      content: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false }
      ]
    }]);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          subjectId: params.subject,
          questions
        }),
      });

      if (!response.ok) throw new Error('Failed to create assignment');
      
      router.push(`/${params.classname}/${params.subject}/assignments`);
    } catch (error) {
      console.error('Error creating assignment:', error);
    }
  };

  return (
    <div className="flex flex-col p-4 max-w-3xl mx-auto">
      <button onClick={() => router.back()} className="mb-6">
        <ArrowLeft size={25} />
      </button>

      <h1 className="text-2xl font-bold mb-6">Create New Assignment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2">Assignment Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        {questions.map((question, qIndex) => (
          <div key={qIndex} className="p-4 border rounded space-y-4">
            <div>
              <label className="block mb-2">Question {qIndex + 1}</label>
              <input
                type="text"
                value={question.content}
                onChange={(e) => {
                  const newQuestions = [...questions];
                  newQuestions[qIndex].content = e.target.value;
                  setQuestions(newQuestions);
                }}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div className="space-y-2">
              <label className="block mb-2">Options</label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={option.text}
                    onChange={(e) => {
                      const newQuestions = [...questions];
                      newQuestions[qIndex].options[oIndex].text = e.target.value;
                      setQuestions(newQuestions);
                    }}
                    className="flex-1 p-2 border rounded"
                    required
                  />
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={option.isCorrect}
                      onChange={() => {
                        const newQuestions = [...questions];
                        newQuestions[qIndex].options.forEach((opt, i) => {
                          opt.isCorrect = i === oIndex;
                        });
                        setQuestions(newQuestions);
                      }}
                      required
                    />
                    Correct
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddQuestion}
          className="w-full p-2 border border-dashed rounded hover:bg-gray-50"
        >
          Add Question
        </button>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded"
        >
          Create Assignment
        </button>
      </form>
    </div>
  );
} 