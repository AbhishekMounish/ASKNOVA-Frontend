import { useAuth } from "../../mycontext";
import { useEffect } from "react";
import { notifications } from "@mantine/notifications";
import {
  IconArrowUp,
  IconPaperclip,
} from "@tabler/icons-react";

export default function PromptBox() {

  const {prompt,setPrompt,
    reply,setReply,
    currThreadId,
    loader,setLoader,
    prevchats, setPrevchats,
    setNewchat
  }=useAuth();

  const getReply =async ()=>{
    const token = localStorage.getItem("token");
    if (!prompt.trim()) return;
    setNewchat(false); 
    setLoader(true);
      const options ={
         method: "POST",
         headers:{
             'Content-Type': "application/json",

              ...(token && {
      Authorization: `Bearer ${token}`, // ✅ Added
    }),

         },
         body: JSON.stringify({
          
          messages:prompt,
          threadId:currThreadId

         
        })

     }

     

     try{
      let resp = await fetch("https://asknova-094n.onrender.com/api/chats",options);
      const res = await resp.json(); 
      console.log(res.reply);

       if (res.reply.includes("quota exceeded")) {
         notifications.show({
           title: "Quota Exceeded",
           message: res.reply,
           color: "red",
         });
       } 
       if (res.reply.includes("busy")) {
       notifications.show({
         title: "Server Busy",
         message: res.reply,
         color: "yellow",
       });
      }      
     
      setReply(res.reply);
setPrevchats(res.messages.slice(0, -1));
setPrompt("");
      

     }catch(e){
      console.log(e);

     notifications.show({
       title: "Network Error",
       message: "Unable to connect to server.",
       color: "red",
     });

      setReply("Unable to connect to server.");
}   
finally{
      setLoader(false);
     }

  }

  


    

  return (
    <div className="border-t border-[#2f2f2f] p-4">

      <div className="max-w-4xl mx-auto">

        <div className="bg-[#2f2f2f] rounded-3xl p-3">

          <textarea
          value={prompt}
          onChange={(e)=>{
            setPrompt(e.target.value)
          }}        
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault(); // newline prevent
              getReply();
            }
          }}

            rows={1}
            placeholder="Ask anything..."
            className="
              w-full
              bg-transparent
              resize-none
              outline-none
              text-white
            "
          />

          <div className="flex items-center justify-between mt-3">

            <button className="p-2 rounded-lg hover:bg-[#3a3a3a]">
              <IconPaperclip size={18} />
            </button>

            <button 
            onClick={getReply}
              className="
                h-9
                w-9
                rounded-full
                bg-white
                text-black
                flex
                items-center
                justify-center
              "
            >
              <IconArrowUp size={18} />
            </button>

          </div>

        </div>

        <p className="text-center text-xs text-zinc-500 mt-2">
          AskNova can make mistakes. Verify important information.
        </p>

      </div>

    </div>
  );
}