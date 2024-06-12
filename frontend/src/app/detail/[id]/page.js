import React from "react";
import { getServerSideProps, getServerSidePropsArticle } from "./lib/fetch_db";
import Correction from "./layout/correction";
import App from "./lib/chat";
import Statistics from "./lib/statistics";

export default function Detail(props) {
  const summaryData = getServerSideProps(props.params.id, "articles_summary");
  const originData = getServerSideProps(props.params.id, "articles_article");

  return (
    <main className="grid grid-cols-12 gap-4 py-20 bg-white">

      <div className="col-span-4 p-4 text-left">
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
      <div className="col-span-4 p-4 text-left">
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
      <div className="grid gap-4 py-20 col-span-12">
        <App />
        <Statistics />
      </div>
    </main>
  );
}
