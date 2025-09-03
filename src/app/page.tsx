"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import api from "@/utils/api";
import toast, { Toaster } from "react-hot-toast";

interface Blog {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

export default function Home() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const router = useRouter();

  const fetchBlogs = async () => {
    const res = await api.get("/blog");
    setBlogs(res.data);
  };

  const deleteBlog = async (id: string) => {
    if (confirm("Are you sure you want to delete this blog?")) {
      await api.delete(`/blog/${id}`);
      toast.success("Blog deleted!");
      fetchBlogs();
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <>
      <Toaster position="top-right" />
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {blogs.map((blog) => (
            <div key={blog._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{blog.title}</h2>
              <p className="text-gray-700">{blog.content}</p>
              <p className="text-sm text-gray-500">
                {new Date(blog.createdAt).toLocaleString()}
              </p>
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => router.push(`/edit/${blog._id}`)}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteBlog(blog._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
