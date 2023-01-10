import React from "react";
import { Tab } from "../Tab/Tab";
import { tabNames } from "../../constants/tabNames";
import { useEffect } from "react";

export const Tabs = () => {
  // const tabNamesArray = Object.values(tabNames);

  console.log("tabs");
  // must find out the reason of tab rerendering
  return (
    tabNames?.length > 0 &&
    tabNames.map((name, index) => <Tab key={index} name={name}></Tab>)
  );
};
