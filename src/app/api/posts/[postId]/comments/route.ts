import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { logServer, logError } from "@/lib/logger";

type BaseCommentParams = { postId: string };

export async function GET(
    _: Request,
    { params }: { params: BaseCommentParams }
) {
    logServer("Fetching comments for post", { postId: params.postId });

    const postId = Number(params.postId);
    if (!Number.isInteger(postId)) {
        return NextResponse.json("Invalid postId", { status: 400 });
    }

    try {
        const comments = await prisma.comment.findMany({
            where: { postId },
            orderBy: { createdAt: "desc" },
        });
        return NextResponse.json(comments);
    } catch (error) {
        logError("Error fetching comments", error);
        return NextResponse.json(
            { error: "Failed to fetch comments" },
            { status: 500 }
        );
    }
}

export async function POST(
    request: Request,
    { params }: { params: BaseCommentParams }
) {
    logServer("Creating comment for post", { postId: params.postId });

    const postId = Number(params.postId);
    if (!Number.isInteger(postId)) {
        return NextResponse.json("Invalid postId", { status: 400 });
    }

    try {
        const { content }: { content?: string } = await request.json();
        const cleanContent = content?.trim() ?? "";
        const created = await prisma.comment.create({
            data: { comment: cleanContent, postId },
        });
        return NextResponse.json(created, { status: 201 });
    } catch (error) {
        logError("Error creating comment", error);
        return NextResponse.json(
            { error: "Failed to create comment" },
            { status: 500 }
        );
    }
}
