import { get, post, patch, del } from "./fetch_api.js";

export async function getComments(articleId) {
  return get(`news/${articleId}/`);
}

export async function postComment(articleId, data) {
  return post(`comments/${articleId}`, data);
}

export async function deleteComment(commentId, data) {
  return del(`comments/${commentId}/`, data);
}

export async function updateComment(commentId, data) {
  return patch(`comments/${commentId}/`, data);
}
