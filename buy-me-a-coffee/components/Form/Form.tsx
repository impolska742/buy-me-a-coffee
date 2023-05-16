import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useAccount, useNetwork, useWalletClient } from "wagmi";
import axios from "axios";
import { buyCoffee } from "../../contracts";
import { toast } from "react-toastify";

const ETH_TO_USD_URL =
  "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,MATIC&tsyms=USD";

const MAX_NAME_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 150;

const Form = ({
  refetch,
  setRefetch,
}: {
  setRefetch: Dispatch<SetStateAction<boolean>>;
  refetch: boolean;
}) => {
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [tip, setTip] = useState<string>("");

  const { chain } = useNetwork();
  const { isConnected } = useAccount();

  const [rate, setRate] = useState({
    eth: 0,
    matic: 0,
  });

  const init = async () => {
    const { data } = await axios.get(ETH_TO_USD_URL);
    setRate({
      eth: data.ETH.USD,
      matic: data.MATIC.USD,
    });
  };

  useEffect(() => {
    init();
    return () => {
      setRate({
        eth: 0,
        matic: 0,
      });
    };
  }, [chain, isConnected]);

  const handleSubmit = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): Promise<void> => {
    e.preventDefault();

    if (!name || !message || !tip) {
      toast.error("Name, message and tip cannot be empty");
      return;
    }

    await buyCoffee(
      name,
      message,
      parseFloat((parseFloat(tip) / rate.eth).toString()).toFixed(5),
      setName,
      setMessage
    );
    setRefetch(!refetch);
  };

  return (
    <form className={styles.form}>
      <div className={styles.formInput}>
        <label className={styles.formLabel}>
          <span>Name</span>
          <span>
            {name.length}/{MAX_NAME_LENGTH}
          </span>
        </label>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => {
            if (e.target.value.length <= MAX_NAME_LENGTH)
              setName(e.target.value);
          }}
          type="text"
          placeholder="Your Name"
        />
      </div>
      <div className={styles.formInput}>
        <label className={styles.formLabel}>
          <span>Message</span>
          <span>
            {message.length}/{MAX_MESSAGE_LENGTH}
          </span>
        </label>
        <textarea
          rows={10}
          className={styles.input}
          value={message}
          onChange={(e) => {
            if (e.target.value.length <= MAX_MESSAGE_LENGTH)
              setMessage(e.target.value);
          }}
          placeholder="Your Message"
        />
      </div>

      <button
        onClick={async (e) => await handleSubmit(e)}
        className={styles.buyCoffeeButton}
      >
        Send Message
      </button>

      <h3>
        <input
          style={{ maxWidth: "100px" }}
          min="0"
          type="number"
          value={tip}
          onChange={(e) => setTip(e.target.value)}
        />{" "}
        $ ~{" "}
        {parseFloat(tip) / rate.eth
          ? parseFloat((parseFloat(tip) / rate.eth).toString()).toFixed(5)
          : ""}{" "}
        ETH
      </h3>
    </form>
  );
};
export default Form;
