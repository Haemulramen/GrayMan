

import React from "react";
import { getServerSideProps } from "./lib/fetch_db";
import Correction from "./layout/correction";
import App from "./lib/chat";
import Statistics from "./lib/statistics";
import Comments from "./layout/comments";



function highlightMatches(text1, text2) {
  let highlightedText1 = "";
  let highlightedText2 = "";

  const matchPattern = (str1, str2) => {
    let matches = [];
    for (let i = 0; i < str1.length; i++) {
      for (let j = i + 1; j <= str1.length; j++) {
        let substring = str1.slice(i, j);
        if (str2.includes(substring) && substring.length > 1) {
          matches.push(substring);
        }
      }
    }
    return matches.sort((a, b) => b.length - a.length)[0];
  };

  let longestMatch = matchPattern(text1, text2);

  if (longestMatch) {
    const regex = new RegExp(`(${longestMatch})`, "gi");
    highlightedText1 = text1.replace(regex, "<mark>$1</mark>");
    highlightedText2 = text2.replace(regex, "<mark>$1</mark>");
  } else {
    highlightedText1 = text1;
    highlightedText2 = text2;
  }

  return [highlightedText1, highlightedText2];
}

function HighlightStrings({ string1, string2 }) {
  const [highlightedString1, highlightedString2] = highlightMatches(string1, string2);

  return (
    <div>
      <h3>원본기사 :</h3>
      <p dangerouslySetInnerHTML={{ __html: highlightedString1 }}></p>
      <h3>바뀐 부분 :</h3>
      <p dangerouslySetInnerHTML={{ __html: highlightedString2 }}></p>
    </div>
  );
}





export default function Detail(props) {
  const { id } = props.params;
  const summaryData = getServerSideProps(
    `SELECT * FROM articles_summary WHERE origin_id = ${id}`
  );
  const originData = getServerSideProps(
    `SELECT * FROM articles_article WHERE id = ${id}`
  );
  String
  let tempString;


  return (
    <main className="grid grid-cols-12 gap-4 py-20 bg-white">
      <div className="col-span-8 p-4 text-left">
        <div>
          {summaryData.then((response) =>
            response.props.data.map((item, index) => {
              const correction = item.correction;
              let splited = correction.split(/\s*(?=\d+\.\s)/);
              tempString = item.text;
              return (
                <div key={index} className="mb-6 text-left">
                  <h1 className="text-2xl mb-4 text-left"> 객관화된 기사에요 </h1>
                  <p className="mb-4 text-left">{item.text}</p>
                  <h2 className="text-2xl mb-4 text-left">
                    GPT는 아래와 같은 이유로 수정했어요.
                  </h2>
                  <Correction correction={splited}></Correction>
                </div>
              );
            })
          )}
        </div>
        <div>
          {originData.then((response) =>
            response.props.data.map((item, index) => {
              return (
                <div key={index} className="mb-6 text-left">
                  <h2 className="text-2xl mb-4 text-left">원본 링크</h2>
                  <p className="mb-4 text-left text-blue-600">{item.link}</p>
                  <h2 className="text-2xl mb-4 text-left">원본 기사</h2>
                  <p className="py-4 text-left">{item.text}</p>
                  <HighlightStrings string1={item.text} string2={tempString} />
                </div>
              );
            })
          )}
        </div>
        <div className="grid gap-4 py-20">
          <App />
          <Statistics />
        </div>
      </div>
      <div className="col-span-4 p-4 text-left">
        <Comments />
      </div>
    </main>
  );
}
