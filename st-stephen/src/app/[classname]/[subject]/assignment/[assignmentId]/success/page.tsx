'use client';

import { useRouter, useSearchParams, useParams } from 'next/navigation'

export default function SuccessPage() {
    const router = useRouter()
    const params = useParams()
    const searchParams = useSearchParams()
    const score = searchParams.get('score') || '0'
    const totalQuestions = 10 // Total number of questions

    return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-white text-black bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <div className="max-w-md w-full text-center bg-white rounded-lg p-8 shadow-sm">
                {/* Success illustration */}
                <div className="mb-8">
                    <img 
                        src="/assets/img/success.png" 
                        alt="Success" 
                        className="w-48 h-48 mx-auto"
                    />
                </div>

                {/* Score display */}
                <div className="mb-8">
                    <h1 className="text-4xl font-bold mb-2 text-black">{score}/{totalQuestions}</h1>
                    <p className="text-gray-600">Home work submitted successfully</p>
                </div>

                {/* Back to subjects button */}
                <button
                    onClick={() => router.push(`/${params.classname}`)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700"
                >
                    Go back to subjects
                </button>
            </div>
        </div>
    )
} 