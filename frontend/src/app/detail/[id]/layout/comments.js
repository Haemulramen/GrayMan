"use client";

import { useEffect, useState } from "react";

// 목업 데이터
const mockComments = [
  { id: 1, content: "This is the first comment.", password: "1234" },
  { id: 2, content: "This is the second comment.", password: "1234" },
  { id: 3, content: "This is the third comment.", password: "1234" },
];

function Comments() {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
    // 목업 데이터를 설정합니다.
    setComments(mockComments);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      id: comments.length + 1,
      content: newComment,
      password: password,
    };

    setComments([...comments, commentData]);
    setNewComment("");
    setPassword("");
  };

  const handleDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };

  const handleUpdate = (commentId, newContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
  };

  if (error) return <p>Error: {error}</p>;

  return (
    <div style={styles.commentsContainer}>
      <h1 style={styles.title}>댓글</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <textarea
          style={styles.textarea}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
          required
        ></textarea>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
      <ul style={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} style={styles.commentItem}>
            <p style={styles.commentContent}>{comment.content}</p>
            <div style={styles.commentActions}>
              <button onClick={() => handleDelete(comment.id)} style={styles.deleteButton}>Delete</button>
              <button
                onClick={() =>
                  handleUpdate(
                    comment.id,
                    prompt("Enter new content:", comment.content)
                  )
                }
                style={styles.editButton}
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

const styles = {
  commentsContainer: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    textAlign: 'center',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '20px',
  },
  textarea: {
    resize: 'none',
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    marginBottom: '10px',
    border: '1px solid #ccc',
    borderRadius: '4px',
  },
  submitButton: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    alignSelf: 'flex-end',
  },
  submitButtonHover: {
    backgroundColor: '#0056b3',
  },
  commentList: {
    listStyle: 'none',
    padding: '0',
  },
  commentItem: {
    padding: '10px',
    borderBottom: '1px solid #ccc',
  },
  commentContent: {
    margin: '0 0 10px 0',
  },
  commentActions: {
    display: 'flex',
    gap: '10px',
  },
  deleteButton: {
    padding: '5px 8px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#dc3545',
    color: 'white',
  },
  deleteButtonHover: {
    backgroundColor: '#c82333',
  },
  editButton: {
    padding: '5px 8px',
    fontSize: '12px',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    backgroundColor: '#ffc107',
    color: 'white',
  },
  editButtonHover: {
    backgroundColor: '#e0a800',
  },
};

export default Comments;
