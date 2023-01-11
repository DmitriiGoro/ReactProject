import React from "react";
import styles from "./styles.module.css";
import { stylesNames } from "./stylesNames";
import { NavLink } from "react-router-dom";
import classnames from "classnames";

export const Header = ({ children, className }) => {
  return (
    <header className={styles[stylesNames.header]}>
      <div className={className}>
        <div className={styles[stylesNames.headerInner]}>
          <div className={styles[stylesNames.headerLinkContainer]}>
            {" "}
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? classnames(
                      styles[stylesNames.headerActiveLink],
                      styles[stylesNames.headerLink]
                    )
                  : styles[stylesNames.headerLink]
              }
              to="/"
            >
              Main
            </NavLink>
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? classnames(
                      styles[stylesNames.headerActiveLink],
                      styles[stylesNames.headerLink]
                    )
                  : styles[stylesNames.headerLink]
              }
              to="cart"
            >
              Chozen flights
            </NavLink>
          </div>
          {children}
        </div>
      </div>
    </header>
  );
};
