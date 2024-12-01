import { fetchHomeIndex, fetchCurrentUser } from "../api/operations";
import { Post } from "../types/interfaces";

// Fetch all posts from the backend
export const getAllPosts = async (): Promise<{ posts: Post[]; error: string | null }> => {
  try {
    const data: Post[] | { error: string } = await fetchHomeIndex();
    if ("error" in data) {
      return { posts: [], error: data.error };
    }
    return { posts: data as Post[], error: null }; // Cast data directly to Post[]
  } catch (err) {
    return { posts: [], error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
};

// Fetch the current user's information
export const getCurrentUser = async (): Promise<{ username: string | null; error: string | null }> => {
  try {
    const data = await fetchCurrentUser();
    
    return { username: data.username || null, error: null };
  } catch (err) {
    return { username: null, error: err instanceof Error ? err.message : "An unknown error occurred" };
  }
};