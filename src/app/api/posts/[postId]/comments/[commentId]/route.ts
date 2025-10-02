import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

type DeleteCommentParams = { postId: string; commentId: string };

export async function DELETE(
    _: Request,
    { params }: { params: DeleteCommentParams }
): Promise<NextResponse<null | { error: string }>> {
    const postId = Number(params.postId);
    const commentId = Number(params.commentId);

    if (!Number.isInteger(postId) || postId <= 0) {
        return new NextResponse("Invalid postId", { status: 400 });
    }
    if (!Number.isInteger(commentId) || commentId <= 0) {
        return new NextResponse("Invalid commentId", { status: 400 });
    }

    try {
        // Use deleteMany with both id and postId to ensure we only delete a comment
        // that belongs to the specified post. This is atomic and avoids a race
        // between read + delete.
        const result = await prisma.comment.deleteMany({
            where: { id: commentId, postId },
        });

        if (result.count === 0) {
            // Either the comment doesn't exist or it doesn't belong to this post
            return NextResponse.json({ error: "Not found" }, { status: 404 });
        }

        // Successfully deleted
        return NextResponse.json(null, { status: 204 });
    } catch (err) {
        console.error("Error deleting comment", err);
        return NextResponse.json(
            { error: "Failed deleting comment" },
            { status: 500 }
        );
    }
}
