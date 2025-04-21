"use client";

import { useState } from "react";
import {
  Link,
  Globe,
  Database,
  Box,
  Truck,
  BarChart,
  FileText,
  RefreshCw,
  Copy,
  Check,
  ChevronRight,
  AlertCircle,
  ExternalLink,
  Plus,
  Trash2,
  Settings,
  Eye,
  EyeOff,
  Clock,
  CheckCircle2,
  XCircle,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

// Mock data for integrations
const availableIntegrations = [
  {
    id: "importyeti",
    name: "ImportYeti",
    description: "Access global shipping data and supplier information",
    icon: <Globe className="h-6 w-6" />,
    category: "data",
    popular: true,
    connected: true,
  },
  {
    id: "supabase",
    name: "Supabase",
    description: "Database integration for storing and querying supplier data",
    icon: <Database className="h-6 w-6" />,
    category: "database",
    popular: true,
    connected: false,
  },
  {
    id: "shopify",
    name: "Shopify",
    description: "Connect your Shopify store to import products and orders",
    icon: <Box className="h-6 w-6" />,
    category: "ecommerce",
    popular: true,
    connected: false,
  },
  {
    id: "shipstation",
    name: "ShipStation",
    description: "Manage shipping and fulfillment with your suppliers",
    icon: <Truck className="h-6 w-6" />,
    category: "logistics",
    popular: false,
    connected: false,
  },
  {
    id: "tableau",
    name: "Tableau",
    description: "Advanced analytics and visualization for supplier data",
    icon: <BarChart className="h-6 w-6" />,
    category: "analytics",
    popular: false,
    connected: false,
  },
  {
    id: "docusign",
    name: "DocuSign",
    description: "Manage contracts and agreements with suppliers",
    icon: <FileText className="h-6 w-6" />,
    category: "documents",
    popular: false,
    connected: false,
  },
];

// Mock data for connected services
const connectedServices = [
  {
    id: "importyeti",
    name: "ImportYeti",
    status: "active",
    connectedAt: "2025-04-15T10:30:00Z",
    lastSync: "2025-04-22T08:15:00Z",
    dataPoints: 15876,
    icon: <Globe className="h-6 w-6" />,
  },
];

// Mock data for API usage
const apiUsageData = [
  { date: "Apr 16", requests: 245 },
  { date: "Apr 17", requests: 187 },
  { date: "Apr 18", requests: 352 },
  { date: "Apr 19", requests: 128 },
  { date: "Apr 20", requests: 64 },
  { date: "Apr 21", requests: 312 },
  { date: "Apr 22", requests: 198 },
];

// Mock data for webhooks
const webhooks = [
  {
    id: "wh_1",
    url: "https://example.com/webhook/supplier-updates",
    event: "supplier.updated",
    status: "active",
    createdAt: "2025-03-10T14:30:00Z",
    lastTriggered: "2025-04-21T09:45:00Z",
  },
  {
    id: "wh_2",
    url: "https://example.com/webhook/new-shipments",
    event: "shipment.created",
    status: "active",
    createdAt: "2025-03-15T11:20:00Z",
    lastTriggered: "2025-04-22T07:30:00Z",
  },
];

export function IntegrationsPage() {
  const [activeTab, setActiveTab] = useState("overview");
  const [apiKey, setApiKey] = useState(
    "sk_live_51NzQjKLkMG8KHVrXsYYYYYYYYYYYYYYYYYYYYYYYY"
  );
  const [showApiKey, setShowApiKey] = useState(false);
  const [apiEnabled, setApiEnabled] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("");
  const [webhookEvent, setWebhookEvent] = useState("supplier.updated");
  const [copied, setCopied] = useState(false);
  const [filterCategory, setFilterCategory] = useState("all");

  // Function to copy API key
  const copyApiKey = () => {
    navigator.clipboard.writeText(apiKey);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Function to generate a new API key
  const generateNewApiKey = () => {
    // In a real app, this would call an API to generate a new key
    setApiKey("sk_live_" + Math.random().toString(36).substring(2, 30));
  };

  // Function to format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Function to format time ago
  const timeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + " years ago";

    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + " months ago";

    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + " days ago";

    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + " hours ago";

    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + " minutes ago";

    return Math.floor(seconds) + " seconds ago";
  };

  // Filter integrations by category
  const filteredIntegrations =
    filterCategory === "all"
      ? availableIntegrations
      : availableIntegrations.filter(
          (integration) => integration.category === filterCategory
        );

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Integrations
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Connect your account with third-party services and manage your API
          access
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-4 w-full max-w-2xl">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="api">API</TabsTrigger>
          <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
          <TabsTrigger value="connected">Connected</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">API</CardTitle>
                <CardDescription>
                  Manage your API keys and access
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={apiEnabled ? "default" : "outline"}
                      className={
                        apiEnabled
                          ? "bg-green-100 text-green-800 hover:bg-green-100"
                          : ""
                      }
                    >
                      {apiEnabled ? "Active" : "Inactive"}
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {apiUsageData.reduce((sum, day) => sum + day.requests, 0)}{" "}
                      requests this week
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveTab("api")}
                >
                  Manage API
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Webhooks</CardTitle>
                <CardDescription>Configure event notifications</CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-blue-100 text-blue-800 hover:bg-blue-100"
                    >
                      {webhooks.length} Active
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      Last triggered {timeAgo(webhooks[0].lastTriggered)}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveTab("webhooks")}
                >
                  Manage Webhooks
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Connected Services</CardTitle>
                <CardDescription>
                  Manage third-party integrations
                </CardDescription>
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="bg-purple-100 text-purple-800 hover:bg-purple-100"
                    >
                      {connectedServices.length} Connected
                    </Badge>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {availableIntegrations.length} available
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  onClick={() => setActiveTab("connected")}
                >
                  Manage Connections
                  <ChevronRight className="ml-auto h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Available Integrations
              </h2>
              <Select value={filterCategory} onValueChange={setFilterCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="data">Data Sources</SelectItem>
                  <SelectItem value="database">Databases</SelectItem>
                  <SelectItem value="ecommerce">E-Commerce</SelectItem>
                  <SelectItem value="logistics">Logistics</SelectItem>
                  <SelectItem value="analytics">Analytics</SelectItem>
                  <SelectItem value="documents">Documents</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredIntegrations.map((integration) => (
                <Card key={integration.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {integration.icon}
                        </div>
                        <div>
                          <CardTitle className="text-lg flex items-center gap-2">
                            {integration.name}
                            {integration.popular && (
                              <Badge
                                variant="outline"
                                className="text-xs bg-yellow-50 text-yellow-800 border-yellow-200"
                              >
                                Popular
                              </Badge>
                            )}
                          </CardTitle>
                          <CardDescription className="text-sm mt-0.5">
                            {integration.description}
                          </CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardFooter className="pt-0">
                    {integration.connected ? (
                      <div className="flex items-center justify-between w-full">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Connected
                        </Badge>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setActiveTab("connected")}
                        >
                          Manage
                        </Button>
                      </div>
                    ) : (
                      <Button variant="outline" size="sm" className="w-full">
                        Connect
                      </Button>
                    )}
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </TabsContent>

        {/* API Tab */}
        <TabsContent value="api" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>API Access</CardTitle>
              <CardDescription>
                Manage your API keys and access settings for programmatic access
                to your data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    API Status
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable or disable API access
                  </p>
                </div>
                <Switch checked={apiEnabled} onCheckedChange={setApiEnabled} />
              </div>

              {apiEnabled && (
                <>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                        API Key
                      </h3>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={generateNewApiKey}
                      >
                        <RefreshCw className="mr-2 h-3.5 w-3.5" />
                        Regenerate
                      </Button>
                    </div>
                    <div className="flex">
                      <div className="relative flex-1">
                        <Input
                          type={showApiKey ? "text" : "password"}
                          value={apiKey}
                          readOnly
                          className="pr-10"
                        />
                        <button
                          type="button"
                          onClick={() => setShowApiKey(!showApiKey)}
                          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
                        >
                          {showApiKey ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                        </button>
                      </div>
                      <Button
                        variant="secondary"
                        className="ml-2"
                        onClick={copyApiKey}
                      >
                        {copied ? (
                          <Check className="h-4 w-4" />
                        ) : (
                          <Copy className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      This key grants full access to your API. Keep it secure
                      and never share it publicly.
                    </p>
                  </div>

                  <Alert variant="default">
                    <AlertCircle className="h-4 w-4" />
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                      Regenerating your API key will invalidate your existing
                      key and may break integrations. Make sure to update your
                      key in all connected applications.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      API Usage
                    </h3>
                    <div className="h-48 bg-gray-50 dark:bg-gray-800 rounded-md p-4">
                      <div className="flex items-end justify-between h-32">
                        {apiUsageData.map((day, i) => (
                          <div key={i} className="flex flex-col items-center">
                            <div
                              className="w-10 bg-blue-500 rounded-t-sm"
                              style={{
                                height: `${(day.requests / 400) * 100}%`,
                              }}
                            ></div>
                            <span className="text-xs text-gray-500 mt-1">
                              {day.date}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500 dark:text-gray-400">
                        Total Requests:{" "}
                        {apiUsageData.reduce(
                          (sum, day) => sum + day.requests,
                          0
                        )}
                      </span>
                      <span className="text-gray-500 dark:text-gray-400">
                        Limit: 10,000 / month
                      </span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Rate Limits
                    </h3>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Plan</TableHead>
                          <TableHead>Requests per minute</TableHead>
                          <TableHead>Requests per day</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        <TableRow>
                          <TableCell className="font-medium">Free</TableCell>
                          <TableCell>10</TableCell>
                          <TableCell>1,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">Pro</TableCell>
                          <TableCell>60</TableCell>
                          <TableCell>10,000</TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell className="font-medium">
                            Enterprise
                          </TableCell>
                          <TableCell>300</TableCell>
                          <TableCell>Unlimited</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </div>
                </>
              )}
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("overview")}
              >
                Back to Overview
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>API Documentation</CardTitle>
              <CardDescription>
                Resources to help you integrate with our API
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="#"
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="mr-4 p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                    <FileText className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Getting Started
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Learn the basics of our API
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>

                <a
                  href="#"
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="mr-4 p-2 bg-green-100 dark:bg-green-900 rounded-md">
                    <FileText className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      API Reference
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Complete API documentation
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>

                <a
                  href="#"
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="mr-4 p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
                    <FileText className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Code Examples
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Sample code in various languages
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>

                <a
                  href="#"
                  className="flex items-center p-4 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800"
                >
                  <div className="mr-4 p-2 bg-orange-100 dark:bg-orange-900 rounded-md">
                    <FileText className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                      Changelog
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Recent API updates and changes
                    </p>
                  </div>
                  <ExternalLink className="ml-auto h-4 w-4 text-gray-400" />
                </a>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Webhooks Tab */}
        <TabsContent value="webhooks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Webhooks</CardTitle>
              <CardDescription>
                Configure webhooks to receive real-time notifications when
                events occur in your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Active Webhooks
                  </h3>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button size="sm">
                        <Plus className="mr-2 h-4 w-4" />
                        Add Webhook
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Add New Webhook</DialogTitle>
                        <DialogDescription>
                          Create a new webhook to receive notifications for
                          specific events
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Endpoint URL
                          </label>
                          <Input
                            placeholder="https://example.com/webhook"
                            value={webhookUrl}
                            onChange={(e) => setWebhookUrl(e.target.value)}
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                            Event Type
                          </label>
                          <Select
                            value={webhookEvent}
                            onValueChange={setWebhookEvent}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select event" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="supplier.created">
                                supplier.created
                              </SelectItem>
                              <SelectItem value="supplier.updated">
                                supplier.updated
                              </SelectItem>
                              <SelectItem value="shipment.created">
                                shipment.created
                              </SelectItem>
                              <SelectItem value="shipment.updated">
                                shipment.updated
                              </SelectItem>
                              <SelectItem value="order.created">
                                order.created
                              </SelectItem>
                              <SelectItem value="order.updated">
                                order.updated
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button variant="outline">Cancel</Button>
                        <Button>Create Webhook</Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>

                <div className="border border-gray-200 dark:border-gray-700 rounded-md overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>URL</TableHead>
                        <TableHead>Event</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Last Triggered</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {webhooks.map((webhook) => (
                        <TableRow key={webhook.id}>
                          <TableCell className="font-medium max-w-[200px] truncate">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <span className="cursor-help">
                                    {webhook.url}
                                  </span>
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{webhook.url}</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-gray-100 text-gray-800 border-gray-200"
                            >
                              {webhook.event}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                webhook.status === "active"
                                  ? "bg-green-100 text-green-800 border-green-200"
                                  : "bg-yellow-100 text-yellow-800 border-yellow-200"
                              }
                            >
                              {webhook.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center">
                              <Clock className="mr-1 h-3 w-3 text-gray-400" />
                              <span className="text-sm text-gray-600 dark:text-gray-400">
                                {timeAgo(webhook.lastTriggered)}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                              >
                                <Settings className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 text-red-600 hover:text-red-700 hover:bg-red-50"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Webhook Events
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Supplier Events
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-32">supplier.created</span>
                        <span className="text-xs text-gray-500">
                          When a new supplier is added
                        </span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-32">supplier.updated</span>
                        <span className="text-xs text-gray-500">
                          When supplier details change
                        </span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-32">supplier.deleted</span>
                        <span className="text-xs text-gray-500">
                          When a supplier is removed
                        </span>
                      </li>
                    </ul>
                  </div>

                  <div className="border border-gray-200 dark:border-gray-700 rounded-md p-3">
                    <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                      Shipment Events
                    </h4>
                    <ul className="space-y-2">
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-32">shipment.created</span>
                        <span className="text-xs text-gray-500">
                          When a new shipment is recorded
                        </span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-32">shipment.updated</span>
                        <span className="text-xs text-gray-500">
                          When shipment details change
                        </span>
                      </li>
                      <li className="text-sm text-gray-600 dark:text-gray-400 flex items-center">
                        <span className="w-32">shipment.delivered</span>
                        <span className="text-xs text-gray-500">
                          When a shipment is delivered
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              <Alert>
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Webhook Security</AlertTitle>
                <AlertDescription>
                  All webhook requests include a signature in the{" "}
                  <code>X-Signature</code> header. Verify this signature to
                  ensure the request came from our servers.
                </AlertDescription>
              </Alert>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("overview")}
              >
                Back to Overview
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Connected Services Tab */}
        <TabsContent value="connected" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Connected Services</CardTitle>
              <CardDescription>
                Manage your connections to third-party services and platforms
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Active Connections
                  </h3>
                  <Button size="sm" onClick={() => setActiveTab("overview")}>
                    <Plus className="mr-2 h-4 w-4" />
                    Add Connection
                  </Button>
                </div>

                {connectedServices.length > 0 ? (
                  <div className="space-y-4">
                    {connectedServices.map((service) => (
                      <div
                        key={service.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-md p-4"
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-10 h-10 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                              {service.icon}
                            </div>
                            <div>
                              <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {service.name}
                              </h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                Connected {formatDate(service.connectedAt)}
                              </p>
                            </div>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              service.status === "active"
                                ? "bg-green-100 text-green-800 border-green-200"
                                : "bg-yellow-100 text-yellow-800 border-yellow-200"
                            }
                          >
                            {service.status}
                          </Badge>
                        </div>

                        <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Last Sync
                            </p>
                            <div className="flex items-center">
                              <Clock className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {timeAgo(service.lastSync)}
                              </p>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Data Points
                            </p>
                            <div className="flex items-center">
                              <Database className="mr-1.5 h-3.5 w-3.5 text-gray-400" />
                              <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {service.dataPoints.toLocaleString()}
                              </p>
                            </div>
                          </div>

                          <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-3">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                              Status
                            </p>
                            <div className="flex items-center">
                              {service.status === "active" ? (
                                <CheckCircle2 className="mr-1.5 h-3.5 w-3.5 text-green-500" />
                              ) : (
                                <XCircle className="mr-1.5 h-3.5 w-3.5 text-red-500" />
                              )}
                              <p className="text-sm font-medium text-gray-900 dark:text-white capitalize">
                                {service.status}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex items-center justify-end gap-2">
                          <Button variant="outline" size="sm">
                            <RefreshCw className="mr-2 h-3.5 w-3.5" />
                            Sync Now
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="mr-2 h-3.5 w-3.5" />
                            Configure
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                          >
                            Disconnect
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 px-4 border border-dashed border-gray-300 dark:border-gray-700 rounded-md">
                    <div className="bg-gray-100 dark:bg-gray-800 p-3 rounded-full mb-4">
                      <Link className="h-6 w-6 text-gray-500" />
                    </div>
                    <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-1">
                      No Connected Services
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
                      You haven't connected any third-party services yet
                    </p>
                    <Button onClick={() => setActiveTab("overview")}>
                      Browse Integrations
                    </Button>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Available Integrations
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {availableIntegrations
                    .filter((integration) => !integration.connected)
                    .slice(0, 3)
                    .map((integration) => (
                      <div
                        key={integration.id}
                        className="border border-gray-200 dark:border-gray-700 rounded-md p-3 flex items-center"
                      >
                        <div className="flex items-center justify-center w-8 h-8 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 mr-3">
                          {integration.icon}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {integration.name}
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                            {integration.description}
                          </p>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-2">
                          Connect
                        </Button>
                      </div>
                    ))}
                </div>
                <div className="text-center">
                  <Button
                    variant="link"
                    onClick={() => setActiveTab("overview")}
                  >
                    View All Integrations
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => setActiveTab("overview")}
              >
                Back to Overview
              </Button>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
