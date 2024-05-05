import LeftSide from "./layout/leftside";
import RightSide from "./layout/rightside";
import { getServerSideProps } from "./lib/fetch_db";

export default function Detail(props) {
  const data = getServerSideProps(props.params.id);
  return (
    <main className="py-20">
      <LeftSide>
        {data.then((response) =>
          response.props.data.map((item, index) => {
            return (
              <>
                <p>GPT가 요약한 내용입니다!</p>
                <p className="">{item.text}</p>
              </>
            );
          })
        )}
      </LeftSide>
      <RightSide></RightSide>
    </main>
  );
}
