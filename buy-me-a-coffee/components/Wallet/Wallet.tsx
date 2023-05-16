import React, { useMemo } from "react";
import styles from "./Wallet.module.css";
import { useAccount, useBalance, useDisconnect } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ethers } from "ethers";

const Wallet = () => {
  const { address } = useAccount();
  const { openConnectModal } = useConnectModal();
  const { disconnect } = useDisconnect();

  const { data } = useBalance({
    address: address ? address : undefined,
  });

  const userBalance = useMemo(() => {
    return data?.formatted ? data.formatted : ethers.constants.Zero.toString();
  }, [data]);

  return address ? (
    <div className={styles.wallet}>
      <div className={styles.walletTop}>
        <div className={styles.image}></div>
        <div className={styles.balanceBox}>
          <p className={styles.walletBalance}>Balance :-</p>
          <h1 className={styles.walletBalance}>
            {userBalance ? parseFloat(userBalance).toFixed(5) : "0.00"} Eth
          </h1>
        </div>
      </div>
      <button
        onClick={async () => {
          disconnect();
        }}
      >
        Disconnect Wallet
      </button>
    </div>
  ) : (
    <button
      onClick={() => openConnectModal?.()}
      className={styles.connectWalletButton}
    >
      Connect Wallet
    </button>
  );
};

export default Wallet;
