import { useEffect, useState } from "react";
import { marySearchSuggestions } from "./mary-search-suggestions";

export function useTypewriterSuggestions({
  typingSpeed = 30,
  pause = 2000,
  deletingSpeed = 20,
  pauseBetween = 400,
} = {}) {
  const [placeholder, setPlaceholder] = useState("");
  useEffect(() => {
    let suggestionIdx = 0;
    let charIdx = 0;
    let typing = true;
    let timeout: NodeJS.Timeout;

    function type() {
      const current = marySearchSuggestions[suggestionIdx];
      if (typing) {
        if (charIdx < current.length) {
          setPlaceholder(current.slice(0, charIdx + 1));
          charIdx++;
          timeout = setTimeout(type, typingSpeed);
        } else {
          typing = false;
          timeout = setTimeout(type, pause);
        }
      } else {
        if (charIdx > 0) {
          setPlaceholder(current.slice(0, charIdx - 1));
          charIdx--;
          timeout = setTimeout(type, deletingSpeed);
        } else {
          typing = true;
          suggestionIdx = (suggestionIdx + 1) % marySearchSuggestions.length;
          timeout = setTimeout(type, pauseBetween);
        }
      }
    }
    type();
    return () => clearTimeout(timeout);
  }, [typingSpeed, pause, deletingSpeed, pauseBetween]);
  return placeholder;
}
