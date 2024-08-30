// /pages/api/save-user-interests.js
import { connectDB } from "@/dbconfig/dbconfig";
import User from "@/models/user";
import Category from "@/models/category";

connectDB(); // Connect to the database

export POST(req) {
    
    const { userId, selectedCategories } = req.body;

    try {
      const categories = await Category.find({
        name: { $in: selectedCategories },
      });

      // Update user's interests
      await User.findByIdAndUpdate(userId, {
        interests: categories.map((cat) => cat._id),
      });

      NextResponse.json({   
        success: true,
        message: "User interests updated successfully.",
      });
    } catch (error) {
      console.error("Error updating user interests:", error.message);
      NextResponse.json({ success: false, message: error.message });
    }
  } else {
    NextResponse.json({ success: false, message: "Method Not Allowed" });
  }
}
