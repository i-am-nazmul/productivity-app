"use client"
import React, { useEffect } from "react";
import axios, { isAxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useIsLoading } from "@/store/store";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { totalmem } from "os";



export default function LoginPage(){
      const router = useRouter();
      const [email,setEmail]=React.useState('');
      const [password,setPassword]=React.useState('');
      const {isLoading,setIsLoading}=useIsLoading();

      const Login = async () => {
            if(!email || !password){
                  toast.error("Please enter valid credentials!");

                  return;

            }
            try {
                  setIsLoading(true);
            const request = await axios.post('/api/login', {
                  email,
                  password
            });
            if (request.status === 200) {
                  router.push("/dashboard");
                  return;
                  
            }
      
            } catch (error: any) {
                  if(axios.isAxiosError(error) && error.response?.status===401){
                        toast.error("Invalid credentials!");
                        setIsLoading(false);
                        
                  }
                  console.error("Login error");
            }
      };

      const SignUp = () =>{
            router.push("/signup");
      }


      return(
            <div className="h-screen w-screen p-1">
                  <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2 items-center">
                        <div className="w-full">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">
                                    Login
                              </h1>
                        </div>
                        {isLoading ?<Loader message={"Wait"}/>:<div className="flex flex-col gap-2 font-mono justify-center items-center w-full h-full ">

                              

                              <input type="text" placeholder="Enter the email" className="tracking-tighter outline-none text-2xl px-4 py-2 bg-amber-200 rounded-sm text-black border border-gray-400"
                              onChange={(e)=>{setEmail(e.target.value)}}/>


                              <input type="text" 
                              placeholder="Enter the password" className="outline-none tracking-tighter text-2xl px-4 py-2 bg-amber-200 rounded-sm text-black border border-gray-400"
                              onChange={(e)=>{setPassword(e.target.value)}}/>

                              <button className="bg-emerald-800 px-4 py-1 text-white tracking-tighter text-4xl cursor-pointer hover:bg-emerald-900 rounded-sm"
                              onClick={Login}>Login</button>

                              <button className="bg-emerald-800 text-white px-3 py-1 mt-4 cursor-pointer hover:bg-emerald-900 rounded-xs font-sans " onClick={SignUp}>Signup Instead</button>
                        </div>}
                  </div>
            </div>
      )

}