import { Link } from "react-router-dom"
interface SubjectsProps{
    img:String,
    title:String
    route?:String
}
function Subjects({img,title,route}:SubjectsProps){
    return(
        <>
        <Link to={route}>
        <div className="flex-col items-center flex mt-10">
            
            <div className="bg-violet rounded-full">
            <img src={img} alt="Maths icon" className="p-6 w-28" />
            </div>
            <h3 className="font-medium text-lg">{title}</h3>
           
        </div>
        </Link>
        </>
    )
}
export default Subjects