import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login"
import FormOne from "../../src/app/component/form-1"
import Maths from "./pages/class-hw/subjects/maths";
import Physics from "./pages/class-hw/subjects/physics";
import Biology from "./pages/class-hw/subjects/biology";
import Chemistry from "./pages/class-hw/subjects/chemistry";
import Csc from "./pages/class-hw/subjects/csc";
import Geography from "./pages/class-hw/subjects/geography";
import English from "./pages/class-hw/subjects/english";
import Litterature from "./pages/class-hw/subjects/litterature";
import History from "./pages/class-hw/subjects/history";
function App(){
  return(
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/form-1" element={<FormOne />} />
          <Route path="/form-1/maths" element={<Maths />} />
          <Route path="/form-1/physics" element={<Physics />} />
          <Route path="/form-1/Biology" element={<Biology />} />
          <Route path="/form-1/Chemistry" element={<Chemistry />} />
          <Route path="/form-1/Csc" element={<Csc />} />
          <Route path="/form-1/Geography" element={<Geography />} />
          <Route path="/form-1/English" element={<English />} />
          <Route path="/form-1/Litterature" element={<Litterature />} />
          <Route path="/form-1/History" element={<History />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App