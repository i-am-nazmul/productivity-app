import { connect } from "@/dbconfig/dbconfig";
import Goals from "@/models/goals.models";
import Users from "@/models/users.models";
import GoalData from "@/models/goaldata.models";
import { NextResponse } from "next/server";

export async function DELETE() {
  await connect();

  try {
    await Goals.collection.drop();
    await GoalData.collection.drop();
    await Users.collection.drop();
    

    return NextResponse.json({
      message: "Everything deleted successfully!"
    });
  } catch (error: any) {      
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
