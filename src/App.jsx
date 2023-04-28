import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Home from "./pages/Home/Home";
import CoinPage from "./pages/Coin/CoinPage";
import { Header } from "./components/ui";
import "./styles/global.css";

const Layout = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      {children}
    </div>
  );
};

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route index path="/" element={<Layout><Home /></Layout>} />
      <Route path="/coin/:id" element={<Layout><CoinPage /></Layout>} />
      <Route path="*" element={<Layout><h1>404 Not Found</h1></Layout>} />
    </Routes>
  </BrowserRouter>
);
export default App;
