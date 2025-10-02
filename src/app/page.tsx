"use client";
import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";
import type { PostWithComments } from "@/app/api/types";

export default function Page() {
    const [posts, setPosts] = useState<PostWithComments[]>([]);
    const [editing, setEditing] = useState<PostWithComments | null>(null);

    async function load() {
        try {
            const res = await fetch("/api/posts");
            if (res.ok) {
                const data: PostWithComments[] | { error: string } =
                    await res.json();
                if (Array.isArray(data)) {
                    setPosts(data);
                } else {
                    throw new Error(data.error);
                }
            } else {
                throw new Error(res.statusText);
            }
        } catch (e) {
            console.error("oops");
        }
    }

    const channel = new BroadcastChannel("posts");

    useEffect(() => {
        load();
        channel.addEventListener(
            "message",
            (message: MessageEvent<{ name: string }>) => {
                const { data } = message;
                if (data.name === "posted") {
                    load();
                }
            }
        );
    }, []);

    return (
        <main className="p-6">
            <h1 className="text-2xl mb-4">Posts SPA (Prisma + Next.js)</h1>
            <div className="grid grid-cols-2 gap-6">
                <div>
                    <PostForm
                        editing={editing}
                        onSaved={() => {
                            channel.postMessage({ name: "posted" });
                            setEditing(null);
                            load();
                        }}
                        onCancel={() => {
                            setEditing(null);
                        }}
                    />
                </div>
                <div>
                    <PostList
                        posts={posts}
                        onEdit={(p) => setEditing(p)}
                        onDelete={async (id) => {
                            await fetch(`/api/posts?id=${id}`, {
                                method: "DELETE",
                            });
                            load();
                        }}
                    />
                </div>
            </div>
        </main>
    );
}
