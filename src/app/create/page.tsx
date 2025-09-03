"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";

export default function CreateBlog() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 5) {
      toast.error("Title must be at least 5 characters");
      return;
    }
    await api.post("/blog", { title, content });
    toast.success("Blog created!");
    router.push("/");
  };

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {title && title.length < 5 && (
            <p className="text-red-500 text-sm">
              Title must have at least 5 characters
            </p>
          )}
          <textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <button
            type="submit"
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}
