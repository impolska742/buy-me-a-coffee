import React, { useState } from "react";
import styles from "./Form.module.css";

const MAX_NAME_LENGTH = 30;
const MAX_MESSAGE_LENGTH = 150;

const Form = ({ rate }: any) => {
  // Component State
  const [message, setMessage] = useState<string>("");
  const [name, setName] = useState<string>("");

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
