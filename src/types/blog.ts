export interface BlogPost {
  id: string;
  title: string;
  content: string;
  image_url: string;
  location: string;
  created_at?: string;
  updated_at?: string;
}

export interface BlogFormData {
  title: string;
  content: string;
  location: string;
  image_url: string;
}