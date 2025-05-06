import { createRoot } from "react-dom/client";
import { App } from "./app/App";
import "@fontsource-variable/inter/index.css";
import "@ant-design/v5-patch-for-react-19";
import "./i18n";
import "./global.css";

createRoot(document.getElementById("root")!).render(<App />);
