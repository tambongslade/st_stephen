'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

export default function Home() {
  const [selectedClass, setSelectedClass] = useState('');
  const [name, setName] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedClass && name) {
      router.push(`/${selectedClass}?name=${encodeURIComponent(name)}`);
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleTeacherLogin = () => {
    router.push('/teacher');
  };

  return (
    <div className="h-screen bg-background bg-cover justify-center items-center flex">
      <motion.div
        initial={{ opacity: 0, y: 200 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        className="bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 shadow-xl border-gray-100"
      >
        <div className="flex flex-col">
          <img
            src="/assets/img/logo.png"
            alt="Logo of St Stephen International"
            className="w-3/6 mx-auto pt-12"
          />
          <h2 className="text-2xl font-bold text-center text-white pt-5">
            Connection
          </h2>
          <div className="flex flex-col p-5 justify-center items-center">
            <form onSubmit={handleSubmit} className="flex flex-col border p-3 rounded-xl">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="px-2 rounded-xl bg-transparent placeholder:text-black focus:outline-none text-white"
                required
              />
              <hr className="w-full" />
              <select
                value={selectedClass}
                onChange={(e) => setSelectedClass(e.target.value)}
                className="px-2 rounded-xl bg-transparent placeholder:text-white pt-1 focus:outline-none placeholder-shown:text-white"
                required
              >
                <option value="">Select your class</option>
                <option value="form-1">Form 1</option>
                <option value="form-2">Form 2</option>
                <option value="form-3">Form 3</option>
                <option value="form-4-sc">Form 4 SC</option>
                <option value="form-4-art">Form 4 Art</option>
                <option value="form-5-art">Form 5 Art</option>
                <option value="form-5-sc">Form 5 SC</option>
                <option value="lss">LSS</option>
                <option value="lsa">LSA</option>
                <option value="uss">USS</option>
                <option value="usa">USA</option>
              </select>
            </form>
            <button 
              onClick={handleSubmit}
              className="py-3 text-white text-xl rounded-lg px-10 m-5 bg-blue-500 hover:bg-blue-600"
            >
              Start
            </button>
            <div className="mt-4 text-center">
              <button 
                onClick={handleTeacherLogin}
                className="text-white hover:underline"
              >
                Teacher Login
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}