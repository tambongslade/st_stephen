'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function TeacherLogin() {
  const [passcode, setPasscode] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === '123') {
      router.push('/teacher/dashboard');
    } else {
      setError('Invalid passcode');
    }
  };

  return (
    <div className="h-screen bg-background bg-cover justify-center items-center flex">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 shadow-xl border-gray-100"
      >
        <div className="flex flex-col p-8">
          <img
            src="/assets/img/logo.png"
            alt="Logo of St Stephen International"
            className="w-3/6 mx-auto mb-6"
          />
          <h2 className="text-2xl font-bold text-center text-white mb-6">
            Teacher Login
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="password"
              placeholder="Enter passcode"
              value={passcode}
              onChange={(e) => {
                setPasscode(e.target.value);
                setError('');
              }}
              className="px-4 py-2 rounded-xl bg-white/10 placeholder:text-white/70 text-white focus:outline-none"
              required
            />
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button 
              type="submit"
              className="py-3 text-white text-xl rounded-lg px-10 bg-blue-500 hover:bg-blue-600"
            >
              Login
            </button>
          </form>
        </div>
      </motion.div>
    </div>
  );
} 