import { Main } from "@/utils/mailService";
import { NextResponse } from "next/server";

export async function POST(req, res) {
    const body = await req.json();
    const {
        fullName,
        email,
        phoneNumber,
        message
    } = body;
    const data = `
  User Info:
  fullName:         ${fullName}
  email:            ${email}
  phoneNumber:      ${phoneNumber}
  message:          ${message}
  `
    const mailSent = await Main(
        data,
    )
    return NextResponse.json({ mailSent })
}