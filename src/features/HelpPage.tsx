"use client";

import { useState } from "react";
import {
  Search,
  HelpCircle,
  FileText,
  MessageSquare,
  Play,
  Book,
  Lightbulb,
  Users,
  ChevronRight,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  ArrowRight,
  Clock,
  ThumbsUp,
  ThumbsDown,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

// Mock data for FAQs
const faqs = [
  {
    id: "faq-1",
    question: "How do I find suppliers for a specific product?",
    answer:
      "To find suppliers for a specific product, use the search bar on the main dashboard and enter your product name or description. You can also use filters to narrow down results by location, shipment volume, or verification status. For more targeted results, try using the Product Finder by HS Code tab.",
    category: "search",
  },
  {
    id: "faq-2",
    question: "What information can I see about suppliers?",
    answer:
      "For each supplier, you can view their company name, location, verification status, most recent shipment date, total shipment count, and their top customers and suppliers. Premium users can also access detailed shipment history, product categories, and contact information.",
    category: "data",
  },
  {
    id: "faq-3",
    question: "How accurate is the supplier data?",
    answer:
      "Our supplier data is sourced from official import/export records and is updated weekly. The accuracy of the data depends on the quality of the original customs declarations. We apply data cleaning and verification processes to ensure the highest possible accuracy, but some discrepancies may occur.",
    category: "data",
  },
  {
    id: "faq-4",
    question: "How do I export search results?",
    answer:
      "To export search results, perform your search and click the 'Export' button at the top of the results page. You can choose between CSV, Excel, or PDF formats. Free users can export up to 100 results per month, while premium users have unlimited exports.",
    category: "features",
  },
  {
    id: "faq-5",
    question: "Can I save my searches for later?",
    answer:
      "Yes, you can save searches by clicking the 'Save Search' button after performing a search. Saved searches appear in your dashboard and can be accessed at any time. You can also set up alerts to be notified when new results matching your search criteria become available.",
    category: "features",
  },
  {
    id: "faq-6",
    question: "How do I upgrade my subscription?",
    answer:
      "To upgrade your subscription, go to Settings > Billing and click on 'Change Plan'. You'll see available plans with their features and pricing. Select your preferred plan and follow the payment instructions. Your new plan will be activated immediately after payment is processed.",
    category: "billing",
  },
  {
    id: "faq-7",
    question:
      "What's the difference between verified and unverified suppliers?",
    answer:
      "Verified suppliers have undergone our verification process, which includes confirming their business registration, checking trade references, and validating their contact information. Verified suppliers generally present lower risk and higher reliability compared to unverified suppliers.",
    category: "data",
  },
  {
    id: "faq-8",
    question: "How do I connect my ERP system?",
    answer:
      "To connect your ERP system, go to Integrations > Connected Services and click 'Add Connection'. Select your ERP provider from the list or use our API if your system isn't listed. Follow the configuration steps to establish the connection. We currently support direct integration with SAP, Oracle, NetSuite, and Microsoft Dynamics.",
    category: "integrations",
  },
];

// Mock data for knowledge base articles
const knowledgeBaseArticles = [
  {
    id: "kb-1",
    title: "Getting Started with Supplier Search",
    description: "Learn the basics of finding and evaluating suppliers",
    category: "Getting Started",
    readTime: 5,
    popularity: 98,
    updated: "2025-04-10T10:30:00Z",
  },
  {
    id: "kb-2",
    title: "Advanced Search Techniques",
    description: "Master complex search queries and filters",
    category: "Search",
    readTime: 8,
    popularity: 85,
    updated: "2025-04-05T14:45:00Z",
  },
  {
    id: "kb-3",
    title: "Understanding Supplier Data",
    description: "How to interpret and analyze supplier information",
    category: "Data Analysis",
    readTime: 12,
    popularity: 92,
    updated: "2025-04-15T09:20:00Z",
  },
  {
    id: "kb-4",
    title: "Exporting and Sharing Results",
    description: "Options for exporting, sharing, and collaborating",
    category: "Features",
    readTime: 4,
    popularity: 78,
    updated: "2025-03-28T16:10:00Z",
  },
  {
    id: "kb-5",
    title: "Setting Up API Access",
    description: "Configure and use the API for programmatic access",
    category: "Integrations",
    readTime: 15,
    popularity: 65,
    updated: "2025-04-18T11:30:00Z",
  },
  {
    id: "kb-6",
    title: "Managing Your Account",
    description: "User management, billing, and subscription options",
    category: "Account",
    readTime: 6,
    popularity: 88,
    updated: "2025-04-02T13:45:00Z",
  },
];

// Mock data for video tutorials
const videoTutorials = [
  {
    id: "video-1",
    title: "Quick Start Guide",
    description: "Get up and running in under 5 minutes",
    thumbnail: "/placeholder.svg?height=120&width=220",
    duration: "4:32",
    category: "Getting Started",
  },
  {
    id: "video-2",
    title: "Finding the Perfect Supplier",
    description: "Advanced search techniques and evaluation",
    thumbnail: "/placeholder.svg?height=120&width=220",
    duration: "8:15",
    category: "Search",
  },
  {
    id: "video-3",
    title: "Data Analysis Masterclass",
    description: "Interpret and leverage supplier data effectively",
    thumbnail: "/placeholder.svg?height=120&width=220",
    duration: "12:47",
    category: "Data Analysis",
  },
  {
    id: "video-4",
    title: "Setting Up Integrations",
    description: "Connect with your existing tools and systems",
    thumbnail: "/placeholder.svg?height=120&width=220",
    duration: "9:23",
    category: "Integrations",
  },
  {
    id: "video-5",
    title: "Team Collaboration Features",
    description: "Work together with your sourcing team",
    thumbnail: "/placeholder.svg?height=120&width=220",
    duration: "6:58",
    category: "Features",
  },
  {
    id: "video-6",
    title: "Exporting and Reporting",
    description: "Create and share professional reports",
    thumbnail: "/placeholder.svg?height=120&width=220",
    duration: "5:42",
    category: "Features",
  },
];

// Mock data for community discussions
const communityDiscussions = [
  {
    id: "discussion-1",
    title: "Best practices for vetting new suppliers?",
    author: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    replies: 24,
    views: 342,
    lastActivity: "2025-04-21T15:30:00Z",
  },
  {
    id: "discussion-2",
    title: "How to interpret shipment frequency data?",
    author: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    replies: 18,
    views: 256,
    lastActivity: "2025-04-20T09:15:00Z",
  },
  {
    id: "discussion-3",
    title: "Strategies for negotiating with new suppliers",
    author: {
      name: "Elena Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    replies: 32,
    views: 478,
    lastActivity: "2025-04-22T11:45:00Z",
  },
  {
    id: "discussion-4",
    title: "Comparing data accuracy between platforms",
    author: {
      name: "David Kim",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    replies: 15,
    views: 203,
    lastActivity: "2025-04-19T16:20:00Z",
  },
];

export function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("faq");
  const [faqCategory, setFaqCategory] = useState("all");
  const [contactReason, setContactReason] = useState("question");
  const [contactMessage, setContactMessage] = useState("");

  // Filter FAQs based on category and search query
  const filteredFaqs = faqs.filter(
    (faq) =>
      (faqCategory === "all" || faq.category === faqCategory) &&
      (searchQuery === "" ||
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  // Filter knowledge base articles based on search query
  const filteredArticles = knowledgeBaseArticles.filter(
    (article) =>
      searchQuery === "" ||
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  // Format time ago for display
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

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Help & Support
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Find answers, learn about our platform, and get the support you need
        </p>
      </div>

      {/* Search Bar */}
      <div className="relative mb-8">
        <div className="flex items-center border-2 border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
          <div className="pl-4 pr-2">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <Input
            type="text"
            placeholder="Search for help, articles, and more..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
          />
          {searchQuery && (
            <button
              className="pr-4 pl-2 text-gray-400 hover:text-gray-600"
              onClick={() => setSearchQuery("")}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Quick Help Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <CardTitle className="text-lg">Contact Support</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Need personalized help? Our support team is ready to assist you.
            </p>
          </CardContent>
          <CardFooter>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Contact Us
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Contact Support</DialogTitle>
                  <DialogDescription>
                    Fill out the form below and our team will get back to you as
                    soon as possible.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      What can we help you with?
                    </label>
                    <select
                      value={contactReason}
                      onChange={(e) => setContactReason(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                    >
                      <option value="question">I have a question</option>
                      <option value="problem">I'm having a problem</option>
                      <option value="billing">Billing issue</option>
                      <option value="feedback">I want to give feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Message
                    </label>
                    <textarea
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      rows={4}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                      placeholder="Please describe your issue or question in detail..."
                    ></textarea>
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit">Submit Request</Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
                <Play className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <CardTitle className="text-lg">Video Tutorials</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Learn how to use our platform with step-by-step video guides.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setActiveTab("videos")}
            >
              Watch Tutorials
            </Button>
          </CardFooter>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center gap-2">
              <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
                <Users className="h-5 w-5 text-purple-600 dark:text-purple-400" />
              </div>
              <CardTitle className="text-lg">Community</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="pb-3">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Join discussions with other users and share your experiences.
            </p>
          </CardContent>
          <CardFooter>
            <Button
              variant="outline"
              className="w-full"
              onClick={() => setActiveTab("community")}
            >
              Visit Community
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="grid grid-cols-5 w-full max-w-3xl">
          <TabsTrigger value="faq">
            <HelpCircle className="h-4 w-4 mr-2" />
            FAQs
          </TabsTrigger>
          <TabsTrigger value="articles">
            <FileText className="h-4 w-4 mr-2" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="videos">
            <Play className="h-4 w-4 mr-2" />
            Videos
          </TabsTrigger>
          <TabsTrigger value="community">
            <Users className="h-4 w-4 mr-2" />
            Community
          </TabsTrigger>
          <TabsTrigger value="contact">
            <MessageSquare className="h-4 w-4 mr-2" />
            Contact
          </TabsTrigger>
        </TabsList>

        {/* FAQs Tab */}
        <TabsContent value="faq" className="space-y-6">
          <div className="flex flex-wrap gap-2 mb-4">
            <Button
              variant={faqCategory === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setFaqCategory("all")}
            >
              All
            </Button>
            <Button
              variant={faqCategory === "search" ? "default" : "outline"}
              size="sm"
              onClick={() => setFaqCategory("search")}
            >
              Search
            </Button>
            <Button
              variant={faqCategory === "data" ? "default" : "outline"}
              size="sm"
              onClick={() => setFaqCategory("data")}
            >
              Data
            </Button>
            <Button
              variant={faqCategory === "features" ? "default" : "outline"}
              size="sm"
              onClick={() => setFaqCategory("features")}
            >
              Features
            </Button>
            <Button
              variant={faqCategory === "billing" ? "default" : "outline"}
              size="sm"
              onClick={() => setFaqCategory("billing")}
            >
              Billing
            </Button>
            <Button
              variant={faqCategory === "integrations" ? "default" : "outline"}
              size="sm"
              onClick={() => setFaqCategory("integrations")}
            >
              Integrations
            </Button>
          </div>

          <Accordion type="single" collapsible className="w-full">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq) => (
                <AccordionItem key={faq.id} value={faq.id}>
                  <AccordionTrigger className="text-left">
                    <div className="flex items-start">
                      <span className="text-sm font-medium">
                        {faq.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="pt-2 pb-4">
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {faq.answer}
                      </p>
                      <div className="flex items-center justify-between mt-4">
                        <div className="flex items-center gap-4">
                          <span className="text-xs text-gray-500">
                            Was this helpful?
                          </span>
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                            <ThumbsUp className="h-3.5 w-3.5" />
                            Yes
                          </button>
                          <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700">
                            <ThumbsDown className="h-3.5 w-3.5" />
                            No
                          </button>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {faq.category}
                        </Badge>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))
            ) : (
              <div className="text-center py-8">
                <HelpCircle className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No FAQs Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  We couldn't find any FAQs matching your search.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </Accordion>

          <div className="text-center pt-4">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Can't find what you're looking for?
            </p>
            <Button onClick={() => setActiveTab("contact")}>
              Contact Support
            </Button>
          </div>
        </TabsContent>

        {/* Knowledge Base Articles Tab */}
        <TabsContent value="articles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredArticles.length > 0 ? (
              filteredArticles.map((article) => (
                <Card key={article.id} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <Badge
                          variant="outline"
                          className="mb-2 bg-gray-100 text-gray-800 border-gray-200"
                        >
                          {article.category}
                        </Badge>
                        <CardTitle className="text-lg">
                          {article.title}
                        </CardTitle>
                        <CardDescription className="mt-1">
                          {article.description}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-3">
                    <div className="flex items-center text-xs text-gray-500 space-x-4">
                      <div className="flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        <span>{article.readTime} min read</span>
                      </div>
                      <div>Updated {formatDate(article.updated)}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-0">
                    <Button variant="ghost" className="w-full justify-between">
                      Read Article
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8">
                <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                  No Articles Found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  We couldn't find any articles matching your search.
                </p>
                <Button variant="outline" onClick={() => setSearchQuery("")}>
                  Clear Search
                </Button>
              </div>
            )}
          </div>

          {filteredArticles.length > 0 && (
            <div className="text-center pt-4">
              <Button variant="outline">
                View All Articles
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </TabsContent>

        {/* Video Tutorials Tab */}
        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videoTutorials.map((video) => (
              <div
                key={video.id}
                className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
              >
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-auto object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                    {video.duration}
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white bg-opacity-80 dark:bg-gray-800 dark:bg-opacity-80 rounded-full p-3 cursor-pointer hover:bg-opacity-100 transition-all">
                      <Play className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <Badge
                    variant="outline"
                    className="mb-2 bg-gray-100 text-gray-800 border-gray-200"
                  >
                    {video.category}
                  </Badge>
                  <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                    {video.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-4">
            <Button variant="outline">
              View All Tutorials
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Community Tab */}
        <TabsContent value="community" className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 mb-6">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                  Join Our Community
                </h2>
                <p className="text-gray-600 dark:text-gray-300">
                  Connect with other users, share experiences, and get advice
                  from the community.
                </p>
              </div>
              <Button>
                <Users className="mr-2 h-4 w-4" />
                Join Community
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                Recent Discussions
              </h3>
              <Button variant="outline" size="sm">
                New Discussion
              </Button>
            </div>

            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {communityDiscussions.map((discussion) => (
                  <div
                    key={discussion.id}
                    className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar>
                        <AvatarImage
                          src={discussion.author.avatar || "/placeholder.svg"}
                          alt={discussion.author.name}
                        />
                        <AvatarFallback>
                          {discussion.author.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white hover:text-blue-600 cursor-pointer">
                          {discussion.title}
                        </h4>
                        <div className="flex items-center gap-4 mt-1">
                          <span className="text-sm text-gray-500">
                            {discussion.author.name}
                          </span>
                          <span className="text-sm text-gray-500">
                            {timeAgo(discussion.lastActivity)}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MessageCircle className="h-4 w-4 mr-1" />
                          {discussion.replies}
                        </div>
                        <div className="flex items-center">
                          <Eye className="h-4 w-4 mr-1" />
                          {discussion.views}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="text-center pt-4">
            <Button variant="outline">
              View All Discussions
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </TabsContent>

        {/* Contact Tab */}
        <TabsContent value="contact" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-md">
                    <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <CardTitle>Email Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Send us an email and we'll get back to you within 24 hours.
                </p>
                <Button variant="outline" className="w-full">
                  support@sourcingagent.com
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-green-100 dark:bg-green-900 rounded-md">
                    <Phone className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <CardTitle>Phone Support</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Available Monday-Friday, 9am-5pm EST.
                </p>
                <Button variant="outline" className="w-full">
                  +1 (800) 555-1234
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <div className="p-2 bg-purple-100 dark:bg-purple-900 rounded-md">
                    <MessageCircle className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                  </div>
                  <CardTitle>Live Chat</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                  Chat with our support team in real-time.
                </p>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>
          </div>

          <Separator className="my-8" />

          <div className="max-w-2xl mx-auto">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
              Send Us a Message
            </h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Your Name
                  </label>
                  <Input placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Email Address
                  </label>
                  <Input placeholder="john@example.com" type="email" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  What can we help you with?
                </label>
                <select
                  value={contactReason}
                  onChange={(e) => setContactReason(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                >
                  <option value="question">I have a question</option>
                  <option value="problem">I'm having a problem</option>
                  <option value="billing">Billing issue</option>
                  <option value="feedback">I want to give feedback</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Message
                </label>
                <textarea
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Please describe your issue or question in detail..."
                ></textarea>
              </div>

              <div className="pt-2">
                <Button className="w-full md:w-auto">Submit Request</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      {/* Help Resources */}
      <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
          Additional Resources
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-base">User Guide</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Comprehensive documentation for all features
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between">
                View Guide
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-base">Tips & Tricks</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Expert advice to get the most out of our platform
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between">
                Learn More
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-base">API Documentation</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Technical guides for developers and integrations
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between">
                View Docs
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-gray-500" />
                <CardTitle className="text-base">Troubleshooting</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Solutions for common issues and error messages
              </p>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full justify-between">
                View Solutions
                <ExternalLink className="h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
