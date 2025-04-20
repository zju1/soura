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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Eye,
  Trash2,
  Search,
  X,
  ChevronDown,
  SlidersHorizontal,
} from "lucide-react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";

// Define types
type RiskLevel = "Low" | "Medium" | "High";
type Supplier = {
  id: number;
  name: string;
  country: string;
  productTags: string[];
  shipments: number;
  lastShipment: Date;
  topClients: string[];
  riskLevel: RiskLevel;
  matchScore: number;
};

// Sample data
const suppliers: Supplier[] = [
  {
    id: 1,
    name: "Shanghai Textile Co., Ltd.",
    country: "China",
    productTags: ["Cotton", "Polyester", "Fabric"],
    shipments: 342,
    lastShipment: new Date("2023-12-15"),
    topClients: ["Gap Inc.", "H&M", "Zara"],
    riskLevel: "Low",
    matchScore: 92,
  },
  {
    id: 2,
    name: "Vietnam Garment Manufacturing",
    country: "Vietnam",
    productTags: ["Apparel", "Clothing", "T-shirts"],
    shipments: 187,
    lastShipment: new Date("2024-01-22"),
    topClients: ["Nike", "Adidas", "Under Armour"],
    riskLevel: "Low",
    matchScore: 88,
  },
  {
    id: 3,
    name: "Guangzhou Electronics Ltd.",
    country: "China",
    productTags: ["Electronics", "Components", "Cables"],
    shipments: 456,
    lastShipment: new Date("2024-02-05"),
    topClients: ["Apple", "Samsung", "Sony"],
    riskLevel: "Medium",
    matchScore: 75,
  },
  {
    id: 4,
    name: "Mumbai Textiles Pvt Ltd",
    country: "India",
    productTags: ["Cotton", "Silk", "Fabric"],
    shipments: 124,
    lastShipment: new Date("2023-11-30"),
    topClients: ["Target", "Walmart", "Macy's"],
    riskLevel: "Medium",
    matchScore: 82,
  },
  {
    id: 5,
    name: "Jakarta Furniture Exports",
    country: "Indonesia",
    productTags: ["Furniture", "Wood", "Home Decor"],
    shipments: 98,
    lastShipment: new Date("2024-01-10"),
    topClients: ["IKEA", "Wayfair", "Ashley Furniture"],
    riskLevel: "Low",
    matchScore: 79,
  },
  {
    id: 6,
    name: "Shenzhen Tech Components",
    country: "China",
    productTags: ["Electronics", "Chips", "Batteries"],
    shipments: 521,
    lastShipment: new Date("2024-02-18"),
    topClients: ["Dell", "HP", "Lenovo"],
    riskLevel: "High",
    matchScore: 94,
  },
  {
    id: 7,
    name: "Bangkok Plastics Co.",
    country: "Thailand",
    productTags: ["Plastics", "Packaging", "Containers"],
    shipments: 213,
    lastShipment: new Date("2023-12-28"),
    topClients: ["Procter & Gamble", "Unilever", "Nestlé"],
    riskLevel: "Medium",
    matchScore: 68,
  },
  {
    id: 8,
    name: "Dhaka Apparel Manufacturers",
    country: "Bangladesh",
    productTags: ["Clothing", "Textiles", "Garments"],
    shipments: 276,
    lastShipment: new Date("2024-01-05"),
    topClients: ["Gap", "Old Navy", "H&M"],
    riskLevel: "High",
    matchScore: 85,
  },
  {
    id: 9,
    name: "Seoul Electronics Corp.",
    country: "South Korea",
    productTags: ["Electronics", "Displays", "Semiconductors"],
    shipments: 389,
    lastShipment: new Date("2024-02-10"),
    topClients: ["LG", "Samsung", "Sony"],
    riskLevel: "Low",
    matchScore: 91,
  },
  {
    id: 10,
    name: "Taipei Precision Components",
    country: "Taiwan",
    productTags: ["Electronics", "Computer Parts", "Precision Tools"],
    shipments: 412,
    lastShipment: new Date("2024-01-30"),
    topClients: ["Apple", "Microsoft", "Intel"],
    riskLevel: "Low",
    matchScore: 87,
  },
];

