import React from "react";
import styles from "./Wallet.module.css";
import { formatEther } from "@ethersproject/units";
import { useEthers, useEtherBalance } from "@usedapp/core";

const Wallet = () => {
  const { activateBrowserWallet, deactivate, account } = useEthers();
  const userBalance = useEtherBalance(account);

  return account ? (
    <div className={styles.wallet}>
      <div className={styles.walletTop}>
        <div className={styles.image}></div>
        <div className={styles.balanceBox}>
          <p className={styles.walletBalance}>Balance :-</p>
          <h1 className={styles.walletBalance}>
            {userBalance ? parseFloat(formatEther(userBalance)).toFixed(5) : ""}
            Eth
          </h1>
        </div>
      </div>
      <button onClick={() => deactivate()}>Disconnect Wallet</button>
    </div>
  ) : (
    <button
      onClick={() => activateBrowserWallet()}
      className={styles.connectWalletButton}
    >
      Connect Wallet
    </button>
  );
};

export default Wallet;
