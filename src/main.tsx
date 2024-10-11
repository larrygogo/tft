import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import Routes from "./routes";
import "./index.css";
import Layout from "@/components/layouts";
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Layout>
        <Routes />
        <Toaster />
      </Layout>
    </BrowserRouter>
  </StrictMode>
);
