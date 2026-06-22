import react from "react";
import Sidebar from "./Sidebar";
import ChatWindow from "./ChatWindow";
import { useAuth } from "../../mycontext";

export default function Home(){
    const {
  sidebarmain,
  sidebarOpen,
  setSidebarOpen,
} = useAuth();

    return(
        <>
            <div className="h-screen bg-[#212121] text-white flex overflow-hidden">
        {/* Desktop Sidebar */}
              {sidebarmain && (
              <div className="hidden md:block">
                <Sidebar />
               </div>
            )}    
        
              {/* Mobile Sidebar */}
              {sidebarOpen && (
                <>
                  <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                  />
        
                  <div className="fixed left-0 top-0 z-50 md:hidden">
                    <Sidebar
                      mobile
                      closeSidebar={() => setSidebarOpen(false)}
                    />
                  </div>
                </>
              )}
        
              {/* Chat Area */}
             <main className="flex-1 overflow-hidden">
          <ChatWindow
            
          />
        </main>

        </div>
        </>
    )
}