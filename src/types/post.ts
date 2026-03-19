export interface Post {
    id: number;
    title: string;
    slug: string;
    summary: string;
    cover_image: string;
    status: string;
    views: number;
    created_at: string;
    published_at: string;
    category?: string;
    tags?: string[];
    read_time?: number;
    body?: string[];
}

export interface PostsResponse {
    success: boolean;
    message: string;
    data: Post[];
}

export interface Topic {
    name: string;
    description: string;
    count: number;
}

export interface EnrichedPost extends Post {
    topic: string;
    readTime: string;
    body: string[];
    tags: string[];
}
