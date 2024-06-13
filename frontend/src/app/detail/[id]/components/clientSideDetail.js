"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState, useEffect } from "react";
import Correction from "../layout/correction";
import App from "../lib/chat";
import Statistics from "../lib/statistics";
import Comments from "../layout/comments";

export default function ClientSideDetail({ summaryData, originData }) {
  const [positiveCount, setPositiveCount] = useState(0);
  let origin_count;
  let tempString;

  return (
    <main className="grid grid-cols-12 gap-4 py-20 bg-white">
      <div className="col-span-8 p-4 text-left">
        <div>
          {summaryData.map((item, index) => {
            const correction = item.correction;
            const lines = correction
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line);
            return (
              <div key={index} className="mb-6 text-left">
                <h1 className="text-2xl mb-4 text-left">객관화된 기사에요</h1>
                <p className="mb-4 text-left">{item.text}</p>
                <h2 className="text-2xl mb-4 text-left">
                  GPT는 아래와 같은 이유로 수정했어요.
                </h2>
                <Correction lines={lines} onCountUpdate={setPositiveCount} />
              </div>
            );
          })}
        </div>
        {originData.map((item, index) => {
          origin_count = item.text.split(".").length;
          return (
            <React.Fragment key={index}>
              <div className="mb-6 text-left">
                <h2 className="text-2xl mb-4 text-left">원본 링크</h2>
                <p className="mb-4 text-left text-blue-600">{item.link}</p>
                <h2 className="text-2xl mb-4 text-left">원본 기사</h2>
                <p className="py-4 text-left">{item.text}</p>
                {/* <HighlightStrings string1={item.text} string2={tempString} /> */}
              </div>
              <div className="grid gap-4 py-20">
                <App />
                <Statistics
                  origin_count={origin_count}
                  positive_count={positiveCount}
                />
              </div>
            </React.Fragment>
          );
        })}
      </div>
      <div className="col-span-4 p-4 text-left">
        <Comments />
      </div>
    </main>
  );
}
