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
      return NextResponse.json({message : "The email is already in use !!"},{status : 409})
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
      httpOnly : true
    });
    return response;


  } catch (error:any) {
    return NextResponse.json({ status: 'error', error: (error as Error).message }, { status: 500 });
  }
}
