import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {

    try {
        const listings = await prisma.listing.findMany({
            orderBy: {
                createdAt: "desc",
            },
        });
        return NextResponse.json(listings);
    } catch (error) {
        console.error("Error fetching listings:", error);
        return NextResponse.json({ error: "Failed to fetch listings" }, { status: 500 });
    }
}


export async function POST(request: Request) {
    try {
        const { title, description, price, address } = await request.json();

        if (!title || typeof title !== "string") {
            return NextResponse.json(
                { error: "Title field is required" },
                { status: 400 }
            );
        }

        const listing = await prisma.listing.create({
            data: {
                title,
                address: address && address.trim() ? address : null,
                description: description && description.trim() ? description : null,
                price: price ? parseInt(String(price), 10) : null,
            },
        });
        return NextResponse.json(listing, { status: 201 });
    } catch (error) {
        console.error("Error creating listing:", error);
        return NextResponse.json({ error: "Failed to create listing" }, { status: 500 });
    }
}
