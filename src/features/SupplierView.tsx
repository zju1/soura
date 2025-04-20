"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Phone,
  Calendar,
  MapPin,
  Globe,
  Ship,
  Package,
  BarChart3,
  DollarSign,
  Flag,
  Info,
  Eye,
  ExternalLink,
} from "lucide-react";

// Sample supplier data based on the ImportYeti page
const supplierData = {
  id: "lgm-usa",
  name: "Lgm Usa",
  type: "Company",
  country: "US",
  address: "14808 Los Angeles St, Baldwin Park, Ca 91706, US",
  location: {
    city: "Baldwin Park",
    county: "Los Angeles County",
    state: "California",
  },
  aliases: {
    names: 1,
    addresses: 11,
  },
  phone: "(909) 549-9000",
  lastShipment: {
    date: "03/25/2023",
    databaseUpdated: "03/31/2023",
  },
  metrics: {
    totalSeaShipments: 1160,
    avgTeuPerShipment: 1.64,
    avgTeuPerMonth: 33.5,
    estShippingSpend: "$2M",
    coverage: "64%",
  },
};

// Sample shipment data
const shipmentData = [
  {
    id: "SH12345",
    date: "03/25/2023",
    origin: "Shanghai, China",
    destination: "Los Angeles, CA",
    carrier: "COSCO Shipping",
    products: ["Furniture", "Home Decor"],
    weight: "4,500 kg",
    teu: 1.5,
  },
  {
    id: "SH12344",
    date: "02/18/2023",
    origin: "Shenzhen, China",
    destination: "Los Angeles, CA",
    carrier: "Maersk",
    products: ["Electronics", "Accessories"],
    weight: "3,200 kg",
    teu: 1.0,
  },
  {
    id: "SH12343",
    date: "01/05/2023",
    origin: "Ningbo, China",
    destination: "Los Angeles, CA",
    carrier: "MSC",
    products: ["Furniture", "Lighting"],
    weight: "5,800 kg",
    teu: 2.0,
  },
  {
    id: "SH12342",
    date: "12/12/2022",
    origin: "Guangzhou, China",
    destination: "Los Angeles, CA",
    carrier: "Evergreen",
    products: ["Home Decor", "Kitchenware"],
    weight: "2,900 kg",
    teu: 1.0,
  },
  {
    id: "SH12341",
    date: "11/28/2022",
    origin: "Qingdao, China",
    destination: "Los Angeles, CA",
    carrier: "OOCL",
    products: ["Furniture", "Office Supplies"],
    weight: "4,100 kg",
    teu: 1.5,
  },
];

// Sample supplier connections
const supplierConnections = [
  {
    id: "sup-1",
    name: "Shanghai Furniture Co.",
    country: "China",
    shipments: 245,
    lastShipment: "03/25/2023",
    products: ["Furniture", "Home Decor"],
  },
  {
    id: "sup-2",
    name: "Guangzhou Electronics Ltd.",
    country: "China",
    shipments: 187,
    lastShipment: "02/18/2023",
    products: ["Electronics", "Accessories"],
  },
  {
    id: "sup-3",
    name: "Ningbo Home Products",
    country: "China",
    shipments: 156,
    lastShipment: "01/05/2023",
    products: ["Furniture", "Lighting"],
  },
  {
    id: "sup-4",
    name: "Shenzhen Decor Exports",
    country: "China",
    shipments: 132,
    lastShipment: "12/12/2022",
    products: ["Home Decor", "Kitchenware"],
  },
  {
    id: "sup-5",
    name: "Qingdao Office Supplies",
    country: "China",
    shipments: 98,
    lastShipment: "11/28/2022",
    products: ["Furniture", "Office Supplies"],
  },
];

