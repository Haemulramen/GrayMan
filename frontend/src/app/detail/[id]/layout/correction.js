import React, { useEffect } from "react";

export default function Correction({ lines, onCountUpdate }) {
  const result = [];
  let currentItem = {};

  lines.forEach((line) => {
    if (line.match(/^\d+\./)) {
      if (Object.keys(currentItem).length > 0) {
        result.push(currentItem);
      }
      const idMatch = line.match(/^\d+/);
      currentItem = { id: idMatch[0] };
      line = line.replace(/^\d+\.\s*/, "");
    }

    if (line.startsWith("원본 뉴스의 문장:")) {
      currentItem.original = line.replace("원본 뉴스의 문장:", "").trim();
    } else if (line.startsWith("수정된 부분:")) {
      currentItem.modified = line.replace("수정된 부분:", "").trim();
    } else if (line.startsWith("수정된 이유:")) {
      currentItem.reason = line.replace("수정된 이유:", "").trim();
    }
  });

  if (Object.keys(currentItem).length > 0) {
    result.push(currentItem);
  }

  useEffect(() => {
    if (onCountUpdate) {
      onCountUpdate(result.length);
    }
  }, [result.length, onCountUpdate]);

  return (
    <ul className="bg-slate-100 p-8 rounded-lg">
      {result.map((item) => (
        <li key={item.id} className="p-4 bg-white mb-3 rounded-lg">
          <h2 className="text-2xl">{item.id}</h2>
          <p>
            <strong>원본 문장:</strong> {item.original}
          </p>
          <p>
            <strong>수정 문장:</strong> {item.modified}
          </p>
          <p>
            <strong>수정된 이유:</strong> {item.reason}
          </p>
        </li>
      ))}
    </ul>
  );
}
