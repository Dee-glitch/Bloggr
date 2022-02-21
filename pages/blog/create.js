import { useState } from "react";
import { useRouter } from "next/router";
import styles from "../../styles/Create.module.css";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("Mike Wazowski");
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();
    const blog = { title, body, author };

    fetch("http://localhost:8000/blogs/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(blog),
    }).then(() => {
      router.push("/");
    });
  };
  return (
    <div className={styles.create}>
      <h2>Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog title:</label>
        <input
          type="text"
          required
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label>Blog body:</label>
        <textarea
          required
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <label>Blog author:</label>
        <select value={author} onChange={(e) => setAuthor(e.target.value)}>
          <option value="Mike Wazowski">Mike Wazowski</option>
          <option value="James P. Sullivan">James P. Sullivan</option>
        </select>
        <button>Add Blog</button>
      </form>
    </div>
  );
}
