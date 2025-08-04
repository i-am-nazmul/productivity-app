import Goals from "@/models/goals.models";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";


export async function GET(){
      await connect();
      try {
            const allGoals = await Goals.find({});
            return NextResponse.json({
                  message : "All the data have been fetched !!",
                  goals : allGoals
            })
      } catch (error:any) {
            return NextResponse.json({
                  error:error.message
            },{status : 500})
      }
}