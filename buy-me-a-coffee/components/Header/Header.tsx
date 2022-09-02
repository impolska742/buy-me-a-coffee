import React from "react";
import Image from "next/image";
import Logo from "../../assets/Logo.png";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Image src={Logo} alt="Logo" />
      </div>

      <h1>Buy Me A Coffee</h1>
    </header>
  );
};

export default Header;
