import { Avatar, Menu } from "@mantine/core";
import { useAuth } from "../../mycontext";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";
import {
  IconMenu2,
  IconSettings,
  IconLogout,
  IconCrown,
  IconChevronDown,
  IconUserFilled,
} from "@tabler/icons-react";

export default function Navbar() {
  let name = localStorage.getItem("name");

  const navigate = useNavigate();
     const {setSidebarOpen,sidebarOpen,sidebarmain, setSidebarMain,setUserPresent, userPresent} = useAuth();

     const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("name");
     setUserPresent(null);
       notifications.show({
     title: "Logged Out",
     message: "See you soon ",
     color: "blue",
   });

    navigate("/");
  };

  const handleDelete= async ()=>{
    const token= localStorage.getItem("token");

    try{
      const response = await fetch("https://asknova-094n.onrender.com/api/user/delete",{
        method:"DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const res = await response.json();
      if(!response.ok){
          notifications.show({
        title: "Error",
        message: res.message,
        color: "red",
      });
      return;
      }

      localStorage.removeItem("token");
      localStorage.removeItem("userId");
      localStorage.removeItem("name");
      setUserPresent(null);

      notifications.show({
      title: "Account Deleted",
      message: "Your account has been deleted",
      color: "green",
    });

    navigate("/");




    }catch(e){
      console.log(e);

    }

  }



  return (
    <header className="h-14 border-b border-[#2f2f2f] flex items-center justify-between px-4">

      {/* Left */}
      <div className="flex items-center gap-2">

   {(!sidebarmain || sidebarOpen) && (
  <button
    className="p-2 rounded-lg hover:bg-[#2a2a2a]"
    onClick={() => {
      setSidebarMain(true);
      setSidebarOpen(true);
    }}
  >
    <IconMenu2 size={22} />
  </button>
)}

        <button className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-[#2a2a2a]">
          <span className="font-medium">
            AskNova
          </span>

          <IconChevronDown size={16} />
        </button>

      </div>

      {/* Right */}
   {userPresent ? (
  <Menu shadow="md" width={220}>
    <Menu.Target>
      <Avatar
        radius="xl"
        color="violet"
        className="cursor-pointer"
      >
        {userPresent?.name?.charAt(0).toUpperCase() || "U"}
      </Avatar>
    </Menu.Target>

      <Menu.Dropdown bg="#171717">
            <Menu.Label>
              <div className="flex items-center gap-2">
              <IconUserFilled size={18} />
             <span>@ {userPresent?.name.toUpperCase() }</span>
           </div>
            </Menu.Label>

            <Menu.Divider />

            <Menu.Item
       color="red"
       onClick={handleDelete}
      >
      Delete Account
    </Menu.Item>


      <Menu.Divider />
      

      <Menu.Item
        onClick={handleLogout}
        color="red"
        leftSection={<IconLogout size={16} />}
      >
        Sign Out
      </Menu.Item>
    </Menu.Dropdown>
  </Menu>
) : (
  <div className="flex gap-2">
    <button
      onClick={() => navigate("/signin")}
      className="px-3 py-1.5 text-sm rounded-lg border border-[#3a3a3a] hover:bg-[#2a2a2a]"
    >
      Sign In
    </button>

    <button
      onClick={() => navigate("/signup")}
      className="px-3 py-1.5 text-sm rounded-lg bg-violet-600 hover:bg-violet-700"
    >
      Sign Up
    </button>
  </div>
)}

    </header>
  );
}