
import { BLOGGER_API_KEY, BLOG_ID, POSTS_PER_PAGE } from '../constants';
import { BloggerResponse, BlogPost } from '../types';

// Simple in-memory cache to store API responses
const cache: Record<string, { data: any; timestamp: number }> = {};
const CACHE_DURATION = 1000 * 60 * 5; // 5 minutes

export const fetchPosts = async (pageToken?: string, query?: string, category?: string): Promise<{ posts: BlogPost[], nextPageToken?: string }> => {
  if (!BLOGGER_API_KEY) {
    return { posts: [], nextPageToken: undefined };
  }

  const cacheKey = `posts-${pageToken || 'first'}-${query || 'no-q'}-${category || 'no-cat'}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  try {
    let baseUrl = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts`;
    if (query) {
      baseUrl = `${baseUrl}/search`;
    }

    const url = new URL(baseUrl);
    url.searchParams.append('key', BLOGGER_API_KEY);
    url.searchParams.append('fetchBodies', 'true');
    url.searchParams.append('fetchImages', 'true');
    
    if (!query) {
       url.searchParams.append('maxResults', POSTS_PER_PAGE.toString());
       url.searchParams.append('status', 'LIVE');
       if (category) {
         url.searchParams.append('labels', category);
       }
    }
    
    if (query) url.searchParams.append('q', query);
    if (pageToken) url.searchParams.append('pageToken', pageToken);

    const response = await fetch(url.toString());
    if (!response.ok) throw new Error(`API Error: ${response.status}`);

    const data: BloggerResponse = await response.json();
    const result = {
      posts: data.items || [],
      nextPageToken: data.nextPageToken
    };

    // Store in cache
    cache[cacheKey] = { data: result, timestamp: now };
    return result;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

export const fetchPostById = async (postId: string): Promise<BlogPost> => {
  const cacheKey = `post-${postId}`;
  const now = Date.now();

  if (cache[cacheKey] && now - cache[cacheKey].timestamp < CACHE_DURATION) {
    return cache[cacheKey].data;
  }

  if (!BLOGGER_API_KEY) throw new Error("Missing API Key");
  
  const url = `https://www.googleapis.com/blogger/v3/blogs/${BLOG_ID}/posts/${postId}?key=${BLOGGER_API_KEY}`;
  const response = await fetch(url);
  
  if (!response.ok) {
    throw new Error(`Failed to fetch post: ${response.status}`);
  }
  
  const data = await response.json();
  cache[cacheKey] = { data, timestamp: now };
  return data;
};
