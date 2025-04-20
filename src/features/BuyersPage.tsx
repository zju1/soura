"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  Pencil,
  Trash2,
  Search,
  X,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";

// Define types
type RiskLevel = "Low" | "Medium" | "High";
type Frequency = "Weekly" | "Monthly" | "Quarterly" | "Annually";
type Buyer = {
  id: number;
  companyName: string;
  countryRegion: string;
  imports: string[];
  supplierCountries: string[];
  frequency: Frequency;
  riskLevel: RiskLevel;
  fitScore: number;
};

// Sample data
const buyers: Buyer[] = [
  {
    id: 1,
    companyName: "Global Retail Solutions",
    countryRegion: "United States",
    imports: ["Electronics", "Home Goods", "Apparel"],
    supplierCountries: ["China", "Vietnam", "Mexico"],
    frequency: "Monthly",
    riskLevel: "Low",
    fitScore: 94,
  },
  {
    id: 2,
    companyName: "European Distributors Ltd.",
    countryRegion: "Germany",
    imports: ["Automotive Parts", "Industrial Equipment"],
    supplierCountries: ["China", "Poland", "Czech Republic"],
    frequency: "Quarterly",
    riskLevel: "Medium",
    fitScore: 82,
  },
  {
    id: 3,
    companyName: "Pacific Trade Partners",
    countryRegion: "Australia",
    imports: ["Food Products", "Beverages", "Agricultural Goods"],
    supplierCountries: ["New Zealand", "Indonesia", "Thailand"],
    frequency: "Weekly",
    riskLevel: "Low",
    fitScore: 89,
  },
  {
    id: 4,
    companyName: "Nordic Imports Group",
    countryRegion: "Sweden",
    imports: ["Furniture", "Home Decor", "Textiles"],
    supplierCountries: ["Denmark", "Poland", "China"],
    frequency: "Monthly",
    riskLevel: "Low",
    fitScore: 91,
  },
  {
    id: 5,
    companyName: "American Tech Distributors",
    countryRegion: "United States",
    imports: ["Computer Hardware", "Software", "Peripherals"],
    supplierCountries: ["Taiwan", "South Korea", "Japan"],
    frequency: "Weekly",
    riskLevel: "Medium",
    fitScore: 87,
  },
  {
    id: 6,
    companyName: "Canadian Retail Consortium",
    countryRegion: "Canada",
    imports: ["Apparel", "Footwear", "Accessories"],
    supplierCountries: ["United States", "China", "Bangladesh"],
    frequency: "Monthly",
    riskLevel: "Low",
    fitScore: 85,
  },
  {
    id: 7,
    companyName: "Middle East Trading Co.",
    countryRegion: "United Arab Emirates",
    imports: ["Luxury Goods", "Jewelry", "Electronics"],
    supplierCountries: ["Italy", "France", "Switzerland"],
    frequency: "Quarterly",
    riskLevel: "High",
    fitScore: 76,
  },
  {
    id: 8,
    companyName: "South American Importers",
    countryRegion: "Brazil",
    imports: ["Industrial Machinery", "Agricultural Equipment"],
    supplierCountries: ["United States", "Germany", "China"],
    frequency: "Annually",
    riskLevel: "High",
    fitScore: 68,
  },
  {
    id: 9,
    companyName: "Asian Market Expansion",
    countryRegion: "Singapore",
    imports: ["Consumer Electronics", "Smart Devices"],
    supplierCountries: ["China", "Malaysia", "Vietnam"],
    frequency: "Monthly",
    riskLevel: "Medium",
    fitScore: 83,
  },
  {
    id: 10,
    companyName: "UK Retail Solutions",
    countryRegion: "United Kingdom",
    imports: ["Food & Beverage", "Health Products", "Beauty"],
    supplierCountries: ["France", "Spain", "Italy"],
    frequency: "Weekly",
    riskLevel: "Low",
    fitScore: 92,
  },
];

