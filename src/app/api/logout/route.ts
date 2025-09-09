import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest) {

      const token = request.cookies.get('token')?.value;
      if(!token){
            return NextResponse.json({message : 'Failed to logout.'},{
                  status : 400
            })
      }
  const response = NextResponse.json(
    { message: "Logged out successfully" },
    { status: 200 }
  );

  
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    expires: new Date(0), // expire immediately
    path: "/",
  });

  return response;
}
