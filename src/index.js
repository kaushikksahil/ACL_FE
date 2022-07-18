import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
// import reportWebVitals from "./reportWebVitals";
import "./css/style.css";
import { UserContxtProvider } from "./context/provider";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <UserContxtProvider>
    <App />
  </UserContxtProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
