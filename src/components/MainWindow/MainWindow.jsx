import React from "react";
import { Outlet } from "react-router-dom";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIataCodes } from "../../store/iataCodes";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { tabNames } from "../../constants/tabNames";
import { Tab } from "../Tab/Tab";

export const MainWindow = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchIataCodes());
  }, []);

  return (
    <div className={styles[stylesNames.mainWindow]}>
      {tabNames?.length > 0 &&
        tabNames.map((name, index) => <Tab key={index} name={name}></Tab>)}
      <Outlet></Outlet>
    </div>
  );
};
