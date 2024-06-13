"use client";

import { useEffect, useState } from "react";

<<<<<<< HEAD
// 목업 데이터
const mockComments = [
  { id: 1, content: "This is the first comment.", password: "1234" },
  { id: 2, content: "This is the second comment.", password: "1234" },
  { id: 3, content: "This is the third comment.", password: "1234" },
];
=======
// Mock data for demonstration
const mockComments = [
  { id: 1, content: "This is a great article!", author: 1 },
  { id: 2, content: "I learned a lot from this post. Thank you!", author: 2 },
  { id: 3, content: "Interesting perspective. I never thought about it that way.", author: 3 },
];

const articleId = 1; // Example fixed articleId
>>>>>>> f13e58f47167cd2571d447aba01fc66c67a1ff28

function Comments() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
<<<<<<< HEAD
    // 목업 데이터를 설정합니다.
    setComments(mockComments);
=======
    async function fetchComments() {
      try {
        const data = await getComments(articleId);
        setComments(data);
      } catch (error) {
        setError(error.message);
      }
    }

    // Uncomment the line below to fetch comments from the API
    // fetchComments();
>>>>>>> f13e58f47167cd2571d447aba01fc66c67a1ff28
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const commentData = {
      id: comments.length + 1,
      content: newComment,
      password: password,
      author: comments.length + 1, // Assigning a new author id for simplicity
    };

    setComments([...comments, commentData]);
    setNewComment("");
    setPassword("");
  };

<<<<<<< HEAD
  const handleDelete = (commentId) => {
    setComments(comments.filter((comment) => comment.id !== commentId));
  };
=======
  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId, password);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      setError(error.message);
    }
  };

  const handleUpdate = async (commentId, newContent) => {
    const updateData = {
      article_id: articleId,
      content: newContent,
      password,
    };
>>>>>>> f13e58f47167cd2571d447aba01fc66c67a1ff28

  const handleUpdate = (commentId, newContent) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, content: newContent } : comment
    );
    setComments(updatedComments);
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
<<<<<<< HEAD
    <div style={styles.commentsContainer}>
      <h1 style={styles.title}>댓글</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
=======
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">댓글</h1>
      <form onSubmit={handleSubmit} className="mb-4">
>>>>>>> f13e58f47167cd2571d447aba01fc66c67a1ff28
        <textarea
          style={styles.textarea}
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        ></textarea>
        <input
          type="password"
          style={styles.input}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
<<<<<<< HEAD
        <button type="submit" style={styles.submitButton}>Submit</button>
      </form>
      <ul style={styles.commentList}>
        {comments.map((comment) => (
          <li key={comment.id} style={styles.commentItem}>
            <p style={styles.commentContent}>{comment.content}</p>
            <div style={styles.commentActions}>
              <button onClick={() => handleDelete(comment.id)} style={styles.deleteButton}>Delete</button>
=======
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </form>
      <ul className="space-y-4">
        {comments.map((comment) => (
          <li
            key={comment.id}
            className="p-4 border border-gray-200 rounded shadow-sm"
          >
            <p className="font-bold">익명{comment.author}</p>
            <p className="mb-2">{comment.content}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(comment.id)}
                className="text-red-500 hover:text-red-700"
              >
                Delete
              </button>
>>>>>>> f13e58f47167cd2571d447aba01fc66c67a1ff28
              <button
                onClick={() =>
                  handleUpdate(
                    comment.id,
                    prompt("Enter new content:", comment.content)
                  )
                }
<<<<<<< HEAD
                style={styles.editButton}
=======
                className="text-blue-500 hover:text-blue-700"
>>>>>>> f13e58f47167cd2571d447aba01fc66c67a1ff28
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
