import { connect } from '@/dbConfig/dbConfig';
import { getTokenData } from '@/helpers/getTokenData';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getTokenData(request);

    const user = await User.findOne({ _id: userId }).select('-password -__v');
    return NextResponse.json({ user: user, success: true });
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}
