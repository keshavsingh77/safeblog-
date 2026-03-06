
// --- BLOG CONSTANTS ---
export const BLOGGER_API_KEY = 'AIzaSyAB38Lkz-xiuvkFFuEDd7BsVo97DMA4g24'; 
export const BLOG_ID = '6924208631263306852'; 

export const POSTS_PER_PAGE = 9; 
export const DISQUS_SHORTNAME = ''; 

// --- HELPERS ---
/**
 * Generates an SEO-friendly slug from a title.
 * Removed the ID suffix as per user request for cleaner URLs.
 */
export const createSlug = (title: string): string => {
  if (!title) return 'post';
  return title
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove non-word chars
    .replace(/[\s_-]+/g, '-')   // Replace spaces/underscores with hyphens
    .replace(/^-+|-+$/g, '');   // Trim leading/trailing hyphens
};

export const extractFirstImage = (content: string): string | null => {
  if (!content) return null;
  const matches = [...content.matchAll(/<img[^>]+src=["']([^"']+)["']/g)];
  for (const match of matches) {
    const src = match[1];
    if (
      src.includes('b16-rounded') || 
      src.includes('icon18_wrench') || 
      src.includes('pixel.gif') || 
      src.includes('blogger_logo') ||
      src.includes('blogger-logo') || 
      src.includes('img1.blogblog.com') ||
      src.includes('picasaweb.google.com/s/c') || 
      src.includes('plus.google.com') ||
      src.includes('feeds.feedburner.com') || 
      src.includes('feedburner') ||
      src.includes('subscribe-net')
    ) {
      continue;
    }
    if (src.includes('bp.blogspot.com') || src.includes('googleusercontent.com')) {
       return src.replace(/\/(s\d+(-c)?|w\d+(-h\d+)?)\//, '/w1200/');
    }
    return src;
  }
  return null;
};

export const extractSnippet = (content: string, length: number = 100): string => {
  if (!content) return '';
  const text = content.replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > length ? text.substring(0, length) + '...' : text;
};

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return `${date.getDate()} ${date.toLocaleString('en-US', { month: 'short' }).toUpperCase()}`;
};

export const cleanContent = (content: string): string => {
  return content;
};
