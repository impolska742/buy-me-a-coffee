import { useEffect, useMemo } from "react";
import { contractABI, contractAddress } from "../../contracts";
import styles from "./Memos.module.css";
import { useContractRead } from "wagmi";
import Memo from "./MemoType";
import moment from "moment";
import { generateRandomColor } from "../../utils/generateRandomColor";

const Memos = ({ refetch }: { refetch: boolean }) => {
  const {
    data: memoData,
    isLoading,
    refetch: refetchMemos,
  } = useContractRead({
    address: contractAddress,
    abi: contractABI,
    functionName: "getMemos",
  });

  const memos = useMemo(() => (memoData ? memoData : []), [memoData]) as Memo[];

  useEffect(() => {
    refetchMemos();
  }, [refetch, refetchMemos]);

  return (
    <div className={styles.memos}>
      <h1>Previous Coffees</h1>
      {!isLoading ? (
        memos &&
        memos.length > 0 &&
        [...memos].reverse().map((memo: Memo, idx: number) => {
          let timeStamp = parseInt(memo.timestamp.toString());
          const myDate = new Date(0);
          myDate.setUTCSeconds(timeStamp);

          return (
            <div key={idx} className={styles.memo}>
              <span
                style={{
                  backgroundColor: generateRandomColor(),
                }}
                className={styles.profile}
              />
              <div className={styles.message}>
                <p style={{ fontWeight: "bold" }}>{memo.name}</p>
                <p>{memo.message}</p>
              </div>
              <div className={styles.time}>
                {moment(myDate.toString()).format("ddd, h:mm A")}
              </div>
            </div>
          );
        })
      ) : (
        <h1>Loading ...</h1>
      )}
    </div>
  );
};

export default Memos;
