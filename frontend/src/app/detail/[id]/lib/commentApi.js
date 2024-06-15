import { get, post, patch, del } from "./fetch_api.js";

export async function getComments(articleId) {
  return get(`news/${articleId}/`);
}

export async function postComment(data) {
  return post(`comments/`, data);
}

export async function deleteComment(commentId, password) {
  return del(`comments/${commentId}/`, {
    "Content-Type": "application/json",
    body: JSON.stringify({ password }),
  });
}

export async function updateComment(commentId, data) {
  return patch(`comments/${commentId}/`, data);
}