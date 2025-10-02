import type { Prisma } from "@/generated/prisma";

export type Post = Prisma.PostGetPayload<{}>;
export type Comment = Prisma.CommentGetPayload<{}>;
export type PostWithComments = Post & { comments: Comment[] };
