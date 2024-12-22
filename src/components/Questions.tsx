import { ArrowLeft } from "lucide-react";

function handleClick() {
  window.history.back();
}
function Questions(){
    return(
        <>
        <div className="flex flex-col p-3">
        <button onClick={handleClick}>
          <ArrowLeft size={25} />
        </button>
        <h2 className="text-3xl font-bold text-violet pt-10 pb-7">
          Workout the volume of the L-shaped prism:
        </h2>
        <div className="flex flex-col items-center justify-center gap-1">
          <img
            src="../src/assets/img/sample.png"
            alt="Question illustration"
            className="w-3/4 mb-3"
          />
          <div className="flex mx-5 px-3 rounded-lg bg-gray-100 justify-between w-full py-2">
            <p className="bg-blue-700 text-white font-medium text-sm px-2 rounded-md">A</p>
            <p> 696 cm</p>
            <input type="radio" name="anwerA" id="A" className="rounded-full "/>        
          </div>
          <div className="flex mx-5 px-3 rounded-lg bg-gray-100 justify-between w-full py-2">
            <p className="bg-red-500 text-white font-medium text-sm px-2 rounded-md">B</p>
            <p> 696 cm</p>
            <input type="radio" name="anwerA" id="A" className="rounded-full "/>        
          </div>
          <div className="flex mx-5 px-3 rounded-lg bg-gray-100 justify-between w-full py-2">
            <p className="bg-green-500 text-white font-medium text-sm px-2 rounded-md">C</p>
            <p> 696 cm</p>
            <input type="radio" name="anwerA" id="A" className="rounded-full "/>        
          </div>
          <div className="flex mx-5 px-3 rounded-lg bg-gray-100 justify-between w-full py-2">
            <p className="bg-yellow-500 text-white font-medium text-sm px-2 rounded-md">D</p>
            <p> 696 cm</p>
            <input type="radio" name="anwerA" id="A" className="rounded-full "/>        
          </div>
        </div>
      </div>
        </>
    )
}

export default Questions