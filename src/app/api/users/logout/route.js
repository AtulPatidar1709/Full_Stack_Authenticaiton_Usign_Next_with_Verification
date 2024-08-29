import { connectDB } from "@/dbconfig/dbconfig";
import { NextResponse } from "next/server";

connectDB(); // Connect to the database

export async function GET(request) {
  try {
    const response = NextResponse.json({
      message: "Logout Successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
