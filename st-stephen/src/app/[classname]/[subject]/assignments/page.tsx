'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, Plus, Edit, Trash2 } from "lucide-react";

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

export default function AssignmentsPage() {
  const params = useParams();
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState(true);
  const [isTeacher, setIsTeacher] = useState(false);

  useEffect(() => {
    const checkTeacherStatus = async () => {
      setIsTeacher(localStorage.getItem('userRole') === 'teacher');
    };

    checkTeacherStatus();
    fetchAssignments();
  }, [params.subject]);

  const fetchAssignments = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/subjects/${params.subject}/assignments`);
      if (!response.ok) throw new Error('Failed to fetch assignments');
      const data = await response.json();
      setAssignments(data);
    } catch (error) {
      console.error('Error fetching assignments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    router.push(`/${params.classname}`);
  };

  const handleCreateAssignment = () => {
    router.push('/teacher/add-homework');
  };

  const handleEditAssignment = (assignmentId: string) => {
    router.push(`/${params.classname}/${params.subject}/assignments/${assignmentId}/edit`);
  };

  const handleDeleteAssignment = async (assignmentId: string) => {
    if (!confirm('Are you sure you want to delete this assignment?')) return;

    try {
      const response = await fetch(`/api/assignments/${assignmentId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete assignment');
      
      fetchAssignments();
    } catch (error) {
      console.error('Error deleting assignment:', error);
    }
  };

  const handleStartAssignment = (assignmentId: string) => {
    router.push(`/${params.classname}/${params.subject}/assignment/${assignmentId}`);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={handleBack}>
          <ArrowLeft size={25} />
        </button>
        {isTeacher && (
          <button 
            onClick={handleCreateAssignment}
            className="flex items-center gap-2 bg-navy-blue text-white px-4 py-2 rounded-lg"
          >
            <Plus size={20} />
            Create Assignment
          </button>
        )}
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Assignments</h2>

      {loading ? (
        <div className="text-center">Loading assignments...</div>
      ) : assignments.length === 0 ? (
        <div className="text-center flex flex-col items-center gap-4">
          <p className="text-gray-500">No assignments available</p>
          {isTeacher && (
            <button
              onClick={handleCreateAssignment}
              className="flex items-center gap-2 bg-navy-blue text-white px-6 py-3 rounded-lg"
            >
              <Plus size={20} />
              Create Your First Assignment
            </button>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {assignments.map((assignment) => (
            <div 
              key={assignment.id}
              className="bg-white border border-gray-200 rounded-lg p-4"
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-lg font-semibold">{assignment.title}</h3>
                {isTeacher && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEditAssignment(assignment.id)}
                      className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg"
                    >
                      <Edit size={20} />
                    </button>
                    <button
                      onClick={() => handleDeleteAssignment(assignment.id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-600 mb-4">
                {assignment.questions.length} questions
              </p>
              <button
                onClick={() => handleStartAssignment(assignment.id)}
                className="w-full bg-navy-blue text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors"
              >
                {isTeacher ? 'Preview Assignment' : 'Start Assignment'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 