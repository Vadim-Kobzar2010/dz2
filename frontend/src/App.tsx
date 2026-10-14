import Header from "./companents/Header";
import PostList from "./companents/PostList";
import { posts } from "./data/posts";
import "./App.css";

export default function App() {
  return (
    <>
      <Header />

      <main className="container">
        <h2>Последние посты</h2>
        <PostList posts={posts} />
      </main>

      <footer className="footer">
        My Forum © 2026
      </footer>
    </>
  );
}