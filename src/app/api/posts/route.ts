import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logServer, logError } from "@/lib/logger";

export async function GET() {
    try {
        logServer("Fetching posts");
        const posts = await prisma.post.findMany({
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(posts);
    } catch (err) {
        logError("Failed to fetch posts", err);
        return NextResponse.json(
            { error: "Failed to fetch posts" },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        logServer("Creating post", { title: body.title });
        const created = await prisma.post.create({
            data: { title: body.title, content: body.content ?? null },
        });
        return NextResponse.json(created, { status: 201 });
    } catch (err) {
        logError("Failed to create post", err);
        return NextResponse.json(
            { error: "Failed to create post" },
            { status: 500 }
        );
    }
}

export async function PUT(request: Request) {
    try {
        const body = await request.json();
        logServer("Updating post", { id: body.id });
        const updated = await prisma.post.update({
            where: { id: Number(body.id) },
            data: { title: body.title, content: body.content ?? null },
        });
        return NextResponse.json(updated);
    } catch (err) {
        logError("Failed to update post", err);
        return NextResponse.json(
            { error: "Failed to update post" },
            { status: 500 }
        );
    }
}

export async function DELETE(request: Request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get("id");
        logServer("Deleting post", { id });
        if (!id)
            return NextResponse.json({ error: "Missing id" }, { status: 400 });
        await prisma.post.delete({ where: { id: Number(id) } });
        return NextResponse.json({ success: true });
    } catch (err) {
        logError("Failed to delete post", err);
        return NextResponse.json(
            { error: "Failed to delete post" },
            { status: 500 }
        );
    }
}
