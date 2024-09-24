import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./index.css";
import Layout from "@/components/layouts";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes />
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
