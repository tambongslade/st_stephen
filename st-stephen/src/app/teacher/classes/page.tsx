'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, LogOut } from "lucide-react";

type Class = {
  id: string;
  name: string;
  slug: string;
};

export default function TeacherClasses() {
  const [classes, setClasses] = useState<Class[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await fetch('/api/classes  ');
        const data = await response.json();
        setClasses(data.classes || []);
      } catch (error) {
        console.error('Error fetching classes:', error);
      }
    };

    fetchClasses();
  }, []);

  const handleLogout = () => {
    router.push('/');
  };

  const handleClassSelect = (slug: string) => {
    router.push(`/teacher/${slug}`);
  };

  return (
    <div className="flex flex-col p-4">
      <div className="flex justify-between items-center mb-8">
        <button onClick={() => router.back()}>
          <ArrowLeft size={25} />
        </button>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-red-600 hover:text-red-700"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <h2 className="text-3xl font-bold text-center mb-8">Select Class</h2>

      <div className="grid gap-4">
        {classes.map((class_) => (
          <button
            key={class_.id}
            onClick={() => handleClassSelect(class_.slug)}
            className="w-full bg-white text-black border border-gray-200 rounded-lg p-4 text-left shadow-sm hover:bg-gray-50"
          >
            {class_.name}
          </button>
        ))}
      </div>
    </div>
  );
} 