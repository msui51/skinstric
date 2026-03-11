import { NextResponse } from "next/server";

export async function POST() {
  const data = {
    race: {
      selected: "East Asian",
      confidence: [
        { label: "East Asian", value: 96 },
        { label: "White", value: 6 },
        { label: "Black", value: 3 },
        { label: "South Asian", value: 2 },
        { label: "Latino Hispanic", value: 0 },
        { label: "South East Asian", value: 0 },
        { label: "Middle Eastern", value: 0 },
      ],
    },
    age: "20-29",
    sex: "Female",
  };

  return NextResponse.json({ data });
}
