export interface User {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  major?: string;
  graduation_year?: number;
  skills: string[];
  interests: string[];
  created_at: string;
}

export interface Group {
  id: string;
  name: string;
  description: string;
  category: string;
  created_by: string;
  created_at: string;
  member_count: number;
  avatar_url?: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  capacity: number;
  group_id?: string;
  created_by: string;
  created_at: string;
  image_url?: string;
  attendees_count: number;
}

export interface Register {
  id: string;
  user_id: string;
  event_id?: string;
  group_id?: string;
  created_at: string;
}