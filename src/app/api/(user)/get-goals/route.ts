import Goals from "@/models/goals.models";
import { NextRequest,NextResponse } from "next/server";
import { connect } from "@/dbconfig/dbconfig";
import jwt from "jsonwebtoken";




export async function GET(request : NextRequest){
      await connect();
      try {
            const token = request.cookies.get("token")?.value;

      if (!token) {
            return NextResponse.json({ message: "Unauthorised." }, { status: 401 });
      }
      const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
      const userGoals = await Goals.find({owner : decodedToken.id});
      return NextResponse.json({ goals: userGoals }, { status: 200 });

      } catch (error: unknown) {
    console.error("Error while fetching goals:", error);

    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json(
        { message: "Invalid or expired token." },
        { status: 401 }
      );
    }

    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message || "Failed to get the goals." },
        { status: 500 }
      );
    }

    
    return NextResponse.json(
      { message: "An unknown error occurred while fetching goals." },
      { status: 500 }
    );
  }
}