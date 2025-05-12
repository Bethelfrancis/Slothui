export const runtime = "nodejs";

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("image");

        if (!file) {
            return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes); // this line works now

        const base64String = `data:image/png;base64,${buffer.toString("base64")}`;

        const result = await cloudinary.uploader.upload(base64String, {
            folder: "uploads",
        });

        return NextResponse.json({ imageUrl: result.secure_url }, { status: 200 });
    } catch (error) {
        console.error("Upload error:", error);
        return NextResponse.json({ error: "Failed to upload file" }, { status: 500 });
    }
}
