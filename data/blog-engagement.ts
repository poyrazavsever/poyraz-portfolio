export type BlogReply = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
};

export type BlogComment = {
  id: string;
  author: string;
  avatar: string;
  date: string;
  content: string;
  likes: number;
  replies: BlogReply[];
};

export type BlogEngagement = {
  slug: string;
  likes: number;
  comments: BlogComment[];
};

export const BLOG_ENGAGEMENT: BlogEngagement[] = [
  {
    slug: "building-minimal-design-systems",
    likes: 184,
    comments: [
      {
        id: "comment-1",
        author: "Merve K.",
        avatar: "/avatars/berat.png",
        date: "2 days ago",
        content:
          "The constraints-first point is very practical. We had the same issue with variant explosion.",
        likes: 12,
        replies: [
          {
            id: "reply-1",
            author: "Poyraz Avsever",
            avatar: "/logo/logo.jpeg",
            date: "1 day ago",
            content:
              "Exactly. Once defaults are strong, most edge cases disappear without extra variants.",
            likes: 6,
          },
        ],
      },
      {
        id: "comment-2",
        author: "Ahmet Y.",
        avatar: "/avatars/ali.png",
        date: "5 days ago",
        content:
          "Could you also share a checklist for documenting component states in PR reviews?",
        likes: 8,
        replies: [],
      },
    ],
  },
];

const EMPTY_ENGAGEMENT: BlogEngagement = {
  slug: "default",
  likes: 0,
  comments: [],
};

export function getBlogEngagementBySlug(slug: string): BlogEngagement {
  return BLOG_ENGAGEMENT.find((item) => item.slug === slug) ?? EMPTY_ENGAGEMENT;
}
