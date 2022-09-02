import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import axios from "axios";
import { useEthers } from "@usedapp/core";

const ETH_TO_USD_URL =
  "https://min-api.cryptocompare.com/data/pricemulti?fsyms=ETH,MATIC&tsyms=USD";

const Form = () => {
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");
  const { account: userWalletAddress, active, chainId, library } = useEthers();

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
  }, [chainId, active]);

  return (
    <form className={styles.form}>
      <div className={styles.formInput}>
        <label className={styles.formLabel}>Name</label>
        <input
          className={styles.input}
          value={name}
          onChange={(e) => setName(e.target.value)}
          type="text"
          placeholder="Your Name"
        />
      </div>
      <div className={styles.formInput}>
        <label className={styles.formLabel}>Message</label>
        <textarea
          rows={10}
          className={styles.input}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Your Message"
        />
      </div>
      <button className={styles.buyCoffeeButton}>Send Message</button>
      <h3>
        5$ ~{" "}
        {5 / rate.eth ? parseFloat((5 / rate.eth).toString()).toFixed(5) : ""}{" "}
        ETH
      </h3>
    </form>
  );
};
export default Form;
