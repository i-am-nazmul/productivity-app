import { connect } from '@/dbconfig/dbconfig';
import Goals from '@/models/goals.models';
import { NextResponse,NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function POST(request:NextRequest) {
  await connect();

  try {    
    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 });
    }
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);


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

  } catch (error:any) {
    console.error(error);
    return NextResponse.json({ message : "Failed to add." }, { status: 500 });
  }
}
