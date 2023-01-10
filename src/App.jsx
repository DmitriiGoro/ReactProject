import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { ThemeContextProvider } from "./components/ThemeContext/ThemeContextProvider";
import { store } from "./store";
import { Layout } from "./components/Layout/Layout";
import { MainWindow } from "./components/MainWindow/MainWindow";
import { Flights } from "./components/Flights/Flights";
import { FlightsResultPage } from "../src/pages/FlightsResultPage/FlightsResultPage";
import { Airlines } from "./components/Airlines/Airlines";
import { AirlinesResultPage } from "./components/AirlinesResultPage/AirlinesResultPage";
import { CartPage } from "./pages/CartPage/CartPage";

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <ThemeContextProvider>
          <Layout>
            <Routes>
              <Route path="/" element={<MainWindow />}>
                <Route path="/airlines" element={<Airlines />}>
                  <Route
                    path=":airlineInput"
                    element={<AirlinesResultPage />}
                  ></Route>
                </Route>
                <Route path="/flights" element={<Flights />}>
                  <Route
                    path=":requestString"
                    element={<FlightsResultPage />}
                  ></Route>
                </Route>
              </Route>
              <Route path="cart" element={<CartPage />} />
            </Routes>
          </Layout>
        </ThemeContextProvider>
      </Provider>
    </BrowserRouter>
  );
};
