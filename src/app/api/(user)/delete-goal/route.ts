import { NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import Goals from "@/models/goals.models";
import GoalData from "@/models/goaldata.models";
import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

interface DecodedToken {
    id: string; 
    iat: number; 
    exp: number; 
}

export async function DELETE(request:NextRequest) {
      await connect();


      const token = request.cookies.get("token")?.value;
          if (!token) {
            return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 });
          }
          const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;


      
      const { goal } = await request.json();

      try {
            const goalId = await Goals.findOne({ goal });
            if (!goalId) {
                  return NextResponse.json({ message: "Goal not found" }, { status: 404 });
            }
            await GoalData.deleteMany({ goal: goalId._id });
            await Goals.deleteOne({ _id: goalId._id, owner: decodedToken.id });
            console.log("Goal and associated data deleted successfully");
            return NextResponse.json({ message: "Goal deleted successfully" }, { status: 200 });
      } catch (error:unknown) {
            console.error("Error deleting goal:", error);
            return NextResponse.json({ message: "Internal server error" }, { status: 500 });
      }
}            