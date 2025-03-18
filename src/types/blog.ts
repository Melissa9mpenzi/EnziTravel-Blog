export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url?: string;
  location: string;
  created_at: string;
  author: string;
  updated_at: string;
  user_id: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  location: string;
  image_url: string;
}