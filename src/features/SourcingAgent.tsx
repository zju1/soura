"use client";

import type React from "react";

import { useState, useRef, useEffect } from "react";
import {
  Search,
  ArrowRight,
  AlertTriangle,
  Truck,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiMicFill, RiSearchLine, RiSendPlaneFill } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

// Update the component to include suggested queries
export default function SourcingAgent() {
  const [searchMode, setSearchMode] = useState<"search" | "sourcing">("search");
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any | null>(null);
  const navigate = useNavigate();

  // Sample suggested queries
  const suggestedQueries = [
    "Find suppliers for cotton t-shirts in Bangladesh",
    "Electronics manufacturers in Shenzhen with low MOQ",
    "Sustainable furniture suppliers in Vietnam",
    "Packaging suppliers with recycled materials",
    "Textile manufacturers with GOTS certification",
  ];

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== "undefined") {
      // Browser compatibility check
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;

      if (SpeechRecognition) {
        const recognition = new SpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = false;
        recognition.lang = "en-US";

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript;
          setQuery(transcript);
          setIsListening(false);
        };

        recognition.onerror = (event: any) => {
          console.error("Speech recognition error", event.error);
          setIsListening(false);
        };

        recognition.onend = () => {
          setIsListening(false);
        };

        recognitionRef.current = recognition;
      } else {
        console.error("Speech recognition not supported in this browser");
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.abort();
      }
    };
  }, []);

  const toggleVoiceRecognition = () => {
    if (!recognitionRef.current) {
      alert("Speech recognition is not supported in your browser");
      return;
    }

    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setQuery("");
      recognitionRef.current.start();
      setIsListening(true);
      setIsFocused(true);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Performing ${searchMode} with query: ${query}`);
    // Implement actual search functionality here
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Handle clicks outside the search interface to close suggestions
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
    <div className="h-[80%] flex items-center">
      <div className="w-full max-w-3xl mx-auto my-4 px-4 relative grid gap-4">
        <h1 className="text-center text-xl font-medium text-stone-700">
          What do we search today?
        </h1>
        <motion.div layoutId="chatbox">
          <div className="bg-stone-100 rounded-xl border border-stone-300 shadow-md p-4">
            <form onSubmit={handleSearch} className="relative">
              <Input
                ref={inputRef}
                placeholder={isListening ? "Listening..." : "Ask anything..."}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setIsFocused(true)}
                className="border-0 focus-visible:ring-0 shadow-none focus-visible:ring-offset-0 text-base"
              />

              <div className="flex items-center justify-between mt-3">
                <div className="flex bg-gray-200 rounded-lg p-1">
                  <Button
                    type="button"
                    size="sm"
                    className={`bg-transparent shadow-none text-gray-400 ${
                      searchMode === "search"
                        ? "!bg-white shadow-md hover:!bg-white"
                        : "hover:!bg-transparent"
                    }`}
                    onClick={() => setSearchMode("search")}
                  >
                    <RiSearchLine className="h-4 w-4" />
                    Search
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    className={`bg-transparent shadow-none text-gray-400 ${
                      searchMode === "sourcing"
                        ? "!bg-white shadow-md hover:!bg-white"
                        : "hover:!bg-transparent"
                    }`}
                    onClick={() => setSearchMode("sourcing")}
                  >
                    Sourcing research
                  </Button>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    type="button"
                    size="icon"
                    onClick={toggleVoiceRecognition}
                    className={`rounded-full h-9 w-9 ${
                      isListening
                        ? "bg-red-500 hover:bg-red-600 animate-pulse"
                        : "bg-stone-600"
                    }`}
                  >
                    <RiMicFill className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    onClick={() => navigate("/ai-sourcing-agent/query")}
                    className={`rounded-full h-9 w-9 bg-emerald-500 hover:bg-teal-700"`}
                  >
                    <RiSendPlaneFill className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
              {/* Suggested queries */}
              {isFocused && (
                <div
                  ref={suggestionsRef}
                  className="absolute -left-5 top-[calc(100%+1.5rem)] -right-5 mt-2 bg-white rounded-lg border shadow-md p-3 z-10"
                >
                  <h3 className="text-sm font-medium text-gray-500 mb-2">
                    Suggested queries
                  </h3>
                  <ul className="space-y-2">
                    {suggestedQueries.map((suggestion, index) => (
                      <li key={index}>
                        <button
                          type="button"
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 flex items-center justify-between group"
                        >
                          <div className="flex items-center">
                            <Search className="h-4 w-4 text-gray-400 mr-2" />
                            <span>{suggestion}</span>
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </form>
          </div>
        </motion.div>
        <div className="grid grid-cols-3 gap-4 mt-4">
          <InfoCard
            icon={AlertTriangle}
            title="New EU tariffs impact textiles"
            description="15% increase on Chinese imports starting next month"
          />
          <InfoCard
            icon={Truck}
            title="Supply chain disruptions"
            description="Suez Canal delays affecting Asian shipments by 12 days"
          />
          <InfoCard
            icon={TrendingUp}
            title="Raw material price trends"
            description="Cotton prices up 8%, semiconductor costs stabilizing"
          />
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-start gap-3 bg-white rounded-lg p-3 shadow-sm border hover:shadow-md transition-shadow cursor-pointer">
      <div className="bg-gray-100 p-2 rounded-full">
        <Icon className="h-5 w-5 text-stone-600" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-gray-900 truncate">{title}</h3>
        <p className="text-xs text-gray-500 truncate">{description}</p>
      </div>
    </div>
  );
}
