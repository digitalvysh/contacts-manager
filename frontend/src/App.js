import './App.css';
import { Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import TotalContacts from "./pages/TotalContacts.js";
import Upload from './components/Upload';

function App() {
  return (
    <>
      <Routes>
        <Route path = "/" element = {<Signin />} />
        <Route path = "/signup" element = {<Signup />} />
        <Route path = "/contact" element = {<TotalContacts />} />
        <Route path='/upload' element={<Upload/>}/>
      </Routes>
    </>
  );
}

export default App;
