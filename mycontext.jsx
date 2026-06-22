import { useContext } from "react";
import { createContext } from "react";

export const Mycontext = createContext();

export const useAuth =()=>{
    return useContext(Mycontext)
}