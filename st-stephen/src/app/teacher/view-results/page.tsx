'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

type Student = {
  id: number;
  name: string;
  result: string;
};

export default function ViewResults() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
  
  const classes = ['Form 1', 'Form 2', 'Form 3', 'Form 4 Arts', 'Form 4 Sc', 'Form 5 Arts', 'LSS', 'LSA', 'U6'];
  const subjects = ['Subject 1', 'Subject 2', 'Subject 3', 'Subject 4', 'Subject 5', 'Subject 6', 'Subject 7', 'Subject 8', 'Subject 9'];
  
  const mockResults: Student[] = Array.from({ length: 10 }, (_, i) => ({
    id: i + 1,
    name: `Student name`,
    result: '15/20'
  }));

  return (
    <div className="flex flex-col p-4">
      <div className="flex items-center mb-8">
        <button onClick={() => router.back()}>
          <ArrowLeft size={25} />
        </button>
      </div>

      {!selectedClass ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Choose a class</h2>
          <div className="grid grid-cols-3 gap-4">
            {classes.map((class_) => (
              <button
                key={class_}
                onClick={() => setSelectedClass(class_)}
                className="aspect-square bg-navy-blue text-white rounded-lg p-4 flex items-center justify-center"
              >
                {class_}
              </button>
            ))}
          </div>
        </>
      ) : !selectedSubject ? (
        <>
          <h2 className="text-2xl font-bold mb-6">Choose a subject</h2>
          <div className="grid grid-cols-3 gap-4">
            {subjects.map((subject) => (
              <button
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className="aspect-square bg-navy-blue text-white rounded-lg p-4 flex items-center justify-center"
              >
                {subject}
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold mb-6">{selectedClass} results</h2>
          <div className="space-y-4">
            {mockResults.map((student) => (
              <div key={student.id} className="flex items-center gap-4 p-4 bg-white rounded-lg shadow">
                <div className="w-8">{student.id}.</div>
                <div className="flex-1">{student.name}</div>
                <div>{student.result}</div>
              </div>
            ))}
          </div>
          
          <div className="flex gap-4 mt-4">
            <button
              onClick={() => router.back()}
              className="flex-1 p-3 bg-gray-200 rounded-lg"
            >
              Previous
            </button>
            <button
              className="flex-1 p-3 bg-navy-blue text-white rounded-lg"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
} 