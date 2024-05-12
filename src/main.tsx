import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import PageLayout from "./components/layout/PageLayout/index.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PageLayout>
      <App />
    </PageLayout>
  </React.StrictMode>
);
