import React, { useContext } from "react";
import { ThemeContext } from "../ThemeContext/ThemeContext";
import { Header } from "../Header/Header";
import { Footer } from "../Footer/Footer";
import { MainWindow } from "../MainWindow/MainWindow";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const Layout = ({ children }) => {
  const { theme, setTheme } = useContext(ThemeContext);

  return (
    <div className={styles[stylesNames.page]}>
      <Header className={styles[stylesNames.container]}>
        {" "}
        <button
          className={styles[stylesNames.button]}
          onClick={() => setTheme(theme === "default" ? "dark" : "default")}
        >
          Change theme
        </button>
      </Header>
      <div>
        <div className={styles[stylesNames.container]}>{children}</div>
      </div>
      <Footer></Footer>
    </div>
  );
};
