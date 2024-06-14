// lib/db.js (또는 다른 곳에서)
const sqlite3 = require("sqlite3").verbose();

export async function fetchData(query) {
  const db = new sqlite3.Database("../db.sqlite3");
  console.log(query);
  const dataPromise = await new Promise((resolve, reject) => {
    db.all(query, (err, rows) => {
      if (err) reject(err);
      resolve(rows);
    });
  });
  db.close();
  const data = await dataPromise;

  return data;
}

export async function getServerSideProps(query) {
  const data = await fetchData(query);
  return {
    props: {
      data,
    },
  };
}
