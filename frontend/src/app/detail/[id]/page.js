import React from "react";
import { getServerSideProps } from "./lib/fetch_db";
import ClientSideDetail from "./components/clientSideDetail";

export default async function Detail({ params }) {
  const { id } = params;
  const summaryData = await getServerSideProps(
    `SELECT * FROM articles_summary WHERE origin_id = ${id}`
  );
  const originData = await getServerSideProps(
    `SELECT * FROM articles_article WHERE id = ${id}`
  );

  return (
    <ClientSideDetail
      summaryData={summaryData.props.data}
      originData={originData.props.data}
    />
  );
}
