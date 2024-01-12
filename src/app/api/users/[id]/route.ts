import { NextResponse } from "next/server";

import { connectToDB } from "@/app/api/db/connect";
import User from "@/app/api/models/User";

export async function GET(
  request: Request,
  { params }: { params: { id: string | number | any } }
) {
  try {
    connectToDB();
    const user = await User.find({ _id: params.id });

    if (!user.length) {
      return NextResponse.json(
        {
          message: "No user found",
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(user);
  } catch (error: any) {
    throw new Error(`Failed to get the requested user: ${error.message}`);
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string | number | any } }
) {
  try {
    connectToDB();
    const data = await request.json();
    const updatedUser = await User.findOneAndUpdate({ _id: params.id }, data, {
      new: true,
    });
    return NextResponse.json(updatedUser);
  } catch (error: any) {
    throw new Error(`Failed to update the requested user: ${error.message}`);
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string | number | any } }
) {
  try {
    const userDeleted = await User.findByIdAndDelete({ _id: params.id });

    if (!userDeleted)
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    return NextResponse.json(userDeleted, { status: 200 });
  } catch (error: any) {
    throw new Error(`Failed to delete the requested user: ${error.message}`);
  }
}
