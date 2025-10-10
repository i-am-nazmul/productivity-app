import { connect } from '@/dbconfig/dbconfig';
import Goals from '@/models/goals.models';
import { NextResponse,NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string; 
    iat: number; 
    exp: number; 
}

export async function POST(request:NextRequest) {
  await connect();

  try {    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;


    const requestBody = await request.json();
    const {newGoal} = requestBody;
    if(!newGoal || newGoal===""){
      return NextResponse.json({
        message : "Bad Request"
      },{status:400})
    }
    const newGoalObject = new Goals({
      owner : decodedToken.id,
      goal : newGoal.trim()
    })
    await newGoalObject.save();

    return NextResponse.json({
      message : "New goal has been added successfully!!",
      data : newGoalObject
    },{status:201});

  } catch (error: unknown) {
    console.error("Error while adding goal:", error);


    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Failed to add goal." },
        { status: 500 }
      );
    }

    
    return NextResponse.json(
      { message: "An unexpected error occurred while adding goal." },
      { status: 500 }
    );
  }
}
