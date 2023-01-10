import React from "react";
import { Outlet } from "react-router-dom";
import { Tabs } from "../Tabs/Tabs";
import { useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchIataCodes } from "../../store/iataCodes";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";

export const MainWindow = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    dispatch(fetchIataCodes());
  }, []);

  return (
    <div className={styles[stylesNames.root]}>
      <Tabs />
      <Outlet></Outlet>
    </div>
  );
};
