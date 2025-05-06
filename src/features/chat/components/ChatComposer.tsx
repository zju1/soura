import { RiArrowUpLine } from "@remixicon/react";
import { useCallback, useState } from "react";
import TextareaAutosize from "react-textarea-autosize";

export function ChatComposer({
  onSend,
}: {
  onSend: (message: string) => void;
}) {
  const [value, setValue] = useState("");

  const handleKeyDown = useCallback(
    (e: any) => {
      if (e.key === "Enter" && !e.ctrlKey && !e.shiftKey) {
        e.preventDefault();
        if (value.length > 0) {
          onSend(e.target.value);
          setValue("");
        }
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
    [onSend, value]
  );

  return (
    <form
      className="grid border border-stone-300 bg-stone-100 rounded-xl  relative"
      onSubmit={(event) => {
        event.preventDefault();
        if (value.length > 1) {
          onSend(value);
          setValue("");
        }
      }}
    >
      <TextareaAutosize
        value={value}
        minRows={3}
        rows={3}
        autoFocus
        maxRows={6}
        className="!outline-none pl-4 pr-16 py-2 !bg-transparent border-none shadow-none font-grotesk"
        placeholder="Describe analysis topics..."
        onKeyDown={handleKeyDown}
        onChange={(e) => setValue(e.target.value)}
      />
      <button
        type="submit"
        className="absolute right-2 bottom-2 size-8 flex bg-stone-800 text-white rounded-3xl items-center justify-center"
      >
        <RiArrowUpLine className="size-6" />
      </button>
    </form>
  );
}
