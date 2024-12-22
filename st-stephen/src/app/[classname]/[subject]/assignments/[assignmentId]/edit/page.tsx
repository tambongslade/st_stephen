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

export default function EditAssignmentPage() {
  const params = useParams();
  const router = useRouter();
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAssignment = async () => {
      try {
        const response = await fetch(`/api/assignments/${params.assignmentId}`);
        const data = await response.json();
        setAssignment(data);
        setTitle(data.title);
        setQuestions(data.questions);
      } catch (error) {
        console.error('Error fetching assignment:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAssignment();
  }, [params.assignmentId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(`/api/assignments/${params.assignmentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          questions
        }),
      });

      if (!response.ok) throw new Error('Failed to update assignment');

      router.push(`/${params.classname}/${params.subject}/assignments`);
    } catch (error) {
      console.error('Error updating assignment:', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!assignment) return <div>Assignment not found</div>;

  return (
    <div className="flex flex-col p-4">
      <button onClick={() => router.back()} className="mb-6">
        <ArrowLeft size={25} />
      </button>

      <h1 className="text-2xl font-bold mb-6">Edit Assignment</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-4 border rounded-lg"
          placeholder="Assignment Title"
          required
        />

        {questions.map((question, index) => (
          <div key={question.id} className="p-4 border rounded-lg space-y-4">
            <input
              type="text"
              value={question.content}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].content = e.target.value;
                setQuestions(newQuestions);
              }}
              className="w-full p-4 border rounded-lg"
              placeholder="Question"
              required
            />
            <input
              type="text"
              value={question.answer}
              onChange={(e) => {
                const newQuestions = [...questions];
                newQuestions[index].answer = e.target.value;
                setQuestions(newQuestions);
              }}
              className="w-full p-4 border rounded-lg"
              placeholder="Answer"
              required
            />
          </div>
        ))}

        <button
          type="submit"
          className="w-full bg-navy-blue text-white p-4 rounded-lg hover:bg-opacity-90"
        >
          Update Assignment
        </button>
      </form>
    </div>
  );
} 