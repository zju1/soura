import { RiSendPlane2Fill } from "@remixicon/react";
import { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export function ChatComposer() {
  const [value, setValue] = useState("");

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
      }

      if (e.key === "Enter" && (e.ctrlKey || e.shiftKey)) {
        e.preventDefault();
        const { selectionStart, selectionEnd } = e.target;
        const newValue =
          value.substring(0, selectionStart) +
          "\n" +
          value.substring(selectionEnd);
        setValue(newValue);

        setTimeout(() => {
          e.target.selectionStart = e.target.selectionEnd = selectionStart + 1;
        }, 0);
      }
    },
    [value]
  );

  return (
    <div className="grid  border border-stone-600 rounded-3xl p-2 relative">
      <TextareaAutosize
        value={value}
        minRows={1}
        rows={1}
        autoFocus
        maxRows={6}
        className="!outline-none pl-4 pr-16 py-2 !bg-transparent border-none shadow-none font-grotesk"
        placeholder="Describe analysis topics..."
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="absolute right-1 top-1/2 -translate-y-1/2 size-12 flex bg-stone-800 text-white rounded-3xl items-center justify-center">
        <RiSendPlane2Fill className="size-6" />
      </button>
    </div>
  );
}
