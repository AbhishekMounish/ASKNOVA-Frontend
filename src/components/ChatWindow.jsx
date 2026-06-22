import Navbar from "./Navbar";
import PromptBox from "./PromptBox";
import { useAuth } from "../../mycontext";
import { Loader } from "@mantine/core";
import RenderChat from "./renderchat";



export default function ChatWindow() {
  const { loader } = useAuth();

  return (
    <div className="h-full flex flex-col bg-[#212121] text-white">

      {/* Navbar */}
      <Navbar />

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto">
        
        
        {/* Chats yaha render honge */}
        <RenderChat />

        {loader && (
          <div className="flex justify-center py-4">
            <Loader
              type="dots"
              color="violet"
              size="md"
            />
          </div>
        )}

      </div>

      {/* Prompt Box hamesha bottom pe */}
      <PromptBox />

    </div>
  );
}