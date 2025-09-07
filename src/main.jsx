import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AdminProvider } from "./store/AdminStore"; // ✅ import provider

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AdminProvider>
      <App />
    </AdminProvider>
  </React.StrictMode>
);