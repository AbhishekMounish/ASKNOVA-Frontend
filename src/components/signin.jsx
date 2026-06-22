import { Paper, TextInput, PasswordInput, Button, Title, Text } from "@mantine/core";
import { IconSparkle } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../mycontext";
import { notifications } from "@mantine/notifications";

export default function SignIn() {
    const [email,setEmail]= useState("")
    const [ password,setPassword]=useState("");
    const {
     userPresent,
     setUserPresent,   
     setPrompt,
     setReply,
     setPrevchats,
     setNewchat,
     setCurrThreadId,
       } = useAuth();
    const naviagte = useNavigate();

    const handleSignIn = async (e)=>{
        e.preventDefault();
        try{
            if(!email||!password){
        notifications.show({
        title: "Missing Fields",
        message: "Please fill all fields",
        color: "yellow",
      });
       return ;
     }
      const response= await fetch("https://asknova-094n.onrender.com/api/user/signin",{
        method: "POST",
          headers: {
          "Content-Type": "application/json",
        },
        body:JSON.stringify({
            email,
            password,
        }),

      })

      const res = await response.json();
      if (!response.ok) {
      notifications.show({
        title: "Login Failed",
        message: res.message,
        color: "red",
      });
      return;
    }

    localStorage.setItem("token",res.token);
    localStorage.setItem("userId",res.userId);
    localStorage.setItem("name", res.name);
    setUserPresent({
        userId:res.userId,
        name : res.name
    })

setPrompt("");
setReply(null);
setPrevchats([]);
setNewchat(true);
setCurrThreadId(uuidv1());

    notifications.show({
      title: "Welcome Back !",
      message: "Login successful",
      color: "green",
    });
     navigate("/chat");


        }catch(e){
     console.log(e);

      notifications.show({
      title: "Server Error",
      message: "Something went wrong",
      color: "red",
    });
            
        }

    }


  return (
    <div className="min-h-screen bg-[#212121] flex items-center justify-center px-4">

      <Paper
        bg="#171717"
        radius="lg"
        p="xl"
        className="w-full max-w-md border border-[#2f2f2f]"
      >

        {/* Logo */}
        <div className="flex justify-center mb-4">
          <IconSparkle
            size={42}
            className="text-violet-500"
          />
        </div>

        {/* Heading */}
        <Title
          order={2}
          ta="center"
          c="white"
          mb="xs"
        >
          Welcome Back
        </Title>

        <Text
          c="dimmed"
          size="sm"
          ta="center"
          mb="xl"
        >
          Sign in to continue using AskNova
        </Text>

        {/* Form */}
        <form className="space-y-4"
        onSubmit={handleSignIn}
        >

          <TextInput
          name="email"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
            label="Email"
            placeholder="Enter your email"
            type="email"
            size="md"
          />

          <PasswordInput
          name="password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
            label="Password"
            placeholder="Enter your password"
            size="md"
          />

          <Button
          type="submit"
            fullWidth
            color="violet"
            size="md"
            mt="md"
          >
            Sign In
          </Button>

        </form>

        {/* Footer */}
        <Text
          ta="center"
          size="sm"
          mt="lg"
          c="dimmed"
        >
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-violet-400 hover:underline"
          >
            Sign Up
          </Link>
        </Text>

      </Paper>

    </div>
  );
}