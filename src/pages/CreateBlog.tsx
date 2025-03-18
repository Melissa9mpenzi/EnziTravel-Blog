import React, { useState, FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../supabaseClient";

interface BlogFormData {
  title: string;
  content: string;
  image_url: string;
  location: string;
  author: string;
}

const CreateBlog = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<BlogFormData>({
    title: "",
    content: "",
    image_url: "",
    location: "",
    author: "Melissa Mpenzi", // Default author
  });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitting form data:", formData); // Debug log

    try {
      const { data, error } = await supabase
        .from("blogs")
        .insert([formData])
        .select();

      if (error) {
        console.error("Supabase error:", error);
        throw error;
      }

      console.log("Blog created:", data);
      navigate("/");
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post. Check console for details.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 bg-beige-50 p-8 rounded-lg shadow-lg"
      >
        <h2 className="text-2xl font-bold text-pink-600 mb-6">
          Create New Post
        </h2>

        <div>
          <label
            htmlFor="title"
            className="block text-gray-700 font-medium mb-2"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-beige-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="image_url"
            className="block text-gray-700 font-medium mb-2"
          >
            Image URL
          </label>
          <input
            type="url"
            id="image_url"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-beige-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
          />
        </div>

        <div>
          <label
            htmlFor="location"
            className="block text-gray-700 font-medium mb-2"
          >
            Location
          </label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-beige-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            required
          />
        </div>

        <div>
          <label
            htmlFor="content"
            className="block text-gray-700 font-medium mb-2"
          >
            Content
          </label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={6}
            className="w-full px-4 py-2 rounded-lg border border-beige-200 focus:border-pink-500 focus:ring-1 focus:ring-pink-500"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-pink-500 text-white py-3 px-6 rounded-lg hover:bg-pink-600 transition-colors font-medium"
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
