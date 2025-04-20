import { createRoot } from "react-dom/client";
import "./global.css";
import { App } from "./app/App";
import "@fontsource-variable/inter/index.css";

createRoot(document.getElementById("root")!).render(<App />);
