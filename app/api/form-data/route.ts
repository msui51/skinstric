import { NextResponse } from "next/server";

export async function POST(request: Request) {  
    try {
        const data = await request.json();
        console.log("Received form data:", data);
        return NextResponse.json({ message: "Form data received successfully" });
    } catch (error) {
        console.error("Error processing form data:", error);
        return NextResponse.json({ message: "Error processing form data" }, { status: 500 });
    }
}