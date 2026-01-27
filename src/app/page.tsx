"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();

  const handleGetStarted = function(){
    router.push('/signup');
  }
  const handleLogin = function(){
    router.push('/login');
  }
  return (
  <div className="min-h-screen w-screen p-2">
    <div className="w-full h-full rounded-sm border border-gray-400 flex flex-col items-center text-center px-4 py-6 sm:px-8 sm:py-10">

      {/* Heading */}
      <h1 className="font-bold text-gray-700 tracking-tighter text-3xl sm:text-5xl lg:text-7xl mt-6 sm:mt-12">
        Welcome to the Goal Tracking Productivity App
      </h1>

      {/* Image */}
      <div className="mt-6 sm:mt-10">
        <Image
          src="/home.png"
          alt="Home illustration"
          width={400}
          height={600}
          className="w-64 sm:w-80 lg:w-[400px] h-auto"
        />
      </div>

      {/* Buttons */}
      <div className="flex gap-4 sm:gap-10 mt-6 sm:mt-10">
        <button className="cursor-pointer bg-purple-800 rounded font-semibold text-white px-4 py-2 text-lg sm:px-6 sm:py-3 sm:text-2xl hover:bg-purple-700"
          onClick={handleGetStarted}
        >
          Get Started
        </button>

        <button
          className="cursor-pointer bg-purple-800 rounded font-semibold text-white 
                     px-4 py-2 text-lg 
                     sm:px-6 sm:py-3 sm:text-2xl 
                     hover:bg-purple-700"
          onClick={handleLogin}
        >
          Login
        </button>

      </div>
    </div>
  </div>
);

}
