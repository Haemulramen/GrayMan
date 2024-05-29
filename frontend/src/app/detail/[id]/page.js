import LeftSide from "./layout/leftside";
import RightSide from "./layout/rightside";
import { getServerSideProps } from "./lib/fetch_db";
import Correction from "./layout/correction";
import App from "./lib/chat";

export default function Detail(props) {
  const data = getServerSideProps(props.params.id);

  return (
    <main className="py-20">
      <LeftSide>
        {data.then((response) =>
          response.props.data.map((item, index) => {
            const correction = item.correction;
            let splited=correction.split(/\s*(?=\d+\.\s)/)
            return (
              <>
                <h1 className=" text-2xl">GPT는 아래와 같이 요약했어요</h1>
                <p className=" py-4">{item.text}</p>
                <h2 className="text-2xl">
                  GPT는 아래와 같은.
                </h2>                  
                  <Correction correction={splited}></Correction>
              </>
            );
          })
        )}
      </LeftSide>
      <RightSide>
      </RightSide>
      <div className="chatting">
        <App></App>
      </div>
    </main>
  );
}
