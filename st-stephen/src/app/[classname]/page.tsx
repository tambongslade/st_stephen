'use client';

import { ArrowLeft, LogOut } from "lucide-react"
import Subjects from "@/app/component/subjects"
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from "react";

// Define types based on our Prisma schema
type Subject = {
  id: string;
  name: string;
  imageUrl: string;
}

export default function ClassPage() {
    const params = useParams();
    const router = useRouter();
    const searchParams = useSearchParams();
    const studentName = searchParams.get('name') || 'Guest';
    const [subjects, setSubjects] = useState<Subject[]>([]);

    useEffect(() => {
        const fetchSubjects = async () => {
            try {
                // Convert URL parameter to match our slug format
                const classSlug = params.classname as string;
                const response = await fetch(`/api/classes/${classSlug}/subjects`);
                const data = await response.json();
                setSubjects(data);
            } catch (error) {
                console.error('Error fetching subjects:', error);
            }
        };

        fetchSubjects();
    }, [params.classname]);

    const handleLogout = () => {
        router.push('/');
    }

    const getSubjectRoute = (subject: string) => {
        return `/${params.classname}/${subject.toLowerCase()}/assignments`;
    }

    return (
        <div className="flex flex-col p-4">
            <div className="flex flex-col items-end mb-4">
                <h3 className="text-lg font-medium mb-2">Welcome, {studentName}</h3>
                <button 
                    onClick={handleLogout} 
                    className="flex items-center gap-2 text-red-600 hover:text-red-700"
                >
                    <LogOut size={20} />
                    Logout
                </button>
            </div>
            <h2 className="text-3xl font-bold text-center mb-8">Choose a<br />subject</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-8">
                {subjects.map((subject) => (
                    <Subjects
                        key={subject.id}
                        img={subject.imageUrl}
                        title={subject.name}
                        route={getSubjectRoute(subject.name)}
                    />
                ))}
            </div>

            <button className="w-full bg-navy-blue text-white py-3 rounded-lg mt-auto">
                Discuss with help
            </button>
        </div>
    )
}