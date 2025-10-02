"use client";
import React from "react";
import { PostWithComments } from "@/app/api/types";

export default function PostList({
    posts = [],
    onEdit,
    onDelete,
}: {
    posts: PostWithComments[] | undefined;
    onEdit: (p: PostWithComments) => void;
    onDelete: (id: number) => void;
}) {
    return (
        <div>
            {posts?.length === 0 ? (
                <p className="text-muted">No posts yet</p>
            ) : (
                <ul className="space-y-3">
                    {posts?.map((p) => (
                        <li key={p.id} className="card">
                            <div className="flex justify-between items-start">
                                <div>
                                    <strong className="block text-lg">
                                        {p.title}
                                    </strong>
                                    <div className="text-sm text-muted">
                                        {p.content}
                                    </div>
                                </div>
                                <div className="flex flex-col gap-2 ml-4">
                                    <button
                                        onClick={() => onEdit(p)}
                                        className="px-2 py-1 bg-yellow-300 rounded"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => onDelete(p.id)}
                                        className="px-2 py-1 bg-red-300 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                                <div>{p.comments?.length} comments</div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
