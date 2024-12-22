'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut } from 'lucide-react';

type Question = {
  question: string;
  image?: string;
  options: { text: string; isCorrect: boolean }[];
};

type Class = {
  id: string;
  name: string;
  slug: string;
};

type Subject = {
  id: string;
  name: string;
  imageUrl: string;
};

export default function AddHomework() {
  const router = useRouter();
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('');
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
  const [classes, setClasses] = useState<Class[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/api/classes');
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }
        setClasses(data.classes || []);
      } catch (error) {
        console.error('Error fetching classes:', error);
        setError('Failed to load classes');
      }
    };

    fetchClasses();
  }, []);

  useEffect(() => {
    const fetchSubjects = async () => {
      if (!selectedClass) return;
      
      setLoading(true);
      setError('');
      try {
      
      
        const response = await fetch(`/api/classes/${selectedClass}/subjects`);
        const data = await response.json();
       
        
        console.log('Received subjects data:', data);

        if (data.error) {
          throw new Error(data.error);
        }

        const subjectsData = data.map((item: any) => item.subject);
        setSubjects(subjectsData || []);
        
        console.log('Processed subjects:', subjectsData);
      } catch (error) {
        console.error('Error fetching subjects:', error);
        setError('Failed to load subjects');
        setSubjects([]); // Reset subjects on error
      } finally {
        setLoading(false);
      }
    };

    fetchSubjects();
  }, [selectedClass]);

  const handleAddQuestion = () => {
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

  const handleLogout = () => {
    router.push('/');
  };

  return (
    <div className="flex flex-col p-4 bg-white min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.back()} className="text-black hover:text-gray-700 transition-colors">
          <ArrowLeft size={25} />
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-black hover:text-red-600 transition-colors"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      {!selectedClass ? (
        <>
          <h2 className="text-3xl font-bold text-black text-center mb-8">Choose a class</h2>
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {classes.map((class_) => (
              <button
                key={class_.id}
                onClick={() => setSelectedClass(class_.id)}
                className="group relative w-full p-6 bg-gradient-to-r from-black/5 to-black/10 
                  border-2 border-black rounded-lg shadow-sm hover:shadow-lg 
                  transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="text-xl font-semibold text-black">
                  {class_.name}
                </span>
              </button>
            ))}
          </div>
        </>
      ) : !selectedSubject ? (
        <>
          <h2 className="text-3xl font-bold text-black text-center mb-8">Choose a subject</h2>
          {loading ? (
            <div className="text-center">Loading subjects...</div>
          ) : error ? (
            <div className="text-red-500 text-center">{error}</div>
          ) : subjects.length === 0 ? (
            <div className="text-center">No subjects found</div>
          ) : (
            <div className="flex flex-col gap-4 max-w-md mx-auto">
              {subjects.map((subject) => (
                <button
                  key={subject.id}
                  onClick={() => setSelectedSubject(subject.id)}
                  className="group relative w-full p-6 bg-gradient-to-r from-black/5 to-black/10 
                    border-2 border-black rounded-lg shadow-sm hover:shadow-lg 
                    transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
                >
                  <span className="text-xl font-semibold text-black">
                    {subject.name}
                  </span>
                </button>
              ))}
            </div>
          )}
        </>
      ) : (
        <>
          <h2 className="text-3xl font-bold text-black text-center mb-8">Create questions</h2>
          <div className="space-y-6 max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Fill question"
              value={currentQuestion.question}
              onChange={(e) => setCurrentQuestion({...currentQuestion, question: e.target.value})}
              className="w-full p-4 border-2 border-black/30 rounded-lg focus:outline-none 
                focus:ring-2 focus:ring-black focus:border-transparent"
            />
            
            <button className="w-full p-4 border-2 border-black/30 rounded-lg text-left 
              text-gray-600 hover:bg-black/5 transition-colors">
              Add image
            </button>

            <div className="space-y-3">
              {['A', 'B', 'C', 'D'].map((letter, index) => (
                <div key={letter} className="flex gap-3">
                  <input
                    type="text"
                    placeholder={`Option ${letter}`}
                    value={currentQuestion.options[index].text}
                    onChange={(e) => {
                      const newOptions = [...currentQuestion.options];
                      newOptions[index].text = e.target.value;
                      setCurrentQuestion({...currentQuestion, options: newOptions});
                    }}
                    className="flex-1 p-4 border-2 border-black/30 rounded-lg focus:outline-none 
                      focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <input
                    type="radio"
                    name="correct-answer"
                    onChange={() => {
                      const newOptions = currentQuestion.options.map((opt, i) => ({
                        ...opt,
                        isCorrect: i === index
                      }));
                      setCurrentQuestion({...currentQuestion, options: newOptions});
                    }}
                    checked={currentQuestion.options[index].isCorrect}
                    className="w-6 h-6 accent-black"
                  />
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => router.back()}
                className="flex-1 p-4 border-2 border-black text-black rounded-lg 
                  hover:bg-black hover:text-white transition-all duration-200"
              >
                Previous
              </button>
              <button
                onClick={handleAddQuestion}
                className="flex-1 p-4 bg-black text-white rounded-lg 
                  hover:bg-black/90 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 