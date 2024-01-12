import { NextResponse } from "next/server";

import { connectToDB } from "@/app/api/db/connect";
import User from "@/app/api/models/User";

export async function GET() {
  try {
    connectToDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error: any) {
    throw new Error(`Failed to get all users: ${error.message}`);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const newUser = new User(data);
    const savedUser = await newUser.save();
    console.log(savedUser);

    return NextResponse.json({
      message: "Success",
    });
  } catch (error: any) {
    throw new Error(`Failed to create user: ${error.message}`);
  }
}
