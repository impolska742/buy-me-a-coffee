import React, { useState } from "react";
import styles from "./Form.module.css";

const Form = ({ rate }: any) => {
  // Component State
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

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
