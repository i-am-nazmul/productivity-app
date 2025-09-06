import { connect } from '@/dbconfig/dbconfig';
import GoalData from '@/models/goaldata.models';
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
    const {goalName,duration,date} = requestBody;
    const goal = await Goals.findOne({goal : goalName});

    if (!goal) {
      return NextResponse.json({ message: "No such goal exists" }, { status: 401 });
    }


    await GoalData.create({goal : goal._id,
      duration : duration,
      date : date })

    return NextResponse.json({message : "Data updated successfully"},
      {status : 201}
    );


  } catch (error:any) {
    return NextResponse.json({ status: 'error', error: (error as Error).message }, { status: 500 });
  }
}
