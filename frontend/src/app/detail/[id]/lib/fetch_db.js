// lib/db.js (또는 다른 곳에서)
const sqlite3 = require("sqlite3").verbose();

export async function fetchData(id, column_name) {
  const db = new sqlite3.Database("../db.sqlite3");
  const query = `SELECT * FROM ${column_name} WHERE origin_id = ${id}`;
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

export async function getServerSideProps(id, column_name) {
  const data = await fetchData(id, column_name);
  return {
    props: {
      data,
    },
  };
}
