import { connect } from '@/dbconfig/dbconfig';
import Users from '@/models/users.models';
import { NextResponse,NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from "bcrypt"


export async function POST(request:NextRequest) {

  await connect();

  try {    
    const requestBody = await request.json();
    const {email,password} = requestBody;

    const existingUser = await Users.findOne({email : email});

    if(!existingUser){
      console.error("No such user exists");
      return NextResponse.json({message : "Failed to login."},{status : 401})
    }
    const isPasswordMatched = await bcrypt.compare(password,existingUser.password);
    
    if(!isPasswordMatched){
      console.error("Invalid password");
      return NextResponse.json({message : "Failed to login."},{status : 401})
    }

    const token = jwt.sign(
      {
        id : existingUser._id
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn : '1d'
      }
    )


    const response = NextResponse.json({
      message : "Logged in successfully!!"
    },{status : 200});
    response.cookies.set("token",token,{
      httpOnly : true,
      secure : true ,
      maxAge : 60*60*24,
      path : "/"
    });
    return response;


  } catch (error: unknown) {
    console.error("Error while fetching the goal data", error);

    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ message: "Invalid token" }, { status: 401 });
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Failed to fetch the goal data." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
