"use client";
import React, { useEffect, useState } from "react";
import PostList from "../components/PostList";
import PostForm from "../components/PostForm";

type Post = { id: number; title: string; content?: string };

export default function Page() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [editing, setEditing] = useState<Post | null>(null);

    async function load() {
        try {
            const res = await fetch("/api/posts");
            const data = await res.json();
            if (res.ok) {
                setPosts(data);
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
                console.log("message received");
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
