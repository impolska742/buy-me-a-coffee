import React from "react";
import styles from "./Wallet.module.css";

const Wallet = () => {
  return true ? (
    <div className={styles.wallet}>
      <div className={styles.image}></div>
      <div className={styles.balanceBox}>
        <p className={styles.walletBalance}>Balance :-</p>
        <h1 className={styles.walletBalance}>0.0001Eth</h1>
      </div>
    </div>
  ) : (
    <button className={styles.connectWalletButton}>Connect Wallet</button>
  );
};

export default Wallet;
