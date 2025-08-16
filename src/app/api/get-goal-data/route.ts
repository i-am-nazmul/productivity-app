import Goals from "@/models/goals.models";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";
import Users from "@/models/users.models";
import GoalData from "@/models/goaldata.models";



export async function GET(request : NextRequest){
      await connect();
      try {
            const token = request.cookies.get("token")?.value;

      if (!token) {
            return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 });
      }


      const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

      const userGoals = await Goals.find({owner : decodedToken.id});
      const {searchParams} = new URL(request.url);
      const goal = searchParams.get("goal");
      // const date = searchParams.get("date");;

      // if (!goal || !date) {
      // return NextResponse.json({ message: "Missing goal or date" }, { status: 400 });
      // }

      let goalId ;

      for (let i = 0; i < userGoals.length; i++) {
            const element = userGoals[i];
            if(element.goal === goal){
                  goalId = element._id;

            }
            
      }


      const dataForEachGoal = await GoalData.find({goal:goalId})



      return NextResponse.json({ goalData: dataForEachGoal }, { status: 200 });

      } catch (error:any) {
            return NextResponse.json({
                  error:error.message
            },{status : 500})
      }
}