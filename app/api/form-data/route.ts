
import { NextResponse } from "next/server";

export async function POST(request: Request) {  
    try {
        const data = await request.json();
        console.log("Received form data:", data);

        // Forward to external API
        const response = await fetch(
            "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseOne",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            }
        );

        if (!response.ok) {
            throw new Error(`External API error: ${response.statusText}`);
        }

        const result = await response.json();
        console.log("External API response:", result);

        return NextResponse.json({
            message: "Form data received and processed successfully",
            data: result
        });

    } catch (error) {
        console.error("Error processing form data:", error);
        return NextResponse.json(
            { message: "Error processing form data", error: String(error) },
            { status: 500 }
        );
    }
}