// Get unique values for filters
const countries = Array.from(
  new Set(buyers.map((b) => b.countryRegion))
).sort();
const allImports = Array.from(new Set(buyers.flatMap((b) => b.imports))).sort();
const supplierCountries = Array.from(
  new Set(buyers.flatMap((b) => b.supplierCountries))
).sort();
const frequencies: Frequency[] = ["Weekly", "Monthly", "Quarterly", "Annually"];
const riskLevels: RiskLevel[] = ["Low", "Medium", "High"];

export default function BuyersLeadsDatabase() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedImports, setSelectedImports] = useState<string[]>([]);
  const [selectedSupplierCountries, setSelectedSupplierCountries] = useState<
    string[]
  >([]);
  const [selectedFrequencies, setSelectedFrequencies] = useState<Frequency[]>(
    []
  );
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<RiskLevel[]>([]);
  const [minScore, setMinScore] = useState<number | undefined>();
  const [maxScore, setMaxScore] = useState<number | undefined>();

  // State for drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);

  // Filter buyers based on all criteria
  const filteredBuyers = buyers.filter((buyer) => {
    // Global search query filter
    if (
      searchQuery &&
      !buyer.companyName.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !buyer.countryRegion.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !buyer.imports.some((item) =>
        item.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      !buyer.supplierCountries.some((country) =>
        country.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    // Company name filter
    if (
      nameFilter &&
      !buyer.companyName.toLowerCase().includes(nameFilter.toLowerCase())
    ) {
      return false;
    }

    // Country/Region filter
    if (
      selectedCountries.length > 0 &&
      !selectedCountries.includes(buyer.countryRegion)
    ) {
      return false;
    }

    // Imports filter
    if (
      selectedImports.length > 0 &&
      !buyer.imports.some((item) => selectedImports.includes(item))
    ) {
      return false;
    }

    // Supplier Countries filter
    if (
      selectedSupplierCountries.length > 0 &&
      !buyer.supplierCountries.some((country) =>
        selectedSupplierCountries.includes(country)
      )
    ) {
      return false;
    }

    // Frequency filter
    if (
      selectedFrequencies.length > 0 &&
      !selectedFrequencies.includes(buyer.frequency)
    ) {
      return false;
    }

    // Risk level filter
    if (
      selectedRiskLevels.length > 0 &&
      !selectedRiskLevels.includes(buyer.riskLevel)
    ) {
      return false;
    }

    // Fit score filter
    if (minScore !== undefined && buyer.fitScore < minScore) {
      return false;
    }
    if (maxScore !== undefined && buyer.fitScore > maxScore) {
      return false;
    }

    return true;
  });

  // Handle view buyer details
  const handleViewBuyer = (buyer: Buyer) => {
    setSelectedBuyer(buyer);
    setIsDrawerOpen(true);
  };

  // Handle edit buyer (placeholder)
  const handleEditBuyer = (buyer: Buyer) => {
    console.log("Edit buyer:", buyer);
    // Implementation would go here
  };

  // Handle delete buyer (placeholder)
  const handleDeleteBuyer = (buyer: Buyer) => {
    console.log("Delete buyer:", buyer);
    // Implementation would go here
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setNameFilter("");
    setSelectedCountries([]);
    setSelectedImports([]);
    setSelectedSupplierCountries([]);
    setSelectedFrequencies([]);
    setSelectedRiskLevels([]);
    setMinScore(undefined);
    setMaxScore(undefined);
  };

  // Toggle selection in multi-select filters
  const toggleSelection = (
    value: string,
    currentSelection: string[],
    setSelection: (values: string[]) => void
  ) => {
    if (currentSelection.includes(value)) {
      setSelection(currentSelection.filter((item) => item !== value));
    } else {
      setSelection([...currentSelection, value]);
    }
  };

  // Toggle frequency selection
  const toggleFrequency = (value: Frequency) => {
    if (selectedFrequencies.includes(value)) {
      setSelectedFrequencies(
        selectedFrequencies.filter((freq) => freq !== value)
      );
    } else {
      setSelectedFrequencies([...selectedFrequencies, value]);
    }
  };

  // Toggle risk level selection
  const toggleRiskLevel = (value: RiskLevel) => {
    if (selectedRiskLevels.includes(value)) {
      setSelectedRiskLevels(
        selectedRiskLevels.filter((level) => level !== value)
      );
    } else {
      setSelectedRiskLevels([...selectedRiskLevels, value]);
    }
  };

  // Count active filters
  const activeFilterCount = [
    nameFilter,
    selectedCountries.length > 0,
    selectedImports.length > 0,
    selectedSupplierCountries.length > 0,
    selectedFrequencies.length > 0,
    selectedRiskLevels.length > 0,
    minScore !== undefined || maxScore !== undefined,
  ].filter(Boolean).length;

  return (
    <div className="p-2 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Buyers and Leads Database</h1>

      {/* Search bar */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search buyers, countries, imports..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>

          {activeFilterCount > 0 && (
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="gap-1"
            >
              <SlidersHorizontal className="h-4 w-4 mr-1" />
              Clear Filters
              <Badge variant="secondary" className="ml-1 rounded-full px-1.5">
                {activeFilterCount}
              </Badge>
            </Button>
          )}
        </div>
      </div>

      {/* Buyers table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>

            {/* Company Name Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Company Name
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Company Name
                      </h4>
                      <Input
                        placeholder="Search companies..."
                        value={nameFilter}
                        onChange={(e) => setNameFilter(e.target.value)}
                        className="h-8"
                      />
                      {nameFilter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setNameFilter("")}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            {/* Country/Region Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Country / Region
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Country/Region
                      </h4>
                      <div className="max-h-[300px] overflow-y-auto space-y-1">
                        {countries.map((country) => (
                          <div
                            key={country}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`country-${country}`}
                              checked={selectedCountries.includes(country)}
                              onCheckedChange={() =>
                                toggleSelection(
                                  country,
                                  selectedCountries,
                                  setSelectedCountries
                                )
                              }
                            />
                            <label
                              htmlFor={`country-${country}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {country}
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedCountries.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedCountries([])}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear selection
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            {/* Imports Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Imports
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by Imports</h4>
                      <div className="max-h-[300px] overflow-y-auto space-y-1">
                        {allImports.map((item) => (
                          <div
                            key={item}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`import-${item}`}
                              checked={selectedImports.includes(item)}
                              onCheckedChange={() =>
                                toggleSelection(
                                  item,
                                  selectedImports,
                                  setSelectedImports
                                )
                              }
                            />
                            <label
                              htmlFor={`import-${item}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {item}
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedImports.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedImports([])}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear selection
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            {/* Supplier Countries Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Supplier Countries
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Supplier Countries
                      </h4>
                      <div className="max-h-[300px] overflow-y-auto space-y-1">
                        {supplierCountries.map((country) => (
                          <div
                            key={country}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`supplier-${country}`}
                              checked={selectedSupplierCountries.includes(
                                country
                              )}
                              onCheckedChange={() =>
                                toggleSelection(
                                  country,
                                  selectedSupplierCountries,
                                  setSelectedSupplierCountries
                                )
                              }
                            />
                            <label
                              htmlFor={`supplier-${country}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {country}
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedSupplierCountries.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedSupplierCountries([])}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear selection
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            {/* Frequency Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Frequency
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Frequency
                      </h4>
                      <div className="space-y-1">
                        {frequencies.map((freq) => (
                          <div
                            key={freq}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`freq-${freq}`}
                              checked={selectedFrequencies.includes(freq)}
                              onCheckedChange={() => toggleFrequency(freq)}
                            />
                            <label
                              htmlFor={`freq-${freq}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {freq}
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedFrequencies.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedFrequencies([])}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear selection
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            {/* Risk Level Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Risk Level
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Risk Level
                      </h4>
                      <div className="space-y-1">
                        {riskLevels.map((level) => (
                          <div
                            key={level}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`risk-${level}`}
                              checked={selectedRiskLevels.includes(level)}
                              onCheckedChange={() => toggleRiskLevel(level)}
                            />
                            <label
                              htmlFor={`risk-${level}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {level}
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedRiskLevels.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedRiskLevels([])}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear selection
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            {/* Fit Score Column with Filter */}
            <TableHead className="text-right">
              <div className="flex items-center justify-end">
                Fit Score
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-6 w-6 ml-1"
                    >
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Fit Score
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">
                            Min %
                          </label>
                          <Input
                            type="number"
                            placeholder="Min"
                            value={minScore || ""}
                            onChange={(e) =>
                              setMinScore(
                                e.target.value
                                  ? Number.parseInt(e.target.value)
                                  : undefined
                              )
                            }
                            className="h-8"
                            min="0"
                            max="100"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">
                            Max %
                          </label>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={maxScore || ""}
                            onChange={(e) =>
                              setMaxScore(
                                e.target.value
                                  ? Number.parseInt(e.target.value)
                                  : undefined
                              )
                            }
                            className="h-8"
                            min="0"
                            max="100"
                          />
                        </div>
                      </div>
                      {(minScore !== undefined || maxScore !== undefined) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setMinScore(undefined);
                            setMaxScore(undefined);
                          }}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            <TableHead className="w-24">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredBuyers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="h-24 text-center">
                No buyers found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            filteredBuyers.map((buyer, index) => (
              <TableRow key={buyer.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{buyer.companyName}</TableCell>
                <TableCell>{buyer.countryRegion}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {buyer.imports.map((item) => (
                      <Badge
                        key={item}
                        variant="outline"
                        className="px-1.5 py-0 text-xs"
                      >
                        {item}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {buyer.supplierCountries.map((country) => (
                      <Badge
                        key={country}
                        variant="secondary"
                        className="px-1.5 py-0 text-xs"
                      >
                        {country}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell>{buyer.frequency}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      buyer.riskLevel === "Low"
                        ? "outline"
                        : buyer.riskLevel === "Medium"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {buyer.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {buyer.fitScore}%
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleViewBuyer(buyer)}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditBuyer(buyer)}
                      title="Edit buyer"
                    >
                      <Pencil className="h-4 w-4" />
                      <span className="sr-only">Edit</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteBuyer(buyer)}
                      title="Delete buyer"
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Delete</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {/* Buyer details drawer */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetContent className="sm:max-w-md">
          {selectedBuyer && (
            <>
              <SheetHeader>
                <SheetTitle>{selectedBuyer.companyName}</SheetTitle>
                <SheetDescription>
                  Buyer ID: {selectedBuyer.id}
                </SheetDescription>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Basic Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium">Country/Region</p>
                      <p>{selectedBuyer.countryRegion}</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Risk Level</p>
                      <Badge
                        variant={
                          selectedBuyer.riskLevel === "Low"
                            ? "outline"
                            : selectedBuyer.riskLevel === "Medium"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {selectedBuyer.riskLevel}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Fit Score</p>
                      <p>{selectedBuyer.fitScore}%</p>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Frequency</p>
                      <p>{selectedBuyer.frequency}</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Import Information
                  </h3>
                  <div>
                    <p className="text-sm font-medium">Imported Products</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedBuyer.imports.map((item) => (
                        <Badge key={item} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Supplier Information
                  </h3>
                  <div>
                    <p className="text-sm font-medium">Supplier Countries</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {selectedBuyer.supplierCountries.map((country) => (
                        <Badge key={country} variant="secondary">
                          {country}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2 pt-4">
                  <Button
                    onClick={() => handleEditBuyer(selectedBuyer)}
                    className="flex-1"
                  >
                    <Pencil className="h-4 w-4 mr-2" />
                    Edit Buyer
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsDrawerOpen(false)}
                    className="flex-1"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
}
