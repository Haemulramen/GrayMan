"use client"; // 클라이언트 컴포넌트임을 명시

import React, { useState, useEffect } from "react";
import Correction from "../layout/correction";
import App from "../lib/chat";
import Statistics from "../lib/statistics";
import Comments from "../layout/comments";
import LeftSide from "../layout/leftside";

export default function ClientSideDetail({ summaryData, originData }) {
  const [positiveCount, setPositiveCount] = useState(0);
  const [currentUrl, setCurrentUrl] = useState("");
  const [id, setId] = useState(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 클라이언트 사이드에서만 실행
      const url = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
      setCurrentUrl(url);

      const segments = window.location.pathname.split("/");
      const lastSegment = segments.pop() || segments.pop() || segments.pop(); // handle potential trailing slash
      setId(parseInt(lastSegment));
    }
  }, []);
  let origin_count;
  let tempString;

  return (
    <main className="grid grid-cols-12 gap-4 py-20 bg-white">
      <LeftSide className=" col-span-5">
        <div>
          {summaryData.map((item, index) => {
            const correction = item.correction;
            const lines = correction
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line);
            return (
              <div key={index} className="mb-6 text-left">
                <h1 className="text-3xl mb-4 text-left font-semibold">
                  객관화된 기사에요
                </h1>
                <p className="mb-4 text-left  pb-3 border-b-2">{item.text}</p>
                <h2 className="text-2xl mb-4 text-left font-semibold">
                  GPT는 아래와 같은 이유로 수정했어요
                </h2>
                <Correction lines={lines} onCountUpdate={setPositiveCount} />
              </div>
            );
          })}
        </div>
      </LeftSide>
      <LeftSide className="p-5 text-left col-span-4">
        {originData.map((item, index) => {
          origin_count = item.text.split(".").length;
          return (
            <React.Fragment key={index}>
              <Statistics
                origin_count={origin_count}
                positive_count={positiveCount}
              />
              <div className="mb-6 text-left">
                <h2 className="text-2xl mb-4 text-left font-semibold">
                  수정 전 내용이에요
                </h2>
                <p className="mb-4 text-left text-blue-600">
                  <a href={item.link}>원본 기사로 이동하기</a>
                </p>
                <p className="py-4 text-left">{item.text}</p>
                {/* <HighlightStrings string1={item.text} string2={tempString} /> */}
              </div>
              <div className="grid gap-4 py-20">
                <App />
              </div>
            </React.Fragment>
          );
        })}
      </LeftSide>
      <div className=" p-4 text-left col-span-3">
        {id !== null && <Comments articleId={id} />}
      </div>
    </main>
  );
}
