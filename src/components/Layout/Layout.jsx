import React, { useContext, useRef } from "react";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { ChangeThemeBlock } from "../ChangeThemeBlock/ChangeThemeBlock";

export const Layout = ({ children }) => {
  const ref = useRef();

  return (
    <div ref={ref} className={styles[stylesNames.page]}>
      <Header className={styles[stylesNames.container]}>
        {" "}
        <ChangeThemeBlock forwardedRef={ref}></ChangeThemeBlock>
      </Header>
      <div className={styles[stylesNames.main]}>
        <div className={styles[stylesNames.container]}>{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};
