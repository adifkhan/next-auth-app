import { connect } from '@/dbConfig/dbConfig';
import { sendEmail } from '@/helpers/mailer';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({
      email: email,
    });
    if (!user) {
      return NextResponse.json({ message: 'Invalid user', success: false });
    }
    // sent verification email to user //
    await sendEmail({ email, emailType: 'RESET', userId: user._id });

    return NextResponse.json({
      message: `a reset link has been sent to ${email}`,
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
