"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const imageSource= '/home.png';
  const handleGetStarted = function(){
    router.push('/signup');
  }
  const handleLogin = function(){
    router.push('/login');
  }
  return (
    <div className="h-screen w-screen p-1">
      <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col px-4 py-2  items-center tracking-tighter ">
        <h1 className="text-7xl font-bold text-gray-700 mt-16">Welcome to the Goal Tracking Productivity App</h1>
        <Image src={imageSource}
        alt=""
        height={600}
        width={400}/>
        <div className="flex gap-20">

          <button className="bg-purple-800 rounded font-semibold text-white p-4 text-4xl hover:bg-purple-700 cursor-pointer" onClick={handleGetStarted}>Get Started</button>
          <button className="bg-purple-800 rounded font-semibold text-white p-4 text-4xl hover:bg-purple-700 cursor-pointer" onClick={handleLogin}>Login</button>
          
          
        </div>
      </div>
                  
    </div>
  );
}
