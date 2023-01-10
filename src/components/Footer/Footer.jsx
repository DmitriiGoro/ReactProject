import React from "react";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const Footer = () => {
  return (
    <footer className={styles[stylesNames.footer]}>
      <div className={styles[stylesNames.footerTextBlock]}>
        {" "}
        This project is a opportunity to check any flight or aircompany you`re
        most curious about.
      </div>
    </footer>
  );
};
