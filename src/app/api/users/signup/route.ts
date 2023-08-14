import { connect } from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcryptjs from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { userName, email, password } = reqBody;

    //check if user already exists //
    const user = await User.findOne({ email });
    if (user) {
      return NextResponse.json(
        { message: 'this user already exists' },
        { status: 400 }
      );
    }

    // hash the password //
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    // create new user //
    const newUser = new User({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // sent verification email to user //
    await sendEmail({ email, emailType: 'VERIFY', userId: savedUser._id });

    return NextResponse.json({
      message: 'user created successgully',
      success: true,
      savedUser,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
