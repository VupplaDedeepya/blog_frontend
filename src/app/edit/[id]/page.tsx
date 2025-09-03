"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import api from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";

export default function EditBlog() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      const fetchBlog = async () => {
        try {
          const res = await api.get(`/blog/${id}`);
          setTitle(res.data.title);
          setContent(res.data.content);
          setLoading(false);
        } catch (error) {
          toast.error("Failed to load blog");
          setLoading(false);
        }
      };
      fetchBlog();
    }
  }, [id]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (title.length < 5) {
      toast.error("Title must be at least 5 characters");
      return;
    }
    try {
      await api.put(`/blog/${id}`, { title, content });
      toast.success("Blog updated!");
      router.push("/");
    } catch (error) {
      toast.error("Failed to update blog");
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading blog data...</div>;
  }

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
        <form onSubmit={handleUpdate} className="space-y-4">
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
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update Blog
          </button>
        </form>
      </div>
    </>
  );
}
