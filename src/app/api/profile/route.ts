import { connect } from '@/dbconfig/dbconfig';
import Users from '@/models/users.models';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
  await connect();

  try {
    // 1. Get the token from cookies
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ message: "Unauthorized. No token provided." }, { status: 401 });
    }

    // 2. Verify the token
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);

    // 3. Find the user by ID
    const user = await Users.findById(decodedToken.id).select("username email");

    if (!user) {
      return NextResponse.json({ message: "User not found." }, { status: 404 });
    }

    // 4. Return username and email
    return NextResponse.json({
      username: user.username,
      email: user.email,
    });

  } catch (error: any) {
    return NextResponse.json({ message: "Invalid or expired token", error: error.message }, { status: 401 });
  }
}
