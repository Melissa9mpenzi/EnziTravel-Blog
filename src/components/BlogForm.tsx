import React, { useState } from 'react';
import { BlogFormData } from '../types/blog';

interface BlogFormProps {
  initialData?: BlogFormData;
  onSubmit: (data: BlogFormData) => void;
  buttonText: string;
}

export default function BlogForm({ initialData, onSubmit, buttonText }: BlogFormProps) {
  const [formData, setFormData] = useState<BlogFormData>(
    initialData || {
      title: '',
      content: '',
      location: '',
      image_url: '',
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-primary-800">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-accent-300 focus:ring focus:ring-accent-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium text-primary-800">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-accent-300 focus:ring focus:ring-accent-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="image_url" className="block text-sm font-medium text-primary-800">
          Image URL
        </label>
        <input
          type="url"
          id="image_url"
          value={formData.image_url}
          onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
          className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-accent-300 focus:ring focus:ring-accent-200 focus:ring-opacity-50"
          required
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-primary-800">
          Content
        </label>
        <textarea
          id="content"
          rows={6}
          value={formData.content}
          onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          className="mt-1 block w-full rounded-md border-primary-300 shadow-sm focus:border-accent-300 focus:ring focus:ring-accent-200 focus:ring-opacity-50"
          required
        />
      </div>

      <button
        type="submit"
        className="w-full bg-accent-500 text-white py-2 px-4 rounded-md hover:bg-accent-600 transition-colors"
      >
        {buttonText}
      </button>
    </form>
  );
}