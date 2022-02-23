import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Reserves from "./router/Reserves";
import { render } from "react-dom";

import { BrowserRouter, Routes, Route } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      {/* <React.StrictMode> */}
      <Route path="/" element={<App />} />
      <Route path="reserves" element={<Reserves />} />
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
      {/*   </React.StrictMode> */}
    </Routes>
  </BrowserRouter>,
  document.getElementById("root")
);
