import { AnimatePresence } from "framer-motion";
import { Outlet } from "react-router-dom";

export function SearchLayout() {
  return (
    <AnimatePresence mode="wait">
      <Outlet />
    </AnimatePresence>
  );
}
