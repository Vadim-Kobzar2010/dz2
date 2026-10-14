import type { Post } from "../types/Post";

interface Props {
  post: Post;
}

export default function PostCard({ post }: Props) {
  return (
    <article className="post-card">
      <span className="category">{post.category}</span>
      <h2>{post.title}</h2>
      <p>{post.content}</p>

      <div className="post-footer">
        <span>Автор: {post.author}</span>
        <span>{post.createdAt}</span>
      </div>
    </article>
  );
}