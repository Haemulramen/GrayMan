import { getServerSideProps } from "./lib/fetch_db";

export default function Home() {
  const data = getServerSideProps();
  return (
    <main className="py-20 px-2 text-center">
      <h1 className=" text-4xl">최근 10개의 뉴스를 가져왔어요</h1>
      {data.then((response) =>
        response.props.data.map((item, index) => {
          const news_link = "/detail/" + item.id;
          if (index >= 10) return;
          return (
            <a href={news_link}>
              <section className="flex items-center justify-between m-2 border p-3 hover:bg-slate-100 hover:text-black rounded">
                <h1 className=" text-lg">{item.title}</h1>
                <p>{item.company}</p>
              </section>
            </a>
          );
        })
      )}
      <section>
        <button className="border px-4 py-2 hover:bg-slate-100 hover:text-black rounded" >
          Feedback
        </button>

      </section>
    </main>
  );
}
