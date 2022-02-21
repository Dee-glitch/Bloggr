import { useRouter } from "next/router";
import styles from "../../styles/Details.module.css";

export async function getStaticPaths() {
  const res = await fetch("http://localhost:8000/blogs");
  const data = await res.json();

  const paths = data.map((blog) => {
    return {
      params: { id: blog.id.toString() },
    };
  });

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  const id = context.params.id;
  const res = await fetch(`http://localhost:8000/blogs/${id}`);
  const data = await res.json();

  return {
    props: { blog: data },
  };
}

export default function BlogDetails({ blog }) {
  const router = useRouter();

  const handleDelete = () => {
    fetch(`http://localhost:8000/blogs/${blog.id}`, {
      method: "DELETE",
    }).then(() => {
      router.push("/");
    });
  };

  return (
    <div className={styles.details}>
      {blog && (
        <article>
          <h2>{blog.title}</h2>
          <p>Written by {blog.author}</p>
          <div>{blog.body}</div>
          <button onClick={handleDelete}>delete</button>
        </article>
      )}
    </div>
  );
}
