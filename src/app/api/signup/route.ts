import { connect } from '@/dbconfig/dbconfig';
import Users from '@/models/users.models';
import { NextResponse,NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


export async function POST(request:NextRequest) {
  await connect();

  try {    
    const requestBody = await request.json();
    const {username,email,password} = requestBody;
    const existingUser = await Users.findOne({email});
    if(existingUser){
      return NextResponse.json({message : "Signup failed. Please try again wit different information."},{status : 400})
    }
    const user = await Users.create({username,email,password});

    const token = jwt.sign(
      {
        id : user._id
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn : '1d'
      }
    )


    const response = NextResponse.json({
      message : "Signed up successfully!!"
    },{status : 201});
    response.cookies.set("token",token,{
      httpOnly : true,
      secure : true,
      sameSite : 'strict'

    });
    return response;


  } catch (error:any) {
    console.log(error)
    return NextResponse.json({message : "Internal error occured"} ,{ status: 500 });
  }
}
