import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { supabase } from "../supabaseClient";
import { BlogPost } from "../types/blog";

const Home = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      setLoading(true);
      console.log("Fetching blogs..."); // Debug log

      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Fetched blogs:", data); // Debug log
      setBlogs(data || []);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-beige-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-pink-600 mb-8">
          Latest Travel Stories
        </h1>

        {loading ? (
          <p>Loading blogs...</p>
        ) : blogs.length === 0 ? (
          <p>No blogs found. Be the first to create one!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogs.map((blog) => (
              <div
                key={blog.id}
                className="bg-white rounded-lg shadow-md overflow-hidden"
              >
                {blog.image_url && (
                  <img
                    src={blog.image_url}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-2">
                    {blog.title}
                  </h2>
                  <p className="text-gray-600 mb-2">{blog.location}</p>
                  <p className="text-gray-600 mb-4">
                    {blog.content.substring(0, 150)}...
                  </p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">
                      By {blog.author}
                    </span>
                    <div className="flex space-x-2">
                      <Link
                        to={`/blog/${blog.id}`}
                        className="text-pink-500 hover:text-pink-600"
                      >
                        Read more →
                      </Link>
                      <Link
                        to={`/edit/${blog.id}`}
                        className="text-blue-500 hover:text-blue-600"
                      >
                        Edit
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
