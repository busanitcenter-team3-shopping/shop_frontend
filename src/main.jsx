import "./index.css";
import App from "./App.jsx";
import { ContextProvider } from "./api/ContextApi.jsx";
import { createRoot } from "react-dom/client";

createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
