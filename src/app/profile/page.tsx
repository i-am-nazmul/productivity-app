"use client"
import React, { useEffect } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function ProfilePage(){

      const [user,setUser] = React.useState('');
      const [email,setEmail] = React.useState('');
      const router = useRouter();


      const getUserData = async function (){
            const userData = await axios.get('/api/profile');
            setUser(userData.data.username);
            setEmail(userData.data.email);

      }

      const moveToDashboard = function (){
            router.push('/dashboard');
      }

      useEffect(()=>{
            getUserData();
      },[])



      return (
            //outermost div
            <div className="h-screen w-screen p-1">
                  {/* this div conatains all the elements */}
                  <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2">

                        
                        
                        <div className="flex justify-between ">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">Profile</h1>

                              <div className=" flex gap-2 items-center">
                                    
                                    <button className="bg-emerald-900 text-white rounded-sm cursor-pointer px-4 py-2 text-2xl active:bg-emerald-800"
                                    onClick={moveToDashboard}
                                    >Dashboard</button>                                   
                              </div>
                        </div>
                        

                        <div className="w-full h-full flex flex-row items-center gap-4 mt-4">


                              <div className="bg-white w-2/5 h-full border border-gray-200 rounded-sm ">
                                    <ul className="font-mono tracking-tight px-4 bg-amber-200 w-max">
                                          <li className="cursor-pointer w-full text-start px-6 py-2 rounded-xs font-semibold text-gray-700 text-2xl tracking-tighter">{user}</li>
                                          <li className="cursor-pointer w-full text-start px-6 py-2 rounded-xs font-semibold text-gray-700 text-2xl tracking-tighter">{email}</li>
                                    </ul>
                              </div>



                              <div className="bg-white w-1/5 h-full flex justify-center items-center rounded-sm">
                                    <Image src="/working.png"
                                    width={200}
                                    height={200}
                                    alt="work"
                                    />
                              </div>

                              <div className="bg-white w-2/5 h-full border border-gray-200 rounded-sm">
                                    
                              </div>


                        </div>
                  </div>
            </div>
            
      )
}