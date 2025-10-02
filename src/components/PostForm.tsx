"use client";
import { Post } from "@/app/api/types";
import React, { useState, useEffect } from "react";

export default function PostForm({
    onSaved,
    editing,
    onCancel,
}: {
    onCancel?: () => void;
    onSaved: () => void;
    editing?: Post | null;
}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleReset = (): void => {
        setTitle("");
        setContent("");
    };

    const handleCancel = (): void => {
        handleReset();
        onCancel?.();
    };

    useEffect(() => {
        if (editing) {
            setTitle(editing.title);
            setContent(editing.content ?? "");
        } else {
            handleReset();
        }
    }, [editing]);

    async function submit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            await fetch("/api/posts", {
                method: "PUT",
                body: JSON.stringify({ id: editing.id, title, content }),
                headers: { "Content-Type": "application/json" },
            });
        } else {
            await fetch("/api/posts", {
                method: "POST",
                body: JSON.stringify({ title, content }),
                headers: { "Content-Type": "application/json" },
            });
        }
        handleReset();
        onSaved();
    }

    return (
        <form onSubmit={submit} className="card space-y-3">
            <div>
                <label className="block text-sm text-muted">Title</label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div>
                <label className="block text-sm text-muted">Content</label>
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    className="border p-2 w-full rounded"
                />
            </div>
            <div className="flex justify-end">
                {editing && (
                    <button
                        className="px-4 py-2 bg-accent text-white rounded"
                        onClick={handleCancel}
                    >
                        Cancel
                    </button>
                )}
                <button
                    className="px-4 py-2 bg-accent text-white rounded"
                    type="submit"
                >
                    {editing ? "Update" : "Create"}
                </button>
            </div>
        </form>
    );
}
