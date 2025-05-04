import { motion } from "framer-motion";
import { ArrowRight, Loader, Search } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { RiSendPlaneFill } from "@remixicon/react";

export function Composer({
  onSend,
  isLoading,
  suggestedQueries,
}: {
  onSend: (value: string) => void;
  isLoading: boolean;
  suggestedQueries: string[];
}) {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={`bg-white border-stone-300 transition-all p-2 border ${
        isFocused ? "rounded-t-3xl" : "rounded-3xl"
      }`}
    >
      <form
        className="relative"
        onSubmit={(e) => {
          e.preventDefault();
          onSend(query);
        }}
      >
        <Input
          ref={inputRef}
          autoFocus
          placeholder={"Ask anything..."}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="border-0 focus-visible:ring-0 font-grotesk shadow-none focus-visible:ring-offset-0 !text-base !bg-transparent pb-8 h-auto max-h-48 pt-2"
        />

        <div className="flex justify-end">
          <Button
            type="button"
            size="icon"
            disabled={query.length < 1 || isLoading}
            onClick={() => onSend(query)}
            className={`rounded-full h-9 w-9 bg-brand-main hover:bg-teal-700"`}
          >
            {!isLoading ? (
              <RiSendPlaneFill className="h-5 w-5 text-white" />
            ) : (
              <Loader className="animate-spin size-5 text-white" />
            )}
          </Button>
        </div>
        {isFocused && suggestedQueries?.length > 0 && (
          <motion.div
            initial={{
              opacity: 0,
              y: 5,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <div
              ref={suggestionsRef}
              className="absolute -left-[calc(0.5rem+1px)] -right-[calc(0.5rem+1px)] top-full mt-[calc(0.5rem+1px)] bg-white border-stone-300 trans rounded-b-3xl border border-t-0 p-2 z-10"
            >
              <ul>
                {suggestedQueries.map((suggestion: any, index: number) => (
                  <li
                    key={index}
                    className="flex items-center px-2 py-3 cursor-pointer hover:bg-stone-200/40 rounded-lg transition-all"
                    onClick={() => onSend(suggestion)}
                  >
                    <div className="flex items-center">
                      <Search className="h-4 w-4 text-gray-500 mr-2" />
                      <span className="text-sm text-gray-500 font-grotesk">
                        {suggestion}
                      </span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}
      </form>
    </div>
  );
}
