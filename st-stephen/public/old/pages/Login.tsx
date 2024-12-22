import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';


function Login() {
  const [selectedClass, setSelectedClass] = useState<string>('');

  const navigate = useNavigate();

  const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedClass(event.target.value);
  };

  const handleStartClick = (): void => {
    if (selectedClass) {
      navigate(`/${selectedClass.replace(/ /g, '-').toLowerCase()}`); //Pour ouvrir la page en fonction de la classe
    } else {
      alert("Please select your class first.");
    }
  };

  return (
    <>
      <div className="h-screen bg-background bg-cover justify-center items-center flex">
        <motion.div
          initial={{ opacity: 0, y: 200 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeInOut" }}
          className="bg-gray-400 rounded-3xl bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-5 shadow-xl border-gray-100"
        >
          <div className="flex flex-col">
            <img
              src="./src/assets/img/logo.png"
              alt="Logo of St Stephen International"
              className="w-3/6 mx-auto pt-12"
            />
            <h2 className="text-2xl font-bold text-center text-white pt-5">
              Connection
            </h2>
            <div className="flex flex-col p-5 justify-center items-center">
              <form className="flex flex-col border p-3 rounded-xl">
                <input
                  type="text"
                  placeholder="Name"
                  className="px-2 rounded-xl bg-transparent placeholder:text-black focus:outline-none text-white"
                  required
                />
                <hr className="w-full" />
                <select
                  name="Classes"
                  id="Class"
                  className="px-2 rounded-xl bg-transparent placeholder:text-white pt-1 focus:outline-none placeholder-shown:text-white"
                  value={selectedClass}
                  onChange={handleClassChange}
                >
                  <option value="">Select your class</option>
                  <option value="Form 1">Form 1</option>
                  <option value="Form 2">Form 2</option>
                  <option value="Form 3">Form 3</option>
                  <option value="Form 4 SC">Form 4 SC</option>
                  <option value="Form 4 Art">Form 4 Art</option>
                  <option value="Form 5 Art">Form 5 Art</option>
                  <option value="Form 5 SC">Form 5 SC</option>
                  <option value="LSS">LSS</option>
                  <option value="LSA">LSA</option>
                  <option value="USS">USS</option>
                  <option value="USA">USA</option>
                </select>
              </form>
              <button 
                className="py-3 text-white text-xl rounded-lg px-10 m-5"
                onClick={handleStartClick}
              >
                Start
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
};

export default Login;
