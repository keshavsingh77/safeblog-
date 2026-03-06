
export interface BlogPost {
  id: string;
  published: string;
  updated: string;
  url: string;
  title: string;
  content: string;
  author: {
    id: string;
    displayName: string;
    url: string;
    image: {
      url: string;
    };
  };
  labels?: string[];
}

export interface BloggerResponse {
  items: BlogPost[];
  nextPageToken?: string;
  prevPageToken?: string;
}
