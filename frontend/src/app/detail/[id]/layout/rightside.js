// import React, { useState, useEffect } from 'react';

// export default function Comments({ initialComments }) {
//   const [comments, setComments] = useState(initialComments || []);
//   const [newComment, setNewComment] = useState("");

//   useEffect(() => {
//     // Fetch initial comments if not provided
//     if (!initialComments) {
//       fetch('/api/comments')
//         .then(response => response.json())
//         .then(data => setComments(data));
//     }
//   }, [initialComments]);

//   const handleCommentChange = (e) => {
//     setNewComment(e.target.value);
//   };

//   const handleCommentSubmit = async (e) => {
//     e.preventDefault();
//     if (!newComment.trim()) return;

//     const comment = {
//       id: Date.now(),
//       text: newComment.trim(),
//       createdAt: new Date().toISOString(),
//     };

//     // Here you would typically send a request to your backend to save the comment
//     const response = await fetch('/api/comments', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(comment),
//     });

//     if (response.ok) {
//       setComments([comment, ...comments]);
//       setNewComment("");
//     }
//   };

//   return (
//     <div className="comments-section">
//       <h2 className="text-2xl mb-4">Comments</h2>
//       <form onSubmit={handleCommentSubmit} className="mb-4">
//         <textarea
//           className="w-full p-2 border rounded mb-2"
//           rows="4"
//           value={newComment}
//           onChange={handleCommentChange}
//           placeholder="Write a comment..."
//         ></textarea>
//         <button type="submit" className="border px-4 py-2 bg-blue-600 text-white rounded">
//           Submit
//         </button>
//       </form>
//       <div className="comments-list">
//         {comments.map((comment) => (
//           <div key={comment.id} className="mb-4 p-2 border rounded">
//             <p>{comment.text}</p>
//             <span className="text-gray-500 text-sm">{new Date(comment.createdAt).toLocaleString()}</span>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
export default function RightSide({ children }) {
  return <div className=" col-span-4 p-4 text-left">{children}</div>;
}
