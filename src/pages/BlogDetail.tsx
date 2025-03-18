import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Edit2, Trash2, ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabaseClient';
import { BlogPost } from '../types/blog';

export default function BlogDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);

  useEffect(() => {
    fetchBlog();
  }, [id]);

  async function fetchBlog() {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setBlog(data);
    } catch (error) {
      console.error('Error fetching blog:', error);
      navigate('/');
    }
  }

  async function handleDelete() {
    if (!window.confirm('Are you sure you want to delete this blog post?')) return;

    try {
      const { error } = await supabase
        .from('blogs')
        .delete()
        .eq('id', id);

      if (error) throw error;
      navigate('/');
    } catch (error) {
      console.error('Error deleting blog:', error);
    }
  }

  if (!blog) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent-500"></div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={blog.image_url}
        alt={blog.title}
        className="w-full h-96 object-cover"
      />
      
      <div className="p-8">
        <div className="flex justify-between items-center mb-6">
          <Link
            to="/"
            className="flex items-center text-primary-600 hover:text-primary-800"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
          
          <div className="flex gap-4">
            <Link
              to={`/edit/${blog.id}`}
              className="flex items-center text-primary-600 hover:text-primary-800"
            >
              <Edit2 size={20} className="mr-2" />
              Edit
            </Link>
            <button
              onClick={handleDelete}
              className="flex items-center text-accent-500 hover:text-accent-600"
            >
              <Trash2 size={20} className="mr-2" />
              Delete
            </button>
          </div>
        </div>

        <h1 className="text-4xl font-semibold text-primary-800 mb-4">{blog.title}</h1>
        <p className="text-lg text-primary-600 mb-6">📍 {blog.location}</p>
        
        <div className="prose max-w-none">
          {blog.content.split('\n').map((paragraph, index) => (
            <p key={index} className="text-gray-700 mb-4">{paragraph}</p>
          ))}
        </div>
        
        <div className="mt-8 text-sm text-gray-500">
          <p>Created: {new Date(blog.created_at).toLocaleDateString()}</p>
          <p>Last updated: {new Date(blog.updated_at).toLocaleDateString()}</p>
        </div>
      </div>
    </article>
  );
}