import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email, password } = reqBody;

    // check if the user already exists //
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: 'user does not exists' },
        { status: 400 }
      );
    }
    // verify the password as the user exists //
    const validPassword = await bcryptjs.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: 'Invalid Password' },
        { status: 400 }
      );
    }
    // create token data //
    const tokenData = {
      id: user._id,
      email: user.email,
      userName: user.userName,
    };
    // create token by jwt //
    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, {
      expiresIn: '1h',
    });
    // send response and set the token into the user coockies //
    const response = NextResponse.json({
      message: 'login successfully',
      success: true,
    });
    response.cookies.set('token', token, { httpOnly: true });
    return response;
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
