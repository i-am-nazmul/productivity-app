"use client"
import React from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useIsLoading } from "@/store/store";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";



export default function SignupPage(){
      const [username,setUsername]=React.useState('');
      const [email,setEmail]=React.useState('');
      const [password,setPassword]=React.useState('');
      const {isLoading,setIsLoading}=useIsLoading();
      const router = useRouter();

      const Signup = async () => {
            if(!username || !email || !password){
                  toast.error("Please enter all the fields!");
                  return ;

            }
            setIsLoading(true);
            try {
            const request = await axios.post('/api/signup', {
                  username,
                  email,
                  password
            });
            if(request.status === 201){
                  router.push("/dashboard");
            }
      
            } catch (error) {
                  console.error("Signup error");
            }
                  
      };
      const Login = () =>{
            router.push('/login');
            
      }



      return(
            <div className="h-screen w-screen p-1">
                  {isLoading ? <Loader message={"Wait"}/>:<div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2 items-center">
                        <div className="w-full">
                              <h1 className="text-7xl font-bold text-gray-700 tracking-tighter">
                                    SignUp
                              </h1>
                        </div>
                        <div className="flex flex-col gap-2 font-mono justify-center items-center w-full h-full ">

                              <input type="text" 
                              placeholder="Enter the username" 
                              className="outline-none text-2xl px-4 py-2 bg-amber-200 rounded-sm text-black border border-gray-400 tracking-tighter"
                              onChange={(e)=>{setUsername(e.target.value)}} />

                              <input type="text" placeholder="Enter the email" className="outline-none text-2xl px-4 py-2 bg-amber-200 rounded-sm text-black border tracking-tighter border-gray-400"
                              onChange={(e)=>{setEmail(e.target.value)}}/>


                              <input type="password" 
                              placeholder="Enter the password" className="outline-none tracking-tighter text-2xl px-4 py-2 bg-amber-200 rounded-sm text-black border border-gray-400"
                              onChange={(e)=>{setPassword(e.target.value)}}/>

                              <button className="bg-emerald-800 px-4 py-1 text-white text-4xl tracking-tighter cursor-pointer hover:bg-emerald-900 rounded-sm"
                              onClick={Signup}>Signup</button>

                              <button className="bg-emerald-800 text-white px-4 font-sans py-1 mt-4 cursor-pointer hover:bg-emerald-900 rounded-xs " onClick={Login}>Already have an account ? Login Instead</button>
                        </div>
                  </div>}
            </div>
      )

}