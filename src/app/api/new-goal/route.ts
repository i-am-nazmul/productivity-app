import { connect } from '@/dbconfig/dbconfig';
import Goals from '@/models/goals.models';
import { NextResponse,NextRequest } from 'next/server';

export async function POST(request:NextRequest) {
  await connect();

  try {    
    const requestBody = await request.json();
    const {newGoal} = requestBody;
    const newGoalObject = new Goals({
      goal : newGoal
    })
    await newGoalObject.save();

    return NextResponse.json({
      message : "New goal has been added successfully!!",
      data : newGoalObject
    });

  } catch (error:any) {
    return NextResponse.json({ status: 'error', error: (error as Error).message }, { status: 500 });
  }
}
