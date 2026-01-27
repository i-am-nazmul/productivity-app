"use client"
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useIsLoading } from "@/store/store";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
 



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
      
            } catch (error) {
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


                              <input type="password" 
                              placeholder="Enter the password" className="outline-none tracking-tighter text-2xl px-4 py-2 bg-amber-200 rounded-sm text-black border border-gray-400"
                              onChange={(e)=>{setPassword(e.target.value)}}/>

                              <button className="bg-emerald-900 px-4 py-1 text-white font-semibold tracking-tighter text-2xl cursor-pointer hover:bg-emerald-950 rounded-lg sm:font-normal
                              sm:text-4xl
                              sm:py-2"
                              onClick={Login}>Login</button>

                              <button className="bg-emerald-900 text-white px-3 py-1 mt-2 cursor-pointer 
                              font-medium hover:bg-emerald-950 rounded-lg 
                              sm:py-2 sm:font-medium sm:text-2xl" onClick={SignUp}>Signup Instead</button>
                        </div>}
                  </div>
            </div>
      )

}