import { fetchData, getServerSideProps } from "./lib/fetch_db";

export default function Home() {
  const data = getServerSideProps();
  return (
    <main className="py-20">
      {data.then((response) =>
        response.props.data.map((item, index) => {
          const news_link = "/detail/" + item.id;
          return (
            <a href={news_link}>
              <section className="flex items-center justify-between m-2">
                <h1 className=" text-lg">{item.title}</h1>
                <p>{item.company}</p>
              </section>
            </a>
          );
        })
      )}
    </main>
  );
}