// Get unique values for filters
const countries = Array.from(new Set(suppliers.map((s) => s.country))).sort();
const allTags = Array.from(
  new Set(suppliers.flatMap((s) => s.productTags))
).sort();
const riskLevels: RiskLevel[] = ["Low", "Medium", "High"];

export default function SupplierDatabase() {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedRiskLevels, setSelectedRiskLevels] = useState<RiskLevel[]>([]);
  const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({});
  const [minShipments, setMinShipments] = useState<number | undefined>();
  const [maxShipments, setMaxShipments] = useState<number | undefined>();
  const [minScore, setMinScore] = useState<number | undefined>();
  const [maxScore, setMaxScore] = useState<number | undefined>();
  const [clientFilter, setClientFilter] = useState("");
  const navigate = useNavigate();
  // Filter suppliers based on all criteria
  const filteredSuppliers = suppliers.filter((supplier) => {
    // Global search query filter
    if (
      searchQuery &&
      !supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !supplier.country.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !supplier.productTags.some((tag) =>
        tag.toLowerCase().includes(searchQuery.toLowerCase())
      ) &&
      !supplier.topClients.some((client) =>
        client.toLowerCase().includes(searchQuery.toLowerCase())
      )
    ) {
      return false;
    }

    // Name filter
    if (
      nameFilter &&
      !supplier.name.toLowerCase().includes(nameFilter.toLowerCase())
    ) {
      return false;
    }

    // Country filter
    if (
      selectedCountries.length > 0 &&
      !selectedCountries.includes(supplier.country)
    ) {
      return false;
    }

    // Tags filter
    if (
      selectedTags.length > 0 &&
      !supplier.productTags.some((tag) => selectedTags.includes(tag))
    ) {
      return false;
    }

    // Risk level filter
    if (
      selectedRiskLevels.length > 0 &&
      !selectedRiskLevels.includes(supplier.riskLevel)
    ) {
      return false;
    }

    // Date range filter
    if (dateRange.from && supplier.lastShipment < dateRange.from) {
      return false;
    }
    if (dateRange.to) {
      const toDateEnd = new Date(dateRange.to);
      toDateEnd.setHours(23, 59, 59, 999);
      if (supplier.lastShipment > toDateEnd) {
        return false;
      }
    }

    // Shipments range filter
    if (minShipments !== undefined && supplier.shipments < minShipments) {
      return false;
    }
    if (maxShipments !== undefined && supplier.shipments > maxShipments) {
      return false;
    }

    // Match score filter
    if (minScore !== undefined && supplier.matchScore < minScore) {
      return false;
    }
    if (maxScore !== undefined && supplier.matchScore > maxScore) {
      return false;
    }

    // Client filter
    if (
      clientFilter &&
      !supplier.topClients.some((client) =>
        client.toLowerCase().includes(clientFilter.toLowerCase())
      )
    ) {
      return false;
    }

    return true;
  });

  // Handle view supplier details

  // Handle delete supplier (placeholder)
  const handleDeleteSupplier = (supplier: Supplier) => {
    console.log("Delete supplier:", supplier);
    // Implementation would go here
  };

  // Clear all filters
  const clearAllFilters = () => {
    setSearchQuery("");
    setNameFilter("");
    setSelectedCountries([]);
    setSelectedTags([]);
    setSelectedRiskLevels([]);
    setDateRange({});
    setMinShipments(undefined);
    setMaxShipments(undefined);
    setMinScore(undefined);
    setMaxScore(undefined);
    setClientFilter("");
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
    selectedTags.length > 0,
    selectedRiskLevels.length > 0,
    dateRange.from || dateRange.to,
    minShipments !== undefined || maxShipments !== undefined,
    minScore !== undefined || maxScore !== undefined,
    clientFilter,
  ].filter(Boolean).length;

  return (
    <div className="p-4 lg:p-8">
      <h1 className="text-2xl font-bold mb-6">Supplier Database</h1>

      {/* Search bar */}
      <div className="mb-6 space-y-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search suppliers, countries, products..."
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

      {/* Suppliers table */}
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>

            {/* Supplier Name Column with Filter */}
            <TableHead>
              <Popover>
                <PopoverTrigger asChild>
                  <div className="flex items-center justify-between">
                    Supplier Name
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-60 p-3" align="end">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Filter by Name</h4>
                    <Input
                      placeholder="Search names..."
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
            </TableHead>

            {/* Country Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Country
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by Country</h4>
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

            {/* Product Tags Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Product Tags
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Product Tags
                      </h4>
                      <div className="max-h-[300px] overflow-y-auto space-y-1">
                        {allTags.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-2 py-2"
                          >
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={selectedTags.includes(tag)}
                              onCheckedChange={() =>
                                toggleSelection(
                                  tag,
                                  selectedTags,
                                  setSelectedTags
                                )
                              }
                            />
                            <label
                              htmlFor={`tag-${tag}`}
                              className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {tag}
                            </label>
                          </div>
                        ))}
                      </div>
                      {selectedTags.length > 0 && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setSelectedTags([])}
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

            {/* Shipments Column with Filter */}
            <TableHead className="text-right">
              <div className="flex items-center justify-end">
                Shipments
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
                        Filter by Shipments
                      </h4>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="text-xs text-muted-foreground">
                            Min
                          </label>
                          <Input
                            type="number"
                            placeholder="Min"
                            value={minShipments || ""}
                            onChange={(e) =>
                              setMinShipments(
                                e.target.value
                                  ? Number.parseInt(e.target.value)
                                  : undefined
                              )
                            }
                            className="h-8"
                          />
                        </div>
                        <div>
                          <label className="text-xs text-muted-foreground">
                            Max
                          </label>
                          <Input
                            type="number"
                            placeholder="Max"
                            value={maxShipments || ""}
                            onChange={(e) =>
                              setMaxShipments(
                                e.target.value
                                  ? Number.parseInt(e.target.value)
                                  : undefined
                              )
                            }
                            className="h-8"
                          />
                        </div>
                      </div>
                      {(minShipments !== undefined ||
                        maxShipments !== undefined) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setMinShipments(undefined);
                            setMaxShipments(undefined);
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

            {/* Last Shipment Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Last Shipment
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">
                        Filter by Date Range
                      </h4>

                      {(dateRange.from || dateRange.to) && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setDateRange({})}
                          className="h-auto p-0 text-muted-foreground text-xs"
                        >
                          Clear dates
                        </Button>
                      )}
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TableHead>

            {/* Top Clients Column with Filter */}
            <TableHead>
              <div className="flex items-center justify-between">
                Top Clients
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <ChevronDown className="h-3 w-3" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-60 p-3" align="end">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">Filter by Client</h4>
                      <Input
                        placeholder="Search clients..."
                        value={clientFilter}
                        onChange={(e) => setClientFilter(e.target.value)}
                        className="h-8"
                      />
                      {clientFilter && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setClientFilter("")}
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

            {/* Match Score Column with Filter */}
            <TableHead className="text-right">
              <div className="flex items-center justify-end">
                Match Score
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
                        Filter by Match Score
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
          {filteredSuppliers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={10} className="h-24 text-center">
                No suppliers found matching your criteria.
              </TableCell>
            </TableRow>
          ) : (
            filteredSuppliers.map((supplier, index) => (
              <TableRow key={supplier.id}>
                <TableCell className="font-medium">{index + 1}</TableCell>
                <TableCell>{supplier.name}</TableCell>
                <TableCell>{supplier.country}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {supplier.productTags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="px-1.5 py-0 text-xs"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {supplier.shipments}
                </TableCell>
                <TableCell>
                  {format(supplier.lastShipment, "MMM d, yyyy")}
                </TableCell>
                <TableCell>{supplier.topClients.join(", ")}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      supplier.riskLevel === "Low"
                        ? "outline"
                        : supplier.riskLevel === "Medium"
                        ? "secondary"
                        : "destructive"
                    }
                  >
                    {supplier.riskLevel}
                  </Badge>
                </TableCell>
                <TableCell className="text-right font-medium">
                  {supplier.matchScore}%
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => navigate("/suppliers/1")}
                      title="View details"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteSupplier(supplier)}
                      title="Delete supplier"
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
    </div>
  );
}
