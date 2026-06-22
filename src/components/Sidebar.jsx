import {
  IconEdit ,
  IconHeart,
  IconMessage,
  IconMessageCircle,
  IconMenu2,
  IconX,
  IconDots,
  IconSparkle,
  IconTrash,
  IconSearch 
  
} from "@tabler/icons-react";
import { useAuth } from "../../mycontext";
import { useEffect } from "react";
import { v1 as uuidv1 } from "uuid";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import { useState } from "react";



export default function Sidebar({mobile = false,closeSidebar,}){

  const [search, setSearch] = useState("");

 const {allThreads, setAllThreads,
  currThreadId,newchat,
  setNewchat,prompt,setPrompt,
    reply,setReply,
    setCurrThreadId,
    prevchats, setPrevchats,
     setSidebarMain,
  } = useAuth();

 const getAllThreads= async ()=>{
  const token = localStorage.getItem("token");
  if (!token) {
  setAllThreads([]);
  return;
}
   try{

    const response= await fetch("https://asknova-094n.onrender.com/api/thread",{
       headers: {
      Authorization: `Bearer ${token}`,
    }
    });

    const res =  await response.json();
    const filteredData=  res.map(thread=>({threadId:thread.threadId,title:thread.title}))
    setAllThreads(filteredData)
   // console.log(filteredData);




  }catch(e){
    console.log(e);
  }
 }

 useEffect(()=>{
  getAllThreads();
 
  
 },[currThreadId])

 const createNewChat = ()=>{
  setSearch("")
  setNewchat(true);
  setPrompt("");
  setReply(null);
  setCurrThreadId(uuidv1());
  setPrevchats([]);


  
 }

 const changeThread = async(newthreadId)=>{
  setSearch("")
  setCurrThreadId(newthreadId);
  try{
      const response= await fetch(`https://asknova-094n.onrender.com/api/thread/${newthreadId}`);
      const res = await response.json();
      console.log(res);
      setPrevchats(res);
      setNewchat(false);
      setReply(null);

  }catch(e){
    console.log(e);
  }


 }
 const DeleteThread=async (deleteId)=>{
  try{
     const response= await fetch(`https://asknova-094n.onrender.com/api/thread/${deleteId}`,{method: "DELETE"});
     const res = await  response.json()
     console.log(res);

     //updated thread rerender

     setAllThreads(prev=>prev.filter(thread=>thread.threadId!=deleteId));
     if(deleteId==currThreadId){
      createNewChat();
     }

  }catch(e){
    console.log(e);

  }
 }

  const filteredThreads = allThreads?.filter((thread) =>
    thread.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <aside className="w-55 h-screen bg-[#171717] border-r border-[#2f2f2f] flex flex-col">

      {/* Header */}
      <div className="h-14 px-3 flex items-center justify-between">

        <button onClick={createNewChat} className="p-2 rounded-lg hover:bg-[#2a2a2a]">
          <IconSparkle size={25} className="text-violet-500" />
        </button>

        <button
        onClick={() => {
          if(mobile){
            closeSidebar();
          }
          setSidebarMain(false)}}
        className="p-2 rounded-lg hover:bg-[#2a2a2a]"
        >
       <IconX size={20} />
       </button>

      </div>

      {/* New Chat */}
      <div className="px-2">

        <button
        onClick={createNewChat}
          className="
            w-full
            flex
            items-center
            gap-3
            p-3
            rounded-xl
            hover:bg-[#2a2a2a]
            transition
          "
        >
          <IconEdit size={22} />
          <span>New chat</span>
        </button>

      </div>

      {/* Search */}
      <div className="px-2 mt-2">
        <div className="relative">
      <IconSearch
      size={18}
      className="
      
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-zinc-400
      "
    />
        

        <input
      type="text"
       placeholder="Search chats..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
        className="
         w-full
         bg-[#2a2a2a]
         text-white
         rounded-lg
         pl-10
         px-3
         py-2
         outline-none
         mb-1
       "
    />
      {search && (
    <button
      onClick={() => setSearch("")}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
    >
      <IconX size={16} />
    </button>
   )}

      </div>
      </div>

      {/* Chats */}
      <div className="flex-1 overflow-y-auto mt-4 px-2">

        <p className="text-xs text-zinc-500 px-3 mb-2">
          Recent
        </p>

       {filteredThreads?.map((thread, idx) => (
          <div

          key={idx}
          className={`}
            group
            flex
            items-center
            justify-between
            p-2
            rounded-xl
            hover:bg-[#2a2a2a]
            cursor-pointer
            mb-1
            ${
          currThreadId === thread.threadId
           ? "bg-[#2a2a2a]"
            : "hover:bg-[#2a2a2a]"
            }
          `}
        >
          {/* Left Side */}
          <div 
          onClick={() => changeThread(thread.threadId)}
          className="flex items-center gap-2 min-w-0">

            <IconMessageCircle
              size={18}
              className="flex-shrink-0"
            />

            <span className="truncate text-sm">
              {thread.title.length > 15
            ? thread.title.slice(0, 15) + "..."
            : thread.title}
            </span>

          </div>

          {/* Right Side */}
          <button
          onClick={(e)=>{
            e.stopPropagation();//STOP EVENT BUBBLING
            DeleteThread(thread.threadId)}}
            className="
              opacity-0
              group-hover:opacity-100
              transition
              flex-shrink-0
            "
          >
            <IconTrash size={16} />
          </button>

        </div>
        ))}        

      </div>

      {/* footer */}
      <div className="border-t border-[#2f2f2f] p-1">

<div className="mt-2 mb-2 flex items-center justify-center gap-1 text-xs text-zinc-500">
  <span>Made by Monish</span>
</div>

         
      </div>

    </aside>
  );
}