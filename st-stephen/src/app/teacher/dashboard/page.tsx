'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import BarChartIcon from '@mui/icons-material/BarChart';
import AddIcon from '@mui/icons-material/Add';

export default function TeacherDashboard() {
  const router = useRouter();

  return (
    <div className="flex flex-col p-4 bg-white min-h-screen text-black">
      <div className="flex items-center mb-8">
        <button onClick={() => router.back()} className="text-black">
          <ArrowLeft size={25} />
        </button>
      </div>

      <h1 className="text-3xl font-bold mb-8 text-black">Welcome</h1>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={() => router.push('/teacher/view-results')}
          className="aspect-square bg-white text-black border-2 border-navy-blue rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
        >
          <BarChartIcon sx={{ fontSize: 32 }} />
          <span className="text-lg font-medium">View Results</span>
        </button>
        <button
          onClick={() => router.push('/teacher/add-homework')}
          className="aspect-square bg-white text-black border-2 border-navy-blue rounded-lg p-4 flex flex-col items-center justify-center gap-3 hover:shadow-md transition-all duration-200 ease-in-out hover:scale-[1.02] active:scale-[0.98]"
        >
          <AddIcon sx={{ fontSize: 32 }} />
          <span className="text-lg font-medium">Add Homework</span>
        </button>
      </div>
    </div>
  );
} 