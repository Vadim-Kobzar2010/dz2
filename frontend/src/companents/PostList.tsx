import type { Post } from "../types/Post";
import PostCard from "./PostCard";

interface Props {
  posts: Post[];
}

export default function PostList({ posts }: Props) {
  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}