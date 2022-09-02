import React, { useState } from "react";
import styles from "./Form.module.css";

const ETH_VALUE = 0.0001;

const Form = () => {
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
      <button>Send Message for {ETH_VALUE} ETH</button>
    </form>
  );
};

export default Form;