export default function SupplierView() {
  const [activeTab, setActiveTab] = useState("overview");

  return (
    <div className="p-2 lg:p-8">
      <div className="bg-white rounded-lg border shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-2xl font-bold">{supplierData.name}</h1>
              <Badge variant="outline" className="font-normal">
                {supplierData.type}
              </Badge>
              <div className="flex items-center justify-center w-6 h-6 rounded overflow-hidden border">
                <Flag className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>{supplierData.address}</span>
              </div>

              <div className="flex items-start gap-2">
                <Globe className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex items-center gap-1">
                  <span>Location matches found:</span>
                  <a href="#" className="text-blue-600 hover:underline">
                    {supplierData.location.city}
                  </a>
                  <span className="text-muted-foreground">(nearest)</span>
                  <span>›</span>
                  <a href="#" className="text-blue-600 hover:underline">
                    {supplierData.location.county}
                  </a>
                  <span>›</span>
                  <a href="#" className="text-blue-600 hover:underline">
                    {supplierData.location.state}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Info className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <div className="flex items-center gap-1">
                  <span>
                    Also imports under {supplierData.aliases.names} names and{" "}
                    {supplierData.aliases.addresses} addresses
                  </span>
                  <a href="#" className="text-blue-600 hover:underline">
                    View list
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>Phone Number: {supplierData.phone}</span>
              </div>

              <div className="flex items-start gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                <span>
                  Most Recent Shipment: {supplierData.lastShipment.date}
                  <span className="text-muted-foreground ml-1">
                    (Database Updated:{" "}
                    {supplierData.lastShipment.databaseUpdated})
                  </span>
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="w-4 h-4" />
                <span>Name</span>
              </Button>
              <Button variant="outline" size="sm" className="gap-1">
                <ExternalLink className="w-4 h-4" />
                <span>Address</span>
              </Button>
            </div>
            <Button variant="outline" size="sm">
              Show More
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="p-4 flex items-center gap-3">
            <div className="bg-blue-50 p-2 rounded-full">
              <Ship className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Total Sea Shipments
              </p>
              <p className="text-xl font-semibold">
                {supplierData.metrics.totalSeaShipments.toLocaleString()}
              </p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="bg-green-50 p-2 rounded-full">
              <Package className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Avg. TEU per Shipment
              </p>
              <p className="text-xl font-semibold">
                {supplierData.metrics.avgTeuPerShipment}
              </p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="bg-purple-50 p-2 rounded-full">
              <BarChart3 className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Avg. TEU per Month
              </p>
              <p className="text-xl font-semibold">
                {supplierData.metrics.avgTeuPerMonth}
              </p>
            </div>
          </Card>

          <Card className="p-4 flex items-center gap-3">
            <div className="bg-amber-50 p-2 rounded-full">
              <DollarSign className="w-5 h-5 text-amber-500" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                Est. Shipping Spend
              </p>
              <div className="flex items-center gap-1">
                <p className="text-xl font-semibold">
                  {supplierData.metrics.estShippingSpend}
                </p>
                <Badge variant="outline" className="text-xs">
                  {supplierData.metrics.coverage} coverage
                </Badge>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-6">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="shipments">Shipments</TabsTrigger>
          <TabsTrigger value="suppliers">Suppliers</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">
                Company Information
              </h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Company Name:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.name}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Country:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.country}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Address:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.address}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">Phone:</span>
                  <span className="text-sm col-span-2">
                    {supplierData.phone}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Last Shipment:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.lastShipment.date}
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Shipping Metrics</h3>
              <div className="space-y-3">
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Total Shipments:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.metrics.totalSeaShipments.toLocaleString()}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Avg. TEU/Shipment:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.metrics.avgTeuPerShipment}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Avg. TEU/Month:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.metrics.avgTeuPerMonth}
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-sm text-muted-foreground">
                    Est. Shipping Spend:
                  </span>
                  <span className="text-sm col-span-2">
                    {supplierData.metrics.estShippingSpend} (
                    {supplierData.metrics.coverage} coverage)
                  </span>
                </div>
              </div>
            </Card>

            <Card className="p-6 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Recent Shipments</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Origin
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Products
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Weight
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        TEU
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {shipmentData.slice(0, 3).map((shipment) => (
                      <tr
                        key={shipment.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-2 px-3 text-sm">{shipment.date}</td>
                        <td className="py-2 px-3 text-sm">{shipment.origin}</td>
                        <td className="py-2 px-3 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {shipment.products.map((product) => (
                              <Badge
                                key={product}
                                variant="secondary"
                                className="text-xs"
                              >
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-sm">{shipment.weight}</td>
                        <td className="py-2 px-3 text-sm">{shipment.teu}</td>
                        <td className="py-2 px-3 text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6 md:col-span-2">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Top Suppliers</h3>
                <Button variant="outline" size="sm">
                  View All
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Supplier
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Country
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Shipments
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Last Shipment
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Products
                      </th>
                      <th className="text-left py-2 px-3 text-sm font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {supplierConnections.slice(0, 3).map((supplier) => (
                      <tr
                        key={supplier.id}
                        className="border-b hover:bg-gray-50"
                      >
                        <td className="py-2 px-3 text-sm font-medium text-blue-600 hover:underline">
                          <a href="#">{supplier.name}</a>
                        </td>
                        <td className="py-2 px-3 text-sm">
                          {supplier.country}
                        </td>
                        <td className="py-2 px-3 text-sm">
                          {supplier.shipments}
                        </td>
                        <td className="py-2 px-3 text-sm">
                          {supplier.lastShipment}
                        </td>
                        <td className="py-2 px-3 text-sm">
                          <div className="flex flex-wrap gap-1">
                            {supplier.products.map((product) => (
                              <Badge
                                key={product}
                                variant="outline"
                                className="text-xs"
                              >
                                {product}
                              </Badge>
                            ))}
                          </div>
                        </td>
                        <td className="py-2 px-3 text-sm">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="shipments" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Shipments</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Date
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      ID
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Origin
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Destination
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Carrier
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Products
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Weight
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      TEU
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {shipmentData.map((shipment) => (
                    <tr key={shipment.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 text-sm">{shipment.date}</td>
                      <td className="py-2 px-3 text-sm">{shipment.id}</td>
                      <td className="py-2 px-3 text-sm">{shipment.origin}</td>
                      <td className="py-2 px-3 text-sm">
                        {shipment.destination}
                      </td>
                      <td className="py-2 px-3 text-sm">{shipment.carrier}</td>
                      <td className="py-2 px-3 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {shipment.products.map((product) => (
                            <Badge
                              key={product}
                              variant="secondary"
                              className="text-xs"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm">{shipment.weight}</td>
                      <td className="py-2 px-3 text-sm">{shipment.teu}</td>
                      <td className="py-2 px-3 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="suppliers" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">All Suppliers</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  Filter
                </Button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Supplier
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Country
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Shipments
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Last Shipment
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Products
                    </th>
                    <th className="text-left py-2 px-3 text-sm font-medium">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {supplierConnections.map((supplier) => (
                    <tr key={supplier.id} className="border-b hover:bg-gray-50">
                      <td className="py-2 px-3 text-sm font-medium text-blue-600 hover:underline">
                        <a href="#">{supplier.name}</a>
                      </td>
                      <td className="py-2 px-3 text-sm">{supplier.country}</td>
                      <td className="py-2 px-3 text-sm">
                        {supplier.shipments}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        {supplier.lastShipment}
                      </td>
                      <td className="py-2 px-3 text-sm">
                        <div className="flex flex-wrap gap-1">
                          {supplier.products.map((product) => (
                            <Badge
                              key={product}
                              variant="outline"
                              className="text-xs"
                            >
                              {product}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-2 px-3 text-sm">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
