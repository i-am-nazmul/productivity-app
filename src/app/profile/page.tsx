"use client"
import React, { useCallback, useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useIsLoading } from "@/store/store";
import Loader from "@/components/Loader";


export default function ProfilePage(){
      const [user,setUser] = React.useState('');
      const [email,setEmail] = React.useState('');
      const {isLoading,setIsLoading}=useIsLoading();
      const router = useRouter();

      const moveToDashboard = function (){
            router.push('/dashboard');
      }

      const logout = async function () {
            await axios.post('/api/logout');
            router.push('/login');
      }

      const getUserData = useCallback(async function (){
            setIsLoading(true);
            try {
                  const userData = await axios.get('/api/profile');
                  setUser(userData.data.username);
                  setEmail(userData.data.email);
            } catch (error) {
                  console.log(error);
            }
            setIsLoading(false);

            },[setIsLoading])

      useEffect(()=>{

            getUserData();
      },[getUserData])



      return (
//outermost div
<div className="min-h-screen w-screen p-1">
      {/* this div conatains all the elements */}
      {isLoading ? <Loader message={"Fetching your details"}/>:<div className="flex h-full min-h-[calc(100vh-0.5rem)] w-full flex-col rounded-sm border border-gray-400 px-2 py-2 sm:px-4 sm:py-4">

            
            {/* this block contains the header */}
            <div className="flex justify-between ">
                  <h1 className="text-4xl font-bold tracking-tight text-gray-700 sm:text-5xl lg:text-7xl">Profile</h1>

                  <div className=" flex gap-2 items-center">
                        
                        <button className="bg-emerald-900 text-white rounded-lg cursor-pointer px-2 py-1 text-2xl sm:text-6xl 
                        sm:py-2 
                        sm:rounded-sm active:bg-emerald-800"
                        onClick={moveToDashboard}
                        >Dashboard</button>                                   
                  </div>
            </div>
            

            <div className="w-full h-full flex flex-row items-center gap-4 mt-4">


                  <div className="bg-white w-full h-full border border-gray-200 rounded-xl flex flex-col items-center
                  sm:max-w-fit
                  sm:p-2">
                        <ul className="font-mono tracking-tight px-4 mt-2 bg-amber-200 w-max rounded-xl">
                              <li className="w-full text-start px-4 py-2 rounded-xs font-semibold text-gray-700 text-2xl tracking-tighter">{user}</li>
                              <li className="w-full text-start px-4 py-2 rounded-xs font-semibold text-gray-700 text-2xl tracking-tighter">{email}</li>
                        </ul>
                        <button className="bg-emerald-800 px-4 py-1 text-white font-mono tracking-tighter text-2xl mt-4 mb-4 sm:cursor-pointer hover:bg-emerald-900 rounded-lg"
                  onClick={logout}>Logout</button>
                  </div>



                  {/* <div className="bg-white w-1/5 h-full flex justify-center items-center rounded-sm">
                        <Image src="/working.png"
                        width={200}
                        height={200}
                        alt="work"
                        />
                  </div> */}

            </div>
      </div>}
</div>
            
      )
}


