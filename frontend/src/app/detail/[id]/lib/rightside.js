// RightSide.js
export default function RightSide({ originalLink }) {
  return (
    <div className="p-4">
      <h2 className="text-xl mb-4">Original Article</h2>
      <a href={originalLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
        Read the full article
      </a>
    </div>
  );
}
