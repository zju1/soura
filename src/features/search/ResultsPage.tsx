"use client";

import {
  RiArrowLeftLine,
  RiArrowRightSLine,
  RiMicLine,
  RiSearchLine,
} from "@remixicon/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  ChevronDown,
  Ship,
  Calendar,
  ImageIcon,
  ShoppingBag,
  MapPin,
} from "lucide-react";
import { motion } from "framer-motion";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

// Mock search results for suppliers
const mockResults = [
  {
    companyName: "Bangladesh Textiles Ltd.",
    countryCode: "BD",
    location: "Dhaka, Bangladesh",
    recentShipment: "2025-04-15",
    totalShipments: 15676,
    topSuppliers: ["Sun Jade Vietnam Footwear", "United Well Trade"],
    topCustomers: ["Dhl Global Forwarding China", "Alena Vietnam Footwear"],
    verified: true,
  },
  {
    companyName: "A & A Enterprises",
    countryCode: "PK",
    location:
      "First Floor Dp-5 Sector 12-D North Karachi Industrial Area Karachi Pakistan Karachi 75500 Pk 75500 Pk",
    recentShipment: "2025-03-29",
    totalShipments: 2723,
    topSuppliers: [],
    topCustomers: [
      "Intex Diy",
      "Deroyar Textiles",
      "Tranzonic",
      "Big Time Products",
    ],
    verified: false,
  },
  {
    companyName: "Cosentino S A",
    countryCode: "ES",
    location: "Crta Baza Huercal-Overa Km 59 048 50 Cantoria Almeria Spain",
    recentShipment: "2025-03-29",
    totalShipments: 48148,
    topSuppliers: [
      "Xiamen Stone World Imp. & Exp. Co.",
      "Quanzhou Yabang Stone Co. Ltd.",
    ],
    topCustomers: ["Cosentino North America", "Cosentino Latina Vitoria"],
    verified: true,
  },
  {
    companyName: "Dhaka Apparel Manufacturing Co.",
    countryCode: "BD",
    location: "Dhaka, Bangladesh",
    recentShipment: "2025-04-02",
    totalShipments: 9876,
    topSuppliers: ["Cotton Suppliers International", "Fabric World Trading"],
    topCustomers: ["Global Fashion Brands Inc.", "Retail Apparel Group"],
    verified: true,
  },
  {
    companyName: "EcoFabrics Bangladesh",
    countryCode: "BD",
    location: "Dhaka, Bangladesh",
    recentShipment: "2025-04-05",
    totalShipments: 5421,
    topSuppliers: ["Organic Cotton Cooperative", "Natural Dye Specialists"],
    topCustomers: ["Sustainable Fashion Brands", "Eco Retail Solutions"],
    verified: true,
  },
];

// Country flag mapping
const countryFlags: Record<string, string> = {
  BD: "🇧🇩",
  PK: "🇵🇰",
  ES: "🇪🇸",
  US: "🇺🇸",
  CN: "🇨🇳",
  VN: "🇻🇳",
};

