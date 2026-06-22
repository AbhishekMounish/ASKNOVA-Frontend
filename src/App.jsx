import { useState } from "react";
import Sidebar from "./components/Sidebar";
import ChatWindow from "./components/ChatWindow";
import { Mycontext } from "../mycontext";
import {v1 as uuidv1} from "uuid"
import { BrowserRouter as Router, Routes, Route,Navigate } from "react-router-dom";
import Home from "./components/home.jsx";
import SignUp from "./components/signup.jsx";
import SignIn from "./components/signin.jsx";
import LandingPage from "./components/landing.jsx";
import { useEffect } from "react";


function App() {

  const [userPresent , setUserPresent]= useState(null);

const [sidebarOpen, setSidebarOpen] = useState(false);
const [sidebarmain, setSidebarMain] = useState(false);
const [prompt,setPrompt]=useState("");
const [reply,setReply]=useState(null);
const [currThreadId,setCurrThreadId]=useState(uuidv1());
const [loader,setLoader]=useState(false);
const [prevchats, setPrevchats]=useState([]); //allprev chats of thread
const [newchat,setNewchat]=useState(true)
const [allThreads, setAllThreads]=useState([]);


   const providerValues ={
    sidebarOpen,
    setSidebarOpen,
    prompt,setPrompt,
    reply,setReply,
    currThreadId,setCurrThreadId,
    loader,setLoader,
    newchat,setNewchat,
    prevchats, setPrevchats,
    allThreads, setAllThreads,
    sidebarmain, setSidebarMain,
    userPresent , setUserPresent

   };

   useEffect(()=>{
      const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");
  const name = localStorage.getItem("name");

  if (token && userId) {
    setUserPresent({ userId,
      name,
     });
  }

   },[])

  return (
     <Mycontext.Provider value={providerValues}>
      <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/signup" element={<SignUp/>} />
             <Route path="/signin" element={<SignIn/>} />
             <Route path="/chat" element={<Home/>}/>

        </Routes>
    </Mycontext.Provider>
  );
}

export default App;