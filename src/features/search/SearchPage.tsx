import { RiBardFill, RiMicLine } from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { motion } from "framer-motion";

const mockSuggestions = [
  "Find suppliers for cotton t-shirts in Bangladesh",
  "Electronics manufacturers in Shenzhen with low MOQ",
  "Sustainable furniture suppliers in Vietnam",
  "Packaging suppliers with recycled materials",
  "Textile manufacturers with GOTS certification",
];

export function SearchPage() {
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center h-full bg-white">
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center w-full max-w-2xl mx-auto px-4 -mt-20">
        {/* Logo */}
        <div className="mb-8 flex flex-col items-center">
          <div className="flex items-center justify-center mb-4">
            <RiBardFill className="size-10 text-stone-500" />
          </div>
          <h1 className="text-3xl font-normal text-gray-800 tracking-tight">
            Sourcing Agent
          </h1>
        </div>

        {/* Search Bar */}
        <motion.div layoutId="searchbar" className="w-full max-w-[584px]">
          <div className="relative w-full">
            <div
              className={`flex items-center w-full rounded-full border ${
                focused
                  ? "border-stone-200 shadow-md"
                  : "border-gray-200 hover:shadow-sm"
              } bg-white px-4 py-3 transition-all duration-200`}
            >
              <Search className="h-5 w-5 text-gray-400 mr-3" />
              <input
                type="text"
                className="flex-1 bg-transparent outline-none text-gray-800 placeholder-gray-500"
                placeholder="Find worldwide suppliers and buyers..."
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
              />
              <button
                className="ml-2 text-stone-500 hover:text-stone-600"
                onClick={() => navigate("/search/result")}
              >
                <RiMicLine className="size-5" />
              </button>
            </div>

            {/* Suggestions Dropdown */}
            {focused && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-2xl w-full max-h-[300px] overflow-y-auto z-10">
                <ul className="list-none py-2">
                  {mockSuggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center text-gray-700"
                      onClick={() => navigate("/search/result")}
                    >
                      <Search className="h-4 w-4 text-gray-400 mr-3 flex-shrink-0" />
                      <span className="text-sm">{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </motion.div>

        {/* Search Buttons */}
        <div className="mt-8 flex gap-4">
          <button
            className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 rounded-md text-sm"
            onClick={() => navigate("/search/result")}
          >
            Search Suppliers
          </button>
          <button
            className="bg-gray-50 hover:bg-gray-100 text-gray-800 font-normal py-2 px-4 rounded-md text-sm"
            onClick={() => navigate("/search/result")}
          >
            I'm Feeling Lucky
          </button>
        </div>
      </main>
    </div>
  );
}
