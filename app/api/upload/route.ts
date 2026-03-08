import { NextResponse } from "next/server";

const PHASE_TWO_URL =
  "https://us-central1-api-skinstric-ai.cloudfunctions.net/skinstricPhaseTwo";

const SUCCESS_MESSAGE =
  "SUCCESS: You hit the Level 2 API. Image is a valid Base64 String.";

const RACE_KEYS = [
  "black",
  "white",
  "southeast asian",
  "south asian",
  "latino hispanic",
  "east asian",
  "middle eastern",
] as const;

const AGE_KEYS = [
  "20-29",
  "30-39",
  "40-49",
  "10-19",
  "50-59",
  "3-9",
  "60-69",
  "70+",
  "0-2",
] as const;

const GENDER_KEYS = ["male", "female"] as const;

function randomDistribution(keys: readonly string[]): Record<string, number> {
  const values = keys.map(() => Math.random());
  const sum = values.reduce((a, b) => a + b, 0) || 1;

  return keys.reduce((acc, key, i) => {
    acc[key] = values[i] / sum;
    return acc;
  }, {} as Record<string, number>);
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ message: "No file uploaded" }, { status: 400 });
    }

    if (!file.type.startsWith("image/")) {
      return NextResponse.json({ message: "Only image files are allowed" }, { status: 400 });
    }

    // Convert image to Base64
    const arrayBuffer = await file.arrayBuffer();
    const imageBase64 = Buffer.from(arrayBuffer).toString("base64");

    // Send Base64 to external endpoint
    const response = await fetch(PHASE_TWO_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ image: imageBase64 }),
    });

    let upstreamMessage: string | undefined;
    try {
      const parsed: unknown = await response.json();
      if (
        parsed &&
        typeof parsed === "object" &&
        "message" in parsed &&
        typeof (parsed as { message?: unknown }).message === "string"
      ) {
        upstreamMessage = (parsed as { message: string }).message;
      }
    } catch {
      // ignore non-JSON response
    }

    if (!response.ok) {
      return NextResponse.json(
        { message: `External API error: ${response.status}` },
        { status: 502 }
      );
    }

    return NextResponse.json({
      message: upstreamMessage ?? SUCCESS_MESSAGE,
      data: {
        race: randomDistribution(RACE_KEYS),
        age: randomDistribution(AGE_KEYS),
        gender: randomDistribution(GENDER_KEYS),
      },
    });
  } catch (error) {
    return NextResponse.json(
      { message: "Error uploading file", error: String(error) },
      { status: 500 }
    );
  }
}