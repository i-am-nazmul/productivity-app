import { connect } from '@/dbconfig/dbconfig';
import GoalData from '@/models/goaldata.models';
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
      return NextResponse.json({ message: "Failed to add goal data." }, { status: 401 });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;


    const requestBody = await request.json();
    const {goalName,duration,date} = requestBody;
    if(!goalName || duration <= 0 || typeof goalName!=='string'    || !date){
      console.error("Either invalid duration or goalname or date.");
      return NextResponse.json({message : "Failed to add goal data."},{
        status : 400
      })
    }
    const goal = await Goals.findOne({owner : decodedToken.id ,goal : goalName.trim()});

    if(!goal){
      console.error("No such goal exists");
      return NextResponse.json({
        message : "Failed to add goal data."
      },{
        status : 400
      })
    };


    await GoalData.create({goal : goal._id,
      duration : Number(duration),
      date : new Date(date) });

    return NextResponse.json({message : "Data updated successfully"},
      {status : 201}
    );


  } catch (error:any) {
    console.error("Error in the goal-data API : ",error);
    return NextResponse.json({ message : "Failed to add goal data." }, { status: 500 });
  }
}
