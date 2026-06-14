export type Profile = {
  id: string;
  username: string;
  full_name: string | null;
  bio: string | null;
  avatar_url: string | null;
  website: string | null;
  created_at: string;
  followers_count?: number;
  following_count?: number;
  posts_count?: number;
};

export type Post = {
  id: string;
  user_id: string;
  type: "image" | "video";
  url: string;
  caption: string | null;
  likes_count: number;
  comments_count: number;
  created_at: string;
  profiles?: Profile;
  liked_by_me?: boolean;
};

export type Comment = {
  id: string;
  user_id: string;
  post_id: string;
  content: string;
  created_at: string;
  profiles?: Profile;
};

export type Notification = {
  id: string;
  user_id: string;
  from_user_id: string;
  type: "like" | "comment" | "follow";
  post_id: string | null;
  read: boolean;
  created_at: string;
  from_profile?: Profile;
  post?: Post;
};