import { ArrowLeft } from "lucide-react"
import Subjects from "../components/subjects"
function handleClick(){
    window.history.back()
}
function FormOne(){
    return(
        <>
            <div className="flex flex-col p-3">
                <button onClick={handleClick}><ArrowLeft size={25} /></button>
                <h2 className="text-3xl mt-5 font-bold">Choose a <br />subject</h2>
                <div className="flex flex-wrap justify-around ">
                    <Subjects img="./src/assets/icons/maths.png" title="Maths" route={"/form-1/maths"}/>
                    <Subjects img="./src/assets/icons/physics.png" title="Physics" route={"/form-1/physics"}/>
                    <Subjects img="./src/assets/icons/biology.png" title="Biology" route={"/form-1/biology"}/>
                    <Subjects img="./src/assets/icons/chemistry.png" title="Chemistry" route={"/form-1/Chemistry"}/>
                    <Subjects img="./src/assets/icons/csc.png" title="Computer Sc. " route={"/form-1/Csc"}/>
                    <Subjects img="./src/assets/icons/geography.png" title="Geography" route={"/form-1/geography"}/>
                    <Subjects img="./src/assets/icons/english.png" title="English" route={"/form-1/english"}/>
                    <Subjects img="./src/assets/icons/litterature.png" title="Litterature" route={"/form-1/litterature"}/>
                    <Subjects img="./src/assets/icons/history.png" title="History" route={"/form-1/history"}/>
                    
                </div>
            </div>
        </>
    )
}
export default FormOne