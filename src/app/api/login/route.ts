import { connect } from '@/dbconfig/dbconfig';
import Users from '@/models/users.models';
import { NextResponse,NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';


export async function POST(request:NextRequest) {

  await connect();
  console.log("DB connected");


  try {    
    const requestBody = await request.json();
    const {email,password} = requestBody;
    const existingUser = await Users.findOne({email : email});

    if(!existingUser){
      return NextResponse.json({message : "User not found !! Please Sign up"},{status : 409})
    }
    
    if(existingUser.password !== password){
      return NextResponse.json({message : "Invalid Password !!"},{status : 409})
    }

    const token = jwt.sign(
      {
        id : existingUser._id
      },
      process.env.TOKEN_SECRET!,
      {
        expiresIn : '1d'
      }
    )


    const response = NextResponse.json({
      message : "Logged in successfully!!"
    },{status : 200});
    response.cookies.set("token",token,{
      httpOnly : true
    });
    return response;


  } catch (error:any) {
    return NextResponse.json({ status: 'error', error: (error as Error).message }, { status: 500 });
  }
}
