import { connect } from '@/dbconfig/dbconfig';
import Users from '@/models/users.models';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  await connect();

  try {
    // Get the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.error("Unauthorised");
      return NextResponse.json({ message: "Failed" }, { status: 401 });
    }

    // verify the token
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // find the user by ID
    const user = await Users.findById(decodedToken.id).select("username email");

    if (!user) {
      console.error("No such user exists");
      return NextResponse.json({ message: "Failed" }, { status: 404 });
    }

    // 4. Return username and email
    return NextResponse.json({
      username: user.username,
      email: user.email,
    },{status:200});

  } catch (error: any) {
    console.error("Invalid or expired token. Please login.");
    return NextResponse.json({ message: "Failed", error: error.message }, { status: 401 });
  }
}
