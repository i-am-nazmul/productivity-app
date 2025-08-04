"use client"
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";



export default function LoginPage(){
      const router = useRouter();
      const [email,setEmail]=React.useState('');
      const [password,setPassword]=React.useState('');

      const Login = async () => {
            try {
            const request = await axios.post('/api/login', {
                  email,
                  password
            });
            if (request.status === 200) {
                  router.push("/dashboard");
      }
      
            } catch (error: any) {
                  console.error("Login error");
            }
      };



      return(
            <div className="h-screen w-screen p-1">
                  <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2 items-center">
                        <div className="w-full">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">
                                    Login
                              </h1>
                        </div>
                        <div className="flex flex-col gap-2 font-mono justify-center items-center w-full h-full tracking-tighter">

                              

                              <input type="text" placeholder="Enter the email" className="outline-none text-2xl px-4 py-2 bg-amber-200 rounded-xs text-black border border-gray-400"
                              onChange={(e)=>{setEmail(e.target.value)}}/>


                              <input type="text" 
                              placeholder="Enter the password" className="outline-none text-2xl px-4 py-2 bg-amber-200 rounded-xs text-black border border-gray-400"
                              onChange={(e)=>{setPassword(e.target.value)}}/>

                              <button className="bg-emerald-800 px-4 py-1 text-white text-4xl cursor-pointer hover:bg-emerald-900"
                              onClick={Login}>Signup</button>
                        </div>
                  </div>
            </div>
      )

}