"use client";

import { useEffect, useState } from "react";
import {
  getComments,
  postComment,
  deleteComment,
  updateComment,
} from "../lib/commentApi";

// Mock data for demonstration
const mockComments = [
  { id: 1, content: "This is a great article!", author: 1 },
  { id: 2, content: "I learned a lot from this post. Thank you!", author: 2 },
  { id: 3, content: "Interesting perspective. I never thought about it that way.", author: 3 },
];

const articleId = 1; // Example fixed articleId

function Comments() {
  const [comments, setComments] = useState(mockComments);
  const [newComment, setNewComment] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  useEffect(() => {
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      article_id: articleId,
      content: newComment,
      password: password,
      author: comments.length + 1, // Assigning a new author id for simplicity
    };

    try {
      const data = await postComment(commentData);
      setComments([...comments, data]);
      setNewComment("");
      setPassword("");
    } catch (error) {
      setError(error.message);
    }
  };

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

    try {
      const data = await updateComment(commentId, updateData);
      setComments(
        comments.map((comment) => (comment.id === commentId ? data : comment))
      );
    } catch (error) {
      setError(error.message);
    }
  };

  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">댓글</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        ></textarea>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="w-full p-2 border border-gray-300 rounded mb-2"
        />
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
              <button
                onClick={() =>
                  handleUpdate(
                    comment.id,
                    prompt("Enter new content:", comment.content)
                  )
                }
                className="text-blue-500 hover:text-blue-700"
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

export default Comments;
