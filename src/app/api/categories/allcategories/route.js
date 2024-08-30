import { connectDB } from "@/dbconfig/dbconfig";
import Category from "@/models/category";
import { NextResponse } from "next/server";

connectDB(); // Connect to the database

export async function GET(request) {
  try {
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page")) || 1;
    const limit = parseInt(url.searchParams.get("limit")) || 6;
    const skip = (page - 1) * limit;

    // Fetch categories with pagination
    const categoriesData = await Category.find({})
      .skip(skip)
      .limit(limit)
      .exec();
    const totalItems = await Category.countDocuments({}); // Total number of categories

    return NextResponse.json(
      {
        success: true,
        message: "Get Categories successfully",
        categoriesData,
        totalItems,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Error in fetching categories",
      },
      { status: 400 }
    );
  }
}
