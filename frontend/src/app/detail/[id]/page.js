import React from "react";
import { getServerSideProps } from "./lib/fetch_db";
import Correction from "./layout/correction";
import App from "./lib/chat";
import Statistics from "./lib/statistics";
import Comments from "./layout/comments";

export default function Detail(props) {
  const { id } = props.params;
  const summaryData = getServerSideProps(
    `SELECT * FROM articles_summary WHERE origin_id = ${id}`
  );
  const originData = getServerSideProps(
    `SELECT * FROM articles_article WHERE id = ${id}`
  );

  return (
    <main className="grid grid-cols-12 gap-4 py-20 bg-white">
      <div className="col-span-8 grid grid-cols-2 gap-4">
        <div className="col-span-1 p-4 text-left">
          <div>
            {summaryData.then((response) =>
              response.props.data.map((item, index) => {
                const correction = item.correction;
                let splited = correction.split(/\s*(?=\d+\.\s)/);
                return (
                  <div key={index} className="mb-6 text-left">
                    <h1 className="text-2xl mb-4 text-left"> 객관화된 기사에요 </h1>
                    <p className="mb-4 text-left">{item.text}</p>
                    <h2 className="text-2xl mb-4 text-left">GPT는 아래와 같은 이유로 수정했어요.</h2>
                    <Correction correction={splited}></Correction>
                  </div>
                );
              })
            )}
          </div>
        </div>
        <div className="col-span-1 p-4 text-left">
          <div>
            {originData.then((response) =>
              response.props.data.map((item, index) => {
                return (
                  <div key={index} className="mb-6 text-left">
                    <h2 className="text-2xl mb-4 text-left">원본 링크</h2>
                    <p className="mb-4 text-left text-blue-600">{item.link}</p>
                    <h2 className="text-2xl mb-4 text-left">원본 기사</h2>
                    <p className="py-4 text-left">{item.text}</p>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
      <div className="col-span-4 p-4">
        <Comments />
      </div>
      <div className="col-span-12 grid gap-4 py-20">
        <App />
        <Statistics />
      </div>
    </main>
  );
}
