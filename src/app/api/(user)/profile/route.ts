import { connect } from '@/dbconfig/dbconfig';
import Users from '@/models/users.models';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

interface DecodedToken {
    id: string; 
    iat: number; 
    exp: number; 
}

export async function GET(request: NextRequest) {
  await connect();

  try {
    
    const token = request.cookies.get("token")?.value;

    if (!token) {
      console.error("Unauthorised");
      return NextResponse.json({ message: "Failed" }, { status: 401 });
    }

    
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET!) as DecodedToken;

    
    const user = await Users.findById(decodedToken.id).select("username email");

    if (!user) {
      console.error("No such user exists");
      return NextResponse.json({ message: "Failed" }, { status: 404 });
    }

    
    return NextResponse.json({
      username: user.username,
      email: user.email,
    },{status:200});

  } catch (error: unknown) {
    console.error("Invalid or expired token. Please login.");
    return NextResponse.json({ message: "Failed",  error }, { status: 401 });
  }
}
