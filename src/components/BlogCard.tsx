import React from "react";
import { Link } from "react-router-dom";
import { BlogPost } from "../types/blog";

interface BlogCardProps {
  blog: BlogPost;
  onDelete: (id: string) => void;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, onDelete }) => {
  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    onDelete(blog.id);
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {blog.image_url && (
        <img
          src={blog.image_url}
          alt={blog.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-2">
          {blog.title}
        </h2>
        <p className="text-gray-600 mb-2">{blog.location}</p>
        <p className="text-gray-600 mb-4">
          {blog.content.length > 150
            ? `${blog.content.substring(0, 150)}...`
            : blog.content}
        </p>
        <div className="flex justify-between items-center">
          <Link
            to={`/blog/${blog.id}`}
            className="text-pink-500 hover:text-pink-600"
          >
            Read more →
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-500 hover:text-red-600"
            type="button"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
