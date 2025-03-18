import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../types/blog";

interface BlogCardProps {
  blog: BlogPost;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onDelete }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
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
          <Link
            to={`/blog/${blog.id}`}
            className="text-pink-500 hover:text-pink-600"
          >
            Read more →
          </Link>
          <button
            onClick={() => onDelete(blog.id)}
            className="text-red-500 hover:text-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
