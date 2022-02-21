import Link from "next/link";
import styles from "../styles/Home.module.css";

export async function getStaticProps() {
  const res = await fetch("http://localhost:8000/blogs");
  const data = await res.json();

  return {
    props: { blogs: data },
  };
}

export default function BlogList({ blogs }) {
  return (
    <>
      <h1>All Posts</h1>
      <div className={styles.list}>
        {blogs.map((blog) => (
          <div className={styles.preview} key={blog.id}>
            <Link href={`/blog/${blog.id}`}>
              <a>
                <h2>{blog.title}</h2>
                <p>Written by {blog.author}</p>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
