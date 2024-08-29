import { connectDB } from "@/dbconfig/dbconfig";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import User from "@/models/user";
import { NextResponse } from "next/server";

connectDB(); // Connect to the database

export async function POST(request) {
  try {
    // Get user ID from the token
    const userId = await getDataFromToken(request);

    // Find the user by ID and exclude the password field
    const user = await User.findOne({ _id: userId }).select("-password");

    console.log(user);

    if (!user) {
      return NextResponse.json(
        { error: "Invalid token" },
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Return a success response if the user is found
    return NextResponse.json(
      {
        success: true,
        message: "User found",
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    // Handle errors and return an error response
    return NextResponse.json(
      { error: "Something went wrong" }
      // { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
