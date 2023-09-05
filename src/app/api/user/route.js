import { NextResponse } from "next/server";
import User from "../../../../models/user";
import { connectMongoDb } from "../../../../lib/mongodb";

export async function POST(request) {
    const { email, name } = await request.json();
    await connectMongoDb();
    await User.create({ email, name })
    return NextResponse.json({ message: "User Register Successfully" }, { status: 201 })
}