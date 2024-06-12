"use client";

import { useEffect, useState } from "react";
import {
  getComments,
  postComment,
  deleteComment,
  updateComment,
} from "../lib/commentApi";

const articleId = 1; // 예시로 고정된 articleId를 사용합니다.

function Comments() {
  const [comments, setComments] = useState([]);
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

    fetchComments();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const commentData = {
      article_id: articleId,
      content: newComment,
      password: password,
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

  //TODO: 해당 함수 구현하기
  const handleDelete = async (commentId) => {
    try {
      await deleteComment(commentId, password);
      setComments(comments.filter((comment) => comment.id !== commentId));
    } catch (error) {
      setError(error.message);
    }
  };
  //TODO: 해당 함수 구현하기
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

  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Comments</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment"
          required
        ></textarea>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Submit</button>
      </form>
      <ul>
        {comments.map((comment) => (
          <li key={comment.id}>
            <p>{comment.content}</p>
            <button onClick={() => handleDelete(comment.id)}>Delete</button>
            <button
              onClick={() =>
                handleUpdate(
                  comment.id,
                  prompt("Enter new content:", comment.content)
                )
              }
            >
              Edit
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Comments;
