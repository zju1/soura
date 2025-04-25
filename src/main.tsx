import { createRoot } from "react-dom/client";
import "./global.css";
import { App } from "./app/App";
import "@fontsource-variable/inter/index.css";
import "./i18n";

createRoot(document.getElementById("root")!).render(<App />);