export function ResultsPage() {
  const [focused, setFocused] = useState(false);
  const [activeTab, setActiveTab] = useState("companies");
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            {/* Logo and Back Button */}
            <button
              className="text-gray-600 hover:text-gray-900 mr-4"
              onClick={() => navigate(-1)}
              aria-label="Go back"
            >
              <RiArrowLeftLine className="h-5 w-5" />
            </button>

            {/* Search Bar */}
            <motion.div layoutId="searchbar" className="flex-1 max-w-2xl">
              <div className="relative">
                <div className="flex items-center w-full rounded-full border border-gray-300 hover:shadow-sm bg-white px-4 py-2.5">
                  <RiSearchLine className="size-5 text-stone-300 mr-2" />
                  <input
                    type="text"
                    defaultValue="cotton t-shirts in Bangladesh"
                    className="flex-1 bg-transparent outline-none text-gray-800 text-sm"
                    placeholder="Find worldwide suppliers and buyers..."
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                  />
                  <button className="ml-2 text-stone-500 hover:text-stone-600">
                    <RiMicLine className="size-5" />
                  </button>
                </div>

                {/* Suggestions Dropdown */}
                {focused && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 shadow-lg rounded-lg w-full max-h-[300px] overflow-y-auto z-10">
                    <ul className="list-none py-2">
                      {mockSuggestions.map((suggestion, index) => (
                        <li
                          key={index}
                          className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center text-gray-700"
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
          </div>
        </div>
      </header>

      {/* Sticky Tabs */}
      <div className="sticky top-16 z-20 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 -mb-0.5">
          {/* Google-style Tabs */}
          <div className="flex items-center overflow-x-auto pb-0.5">
            <button
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium ${
                activeTab === "companies"
                  ? "text-stone-600 border-b-2 border-stone-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("companies")}
            >
              <Search className="h-4 w-4" />
              <span>Companies & Suppliers</span>
            </button>
            <button
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium ${
                activeTab === "addresses"
                  ? "text-stone-600 border-b-2 border-stone-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("addresses")}
            >
              <MapPin className="h-4 w-4" />
              <span>Addresses</span>
            </button>
            <button
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium ${
                activeTab === "product-hs"
                  ? "text-stone-600 border-b-2 border-stone-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("product-hs")}
            >
              <ShoppingBag className="h-4 w-4" />
              <span>Product Finder by HS Code</span>
            </button>
            <button
              className={`flex items-center gap-1.5 px-4 py-3 text-sm font-medium ${
                activeTab === "product"
                  ? "text-stone-600 border-b-2 border-stone-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
              onClick={() => setActiveTab("product")}
            >
              <ImageIcon className="h-4 w-4" />
              <span>Product Finder</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Filters */}
      <div className="container mt-2 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center gap-3 py-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 shadow-none border border-zinc-300"
              >
                <span>Most Recent Shipment</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 shadow-xl border-zinc-300"
            >
              <DropdownMenuItem>Most Recent Shipment</DropdownMenuItem>
              <DropdownMenuItem>Company Name (A-Z)</DropdownMenuItem>
              <DropdownMenuItem>Total Shipments (High to Low)</DropdownMenuItem>
              <DropdownMenuItem>Total Shipments (Low to High)</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 shadow-none border border-zinc-300"
              >
                <span>Include Suppliers And Companies</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 shadow-xl border-zinc-300"
            >
              <DropdownMenuItem>
                Include Suppliers And Companies
              </DropdownMenuItem>
              <DropdownMenuItem>Suppliers Only</DropdownMenuItem>
              <DropdownMenuItem>Companies Only</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 shadow-none border border-zinc-300"
              >
                <span>Total Shipments</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 shadow-xl border-zinc-300"
            >
              <DropdownMenuItem>Any</DropdownMenuItem>
              <DropdownMenuItem>More than 10</DropdownMenuItem>
              <DropdownMenuItem>More than 100</DropdownMenuItem>
              <DropdownMenuItem>More than 1,000</DropdownMenuItem>
              <DropdownMenuItem>More than 10,000</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 shadow-none border border-zinc-300"
              >
                <span>Industry</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 shadow-xl border-zinc-300"
            >
              <DropdownMenuItem>All Industries</DropdownMenuItem>
              <DropdownMenuItem>Textiles & Apparel</DropdownMenuItem>
              <DropdownMenuItem>Electronics</DropdownMenuItem>
              <DropdownMenuItem>Furniture</DropdownMenuItem>
              <DropdownMenuItem>Automotive</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="h-9 gap-1.5 shadow-none border border-zinc-300"
              >
                <span>Location</span>
                <ChevronDown className="h-3.5 w-3.5 opacity-70" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="start"
              className="w-56 shadow-xl border-zinc-300"
            >
              <DropdownMenuItem>All Locations</DropdownMenuItem>
              <DropdownMenuItem>Asia</DropdownMenuItem>
              <DropdownMenuItem>Europe</DropdownMenuItem>
              <DropdownMenuItem>North America</DropdownMenuItem>
              <DropdownMenuItem>South America</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="default"
            size="sm"
            className="h-9 ml-auto bg-stone-600 hover:bg-stone-700"
          >
            Advanced Search
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-2">
        {/* Results List */}
        {activeTab === "companies" && (
          <div className="space-y-3">
            {mockResults.map((result, index) => (
              <div
                key={index}
                onClick={() => navigate("/suppliers/1")}
                className="bg-white border border-gray-200 rounded-md overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-4">
                  <div className="flex flex-col md:flex-row md:justify-between gap-4">
                    {/* Left Column */}
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-medium text-stone-600 hover:underline cursor-pointer">
                          {result.companyName}
                        </h3>
                        <span className="text-lg" title={result.countryCode}>
                          {countryFlags[result.countryCode] || "🌐"}
                        </span>
                        {result.verified && (
                          <Badge
                            variant="outline"
                            className="bg-stone-50 text-stone-700 border-stone-200 text-xs"
                          >
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-gray-600 mb-3">
                        {result.location}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-2">
                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Most recent shipment:
                          </p>
                          <p className="text-sm font-medium flex items-center gap-1.5">
                            <Calendar className="h-3.5 w-3.5 text-gray-400" />
                            {new Date(
                              result.recentShipment
                            ).toLocaleDateString()}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm text-gray-500 mb-1">
                            Total Shipments:
                          </p>
                          <p className="text-sm font-medium flex items-center gap-1.5">
                            <Ship className="h-3.5 w-3.5 text-gray-400" />
                            {result.totalShipments.toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Right Column */}
                    <div className="md:w-1/3 lg:w-2/5">
                      {result.topSuppliers.length > 0 && (
                        <div className="mb-3">
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            Top Suppliers
                          </p>
                          <ul className="space-y-1">
                            {result.topSuppliers.map((supplier, i) => (
                              <li
                                key={i}
                                className="text-sm text-stone-600 hover:underline cursor-pointer"
                              >
                                {supplier}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {result.topCustomers.length > 0 && (
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-1">
                            {result.topSuppliers.length > 0
                              ? "Top Customers"
                              : "Top Customers"}
                          </p>
                          <ul className="space-y-1">
                            {result.topCustomers.map((customer, i) => (
                              <li
                                key={i}
                                className="text-sm text-stone-600 hover:underline cursor-pointer"
                              >
                                {customer}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "addresses" && (
          <div className="flex items-center justify-center h-40 bg-white border border-gray-200 rounded-md">
            <p className="text-gray-500">
              Address search results will appear here
            </p>
          </div>
        )}

        {activeTab === "product-hs" && (
          <div className="flex items-center justify-center h-40 bg-white border border-gray-200 rounded-md">
            <p className="text-gray-500">
              Product search by HS code results will appear here
            </p>
          </div>
        )}

        {activeTab === "product" && (
          <div className="flex items-center justify-center h-40 bg-white border border-gray-200 rounded-md">
            <p className="text-gray-500">
              Product search results will appear here
            </p>
          </div>
        )}

        {/* Pagination */}
        {activeTab === "companies" && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing <span className="font-medium">1</span> to{" "}
              <span className="font-medium">5</span> of{" "}
              <span className="font-medium">126</span> results
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled
                className="h-8 w-8 p-0"
              >
                <span className="sr-only">Previous page</span>
                <RiArrowLeftLine className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 min-w-8 px-3 bg-stone-50 border-stone-200 text-stone-700"
              >
                1
              </Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8 px-3">
                2
              </Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8 px-3">
                3
              </Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8 px-3">
                4
              </Button>
              <Button variant="outline" size="sm" className="h-8 min-w-8 px-3">
                5
              </Button>
              <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                <span className="sr-only">Next page</span>
                <RiArrowRightSLine className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

const mockSuggestions = [
  "Find suppliers for cotton t-shirts in Bangladesh",
  "Electronics manufacturers in Shenzhen with low MOQ",
  "Sustainable furniture suppliers in Vietnam",
  "Packaging suppliers with recycled materials",
  "Textile manufacturers with GOTS certification",
];
