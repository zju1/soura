import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RiMicFill, RiSearchLine, RiSendPlaneFill } from "@remixicon/react";
import { motion } from "framer-motion";
import { Search, Globe, BookOpen, ArrowUpRight } from "lucide-react";
import { useState } from "react";

export function SourcingQuery() {
  const [searchMode, setSearchMode] = useState<"search" | "sourcing">("search");
  return (
    <>
      <div className="max-w-3xl mx-auto px-4 py-8 flex flex-col">
        {/* Query Display */}
        <h1 className="text-2xl font-medium text-gray-800 mb-6">
          What are the tariff rates from China?
        </h1>

        {/* Navigation Tabs */}
        <div className="flex border-b border-gray-200 mb-6">
          <button className="flex items-center gap-2 px-4 py-2 text-stone-600 border-b-2 border-stone-600 font-medium">
            <Search className="h-4 w-4" />
            <span>Search</span>
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-800">
            <Globe className="h-4 w-4" />
            <span>Sources</span>
            <span className="bg-gray-100 text-gray-700 rounded-full text-xs px-1.5 py-0.5 ml-1">
              8
            </span>
          </button>
          <div className="ml-auto flex items-center">
            <button className="flex items-center gap-1 text-gray-600 text-sm">
              <span>1 task</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Source Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8">
          <div className="bg-stone-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-stone-600 bg-stone-50 p-1 rounded">
                <Search className="h-4 w-4" />
              </span>
              <span className="text-sm text-gray-600">authbridge.com</span>
            </div>
            <p className="text-sm font-medium">
              What is a Supplier? Roles, Types, and Benefits
            </p>
          </div>

          <div className="bg-stone-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-gray-600 bg-gray-100 p-1 rounded">
                <Globe className="h-4 w-4" />
              </span>
              <span className="text-sm text-gray-600">
                Wikimedia Foundation, I...
              </span>
            </div>
            <p className="text-sm font-medium">Supplier - Wikipedia</p>
          </div>

          <div className="bg-stone-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-stone-700 bg-stone-50 p-1 rounded-full">
                <BookOpen className="h-4 w-4" />
              </span>
              <span className="text-sm text-gray-600">
                dictionary.cambridge
              </span>
            </div>
            <p className="text-sm font-medium">supplier</p>
            <p className="text-xs text-gray-500 mt-1">+5 sources</p>
          </div>
        </div>

        {/* Main Content */}
        <div className="mb-8">
          <h2 className="text-xl font-medium text-gray-800 mb-4">
            Supplier: Definition, Roles, and Importance
          </h2>

          <p className="mb-4 text-gray-700">
            A <span className="font-medium">supplier</span> is an individual,
            company, or organization that provides goods, services, or raw
            materials to another business, most often serving as a crucial link
            in the supply chain between manufacturers and retailers{" "}
            <span className="text-xs bg-gray-100 px-1 rounded">1</span>{" "}
            <span className="text-xs bg-gray-100 px-1 rounded">4</span>{" "}
            <span className="text-xs bg-gray-100 px-1 rounded">5</span>{" "}
            <span className="text-xs bg-gray-100 px-1 rounded">6</span>.
            Suppliers ensure that businesses have the necessary inputs to
            produce finished goods or offer services to end consumers, playing a
            pivotal role in industries such as manufacturing, retail, and
            construction{" "}
            <span className="text-xs bg-gray-100 px-1 rounded">1</span>{" "}
            <span className="text-xs bg-gray-100 px-1 rounded">5</span>.
          </p>

          <h3 className="text-lg font-medium text-gray-800 mb-3">
            Roles of a Supplier
          </h3>

          <ul className="space-y-4 list-disc pl-5 text-gray-700">
            <li>
              <span className="font-medium">
                Provision of Goods and Services:
              </span>{" "}
              Suppliers deliver raw materials, components, or finished products
              required by businesses for their operations{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">1</span>{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">5</span>.
            </li>
            <li>
              <span className="font-medium">Intermediary Function:</span> They
              often act as intermediaries between manufacturers and retailers,
              ensuring smooth communication and sufficient stock levels{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">5</span>{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">6</span>.
            </li>
            <li>
              <span className="font-medium">Quality Assurance:</span> Suppliers
              are responsible for maintaining the quality of the goods or
              materials they provide, which directly impacts the final product{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">1</span>{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">5</span>.
            </li>
            <li>
              <span className="font-medium">Inventory Management:</span> They
              help businesses manage inventory efficiently by delivering
              products as needed{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">1</span>.
            </li>
            <li>
              <span className="font-medium">Cost Control:</span> By negotiating
              prices and terms, suppliers can help businesses control costs and
              improve profitability{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">1</span>{" "}
              <span className="text-xs bg-gray-100 px-1 rounded">6</span>.
            </li>
            <li>
              <span className="font-medium">Logistics Support:</span> Suppliers
              play a role in the timely delivery and transportation of goods,
              ensuring that businesses can meet their production schedules and
              customer demands.
            </li>
          </ul>
        </div>
      </div>
      <div className="sticky bottom-0 p-4 bg-white max-w-3xl mx-auto">
        <motion.div layoutId="chatbox">
          <div className="bg-stone-100 rounded-xl border border-stone-300 shadow-md p-4">
            <form className="relative">
              <Input
                placeholder={"Ask anything..."}
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
                    className={`rounded-full h-9 w-9"bg-stone-600`}
                  >
                    <RiMicFill className="h-5 w-5" />
                  </Button>
                  <Button
                    type="button"
                    size="icon"
                    className={`rounded-full h-9 w-9 bg-emerald-500 hover:bg-teal-700"`}
                  >
                    <RiSendPlaneFill className="h-5 w-5 text-white" />
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </motion.div>
      </div>
    </>
  );
}
