import Goals from "@/models/goals.models";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";
import GoalData from "@/models/goaldata.models";



export async function GET(request : NextRequest){
      await connect();
      try {
            const token = request.cookies.get("token")?.value;

      if (!token) {
            console.error("Unauthorised");
            return NextResponse.json({ message: "Failed to fetch the goal data." }, { status: 401 });
      }


      const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

      

      const {searchParams} = new URL(request.url);
      const goal = searchParams.get("goal");
      
      if (!goal ) {
            console.error("Failed to get the goal from the url");

      return NextResponse.json({ message: "Failed to fetch the goal data" }, { status: 400 });
      }

      const userGoal = await Goals.findOne({owner : decodedToken.id,goal:goal});
      if(!userGoal){
            console.error("No goals exists");
            return NextResponse.json({message : "Failed to fetch the goal data."},{status : 400})
      }



      const dataForEachGoal = await GoalData.find({goal:userGoal._id})



      return NextResponse.json({ goalData: dataForEachGoal }, { status: 200 });

      } catch (error: unknown) {
    console.error("Error while fetching goal data:", error);

    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Failed to fetch the goal data." },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Unexpected error occurred while fetching goal data." },
      { status: 500 }
    );
  }
}