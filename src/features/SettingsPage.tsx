"use client";

import { useState } from "react";
import {
  User,
  Bell,
  Search,
  Shield,
  Link,
  Monitor,
  Download,
  Globe,
  CreditCard,
  Save,
  Moon,
  Sun,
  Check,
} from "lucide-react";

import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function SettingsPage() {
  // Theme state
  const [theme, setTheme] = useState<"light" | "dark" | "system">("light");

  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    email: "john.doe@example.com",
    language: "english",
    timezone: "UTC-5",
  });

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    supplierUpdates: true,
    priceAlerts: true,
    weeklyDigest: false,
    newSupplierMatches: true,
  });

  // Search settings
  const [searchSettings, setSearchSettings] = useState({
    defaultSearchRadius: 50,
    includeUnverifiedSuppliers: false,
    saveSearchHistory: true,
    autoSuggest: true,
    relevanceThreshold: 70,
  });

  // Privacy settings
  const [privacySettings, setPrivacySettings] = useState({
    shareAnalytics: true,
    allowPersonalization: true,
    storeSearchHistory: true,
    dataRetentionPeriod: "1-year",
  });

  // Integration settings
  const [integrationSettings, setIntegrationSettings] = useState({
    enableApiAccess: false,
    connectToErp: false,
    importYetiIntegration: true,
    customApiEndpoint: "",
  });

  // Display settings
  const [displaySettings, setDisplaySettings] = useState({
    resultsPerPage: 25,
    compactView: false,
    showVerifiedBadges: true,
    showShipmentCount: true,
    showSupplierLocation: true,
  });

  // Export settings
  const [exportSettings, setExportSettings] = useState({
    defaultExportFormat: "csv",
    includeMetadata: true,
    compressionEnabled: false,
  });

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-900">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          Settings
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] gap-8">
        {/* Sidebar Navigation */}
        <div className="space-y-1">
          <a
            href="#account"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white"
          >
            <User size={16} />
            <span>Account</span>
          </a>
          <a
            href="#notifications"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Bell size={16} />
            <span>Notifications</span>
          </a>
          <a
            href="#search"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Search size={16} />
            <span>Search Preferences</span>
          </a>
          <a
            href="#privacy"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Shield size={16} />
            <span>Data & Privacy</span>
          </a>
          <a
            href="#integrations"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Link size={16} />
            <span>Integrations</span>
          </a>
          <a
            href="#display"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Monitor size={16} />
            <span>Display</span>
          </a>
          <a
            href="#export"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <Download size={16} />
            <span>Export & Import</span>
          </a>
          <a
            href="#billing"
            className="flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            <CreditCard size={16} />
            <span>Billing</span>
          </a>
        </div>

        {/* Settings Content */}
        <div className="space-y-8">
          {/* Account Settings */}
          <section
            id="account"
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Account Settings
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={accountSettings.email}
                  onChange={(e) =>
                    setAccountSettings({
                      ...accountSettings,
                      email: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Language
                  </label>
                  <Select
                    value={accountSettings.language}
                    onValueChange={(value: any) =>
                      setAccountSettings({
                        ...accountSettings,
                        language: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="english">English</SelectItem>
                      <SelectItem value="spanish">Spanish</SelectItem>
                      <SelectItem value="french">French</SelectItem>
                      <SelectItem value="german">German</SelectItem>
                      <SelectItem value="chinese">Chinese</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Timezone
                  </label>
                  <Select
                    value={accountSettings.timezone}
                    onValueChange={(value: any) =>
                      setAccountSettings({
                        ...accountSettings,
                        timezone: value,
                      })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="UTC-12">UTC-12</SelectItem>
                      <SelectItem value="UTC-8">UTC-8 (PST)</SelectItem>
                      <SelectItem value="UTC-5">UTC-5 (EST)</SelectItem>
                      <SelectItem value="UTC+0">UTC+0 (GMT)</SelectItem>
                      <SelectItem value="UTC+1">UTC+1 (CET)</SelectItem>
                      <SelectItem value="UTC+8">UTC+8 (CST)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Button
                  variant="outline"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </section>

          {/* Notification Settings */}
          <section
            id="notifications"
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Notification Preferences
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Email Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.emailNotifications}
                  onCheckedChange={(checked: any) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      emailNotifications: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Push Notifications
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Receive notifications in your browser
                  </p>
                </div>
                <Switch
                  checked={notificationSettings.pushNotifications}
                  onCheckedChange={(checked: any) =>
                    setNotificationSettings({
                      ...notificationSettings,
                      pushNotifications: checked,
                    })
                  }
                />
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                  Notification Types
                </h3>

                <div className="space-y-3 pl-2">
                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Supplier Updates
                    </label>
                    <Switch
                      checked={notificationSettings.supplierUpdates}
                      onCheckedChange={(checked: any) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          supplierUpdates: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Price Alerts
                    </label>
                    <Switch
                      checked={notificationSettings.priceAlerts}
                      onCheckedChange={(checked: any) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          priceAlerts: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      Weekly Digest
                    </label>
                    <Switch
                      checked={notificationSettings.weeklyDigest}
                      onCheckedChange={(checked: any) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          weeklyDigest: checked,
                        })
                      }
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <label className="text-sm text-gray-700 dark:text-gray-300">
                      New Supplier Matches
                    </label>
                    <Switch
                      checked={notificationSettings.newSupplierMatches}
                      onCheckedChange={(checked: any) =>
                        setNotificationSettings({
                          ...notificationSettings,
                          newSupplierMatches: checked,
                        })
                      }
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Search Preferences */}
          <section
            id="search"
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Search Preferences
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Default Search Radius (miles)
                </label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[searchSettings.defaultSearchRadius]}
                    min={10}
                    max={500}
                    step={10}
                    onValueChange={(value: any) =>
                      setSearchSettings({
                        ...searchSettings,
                        defaultSearchRadius: value[0],
                      })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                    {searchSettings.defaultSearchRadius}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Include Unverified Suppliers
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show suppliers that haven't been verified
                  </p>
                </div>
                <Switch
                  checked={searchSettings.includeUnverifiedSuppliers}
                  onCheckedChange={(checked: any) =>
                    setSearchSettings({
                      ...searchSettings,
                      includeUnverifiedSuppliers: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Save Search History
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Save your recent searches for quick access
                  </p>
                </div>
                <Switch
                  checked={searchSettings.saveSearchHistory}
                  onCheckedChange={(checked: any) =>
                    setSearchSettings({
                      ...searchSettings,
                      saveSearchHistory: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Auto-Suggest
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Show search suggestions as you type
                  </p>
                </div>
                <Switch
                  checked={searchSettings.autoSuggest}
                  onCheckedChange={(checked: any) =>
                    setSearchSettings({
                      ...searchSettings,
                      autoSuggest: checked,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Relevance Threshold (%)
                </label>
                <div className="flex items-center gap-4">
                  <Slider
                    value={[searchSettings.relevanceThreshold]}
                    min={0}
                    max={100}
                    step={5}
                    onValueChange={(value: any) =>
                      setSearchSettings({
                        ...searchSettings,
                        relevanceThreshold: value[0],
                      })
                    }
                    className="flex-1"
                  />
                  <span className="text-sm font-medium text-gray-900 dark:text-white w-12 text-right">
                    {searchSettings.relevanceThreshold}%
                  </span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Only show results that match your search criteria above this
                  threshold
                </p>
              </div>
            </div>
          </section>

          {/* Privacy Settings */}
          <section
            id="privacy"
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Data & Privacy
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Share Analytics
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Help us improve by sharing anonymous usage data
                  </p>
                </div>
                <Switch
                  checked={privacySettings.shareAnalytics}
                  onCheckedChange={(checked: any) =>
                    setPrivacySettings({
                      ...privacySettings,
                      shareAnalytics: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Personalization
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Allow us to personalize your experience based on your
                    activity
                  </p>
                </div>
                <Switch
                  checked={privacySettings.allowPersonalization}
                  onCheckedChange={(checked: any) =>
                    setPrivacySettings({
                      ...privacySettings,
                      allowPersonalization: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Store Search History
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Save your search history for better recommendations
                  </p>
                </div>
                <Switch
                  checked={privacySettings.storeSearchHistory}
                  onCheckedChange={(checked: any) =>
                    setPrivacySettings({
                      ...privacySettings,
                      storeSearchHistory: checked,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Data Retention Period
                </label>
                <Select
                  value={privacySettings.dataRetentionPeriod}
                  onValueChange={(value: any) =>
                    setPrivacySettings({
                      ...privacySettings,
                      dataRetentionPeriod: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30-days">30 Days</SelectItem>
                    <SelectItem value="90-days">90 Days</SelectItem>
                    <SelectItem value="6-months">6 Months</SelectItem>
                    <SelectItem value="1-year">1 Year</SelectItem>
                    <SelectItem value="forever">Forever</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  How long we keep your data before automatically deleting it
                </p>
              </div>

              <div className="pt-2">
                <Button
                  variant="outline"
                  className="text-blue-600 border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                >
                  Download My Data
                </Button>
              </div>
            </div>
          </section>

          {/* Integrations */}
          <section
            id="integrations"
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Integrations
            </h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    API Access
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Enable API access to your account
                  </p>
                </div>
                <Switch
                  checked={integrationSettings.enableApiAccess}
                  onCheckedChange={(checked: any) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      enableApiAccess: checked,
                    })
                  }
                />
              </div>

              {integrationSettings.enableApiAccess && (
                <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-md">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      API Key
                    </span>
                    <Button variant="outline" size="sm" className="h-7 text-xs">
                      Generate New Key
                    </Button>
                  </div>
                  <div className="flex">
                    <input
                      type="text"
                      value="sk_live_51NzQjKLkMG8KHVrXsYYYYYYYYYYYYYYYYYYYYYYYY"
                      readOnly
                      className="flex-1 px-3 py-1 text-sm bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-l-md"
                    />
                    <Button className="rounded-l-none">Copy</Button>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Connect to ERP System
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Integrate with your ERP system
                  </p>
                </div>
                <Switch
                  checked={integrationSettings.connectToErp}
                  onCheckedChange={(checked: any) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      connectToErp: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    ImportYeti Integration
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Connect to ImportYeti for additional data
                  </p>
                </div>
                <Switch
                  checked={integrationSettings.importYetiIntegration}
                  onCheckedChange={(checked: any) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      importYetiIntegration: checked,
                    })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Custom API Endpoint
                </label>
                <input
                  type="text"
                  value={integrationSettings.customApiEndpoint}
                  onChange={(e) =>
                    setIntegrationSettings({
                      ...integrationSettings,
                      customApiEndpoint: e.target.value,
                    })
                  }
                  placeholder="https://api.example.com/webhook"
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
                />
              </div>

              <div className="pt-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
                  Connected Services
                </h3>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-md">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                        <Globe size={16} />
                      </div>
                      <div>
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                          ImportYeti
                        </h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Connected on Apr 15, 2025
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Disconnect
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Display Settings */}
          <section
            id="display"
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Display Settings
            </h2>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Theme
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-md ${
                      theme === "light"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setTheme("light")}
                  >
                    <Sun size={16} />
                    <span>Light</span>
                    {theme === "light" && <Check size={16} className="ml-1" />}
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-md ${
                      theme === "dark"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setTheme("dark")}
                  >
                    <Moon size={16} />
                    <span>Dark</span>
                    {theme === "dark" && <Check size={16} className="ml-1" />}
                  </button>
                  <button
                    className={`flex items-center justify-center gap-2 px-3 py-2 border rounded-md ${
                      theme === "system"
                        ? "border-blue-500 bg-blue-50 text-blue-600"
                        : "border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300"
                    }`}
                    onClick={() => setTheme("system")}
                  >
                    <Monitor size={16} />
                    <span>System</span>
                    {theme === "system" && <Check size={16} className="ml-1" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Results Per Page
                </label>
                <Select
                  value={displaySettings.resultsPerPage.toString()}
                  onValueChange={(value: any) =>
                    setDisplaySettings({
                      ...displaySettings,
                      resultsPerPage: Number.parseInt(value),
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select number" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="25">25</SelectItem>
                    <SelectItem value="50">50</SelectItem>
                    <SelectItem value="100">100</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Compact View
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Display more results with less detail
                  </p>
                </div>
                <Switch
                  checked={displaySettings.compactView}
                  onCheckedChange={(checked: any) =>
                    setDisplaySettings({
                      ...displaySettings,
                      compactView: checked,
                    })
                  }
                />
              </div>

              <div className="space-y-3">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Show in Results
                </h3>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Verified Badges
                  </label>
                  <Switch
                    checked={displaySettings.showVerifiedBadges}
                    onCheckedChange={(checked: any) =>
                      setDisplaySettings({
                        ...displaySettings,
                        showVerifiedBadges: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Shipment Count
                  </label>
                  <Switch
                    checked={displaySettings.showShipmentCount}
                    onCheckedChange={(checked: any) =>
                      setDisplaySettings({
                        ...displaySettings,
                        showShipmentCount: checked,
                      })
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label className="text-sm text-gray-700 dark:text-gray-300">
                    Supplier Location
                  </label>
                  <Switch
                    checked={displaySettings.showSupplierLocation}
                    onCheckedChange={(checked: any) =>
                      setDisplaySettings({
                        ...displaySettings,
                        showSupplierLocation: checked,
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Export & Import */}
          <section
            id="export"
            className="border-b border-gray-200 dark:border-gray-700 pb-8"
          >
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Export & Import
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Default Export Format
                </label>
                <Select
                  value={exportSettings.defaultExportFormat}
                  onValueChange={(value: any) =>
                    setExportSettings({
                      ...exportSettings,
                      defaultExportFormat: value,
                    })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="csv">CSV</SelectItem>
                    <SelectItem value="excel">Excel</SelectItem>
                    <SelectItem value="json">JSON</SelectItem>
                    <SelectItem value="pdf">PDF</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Include Metadata
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Include additional metadata in exports
                  </p>
                </div>
                <Switch
                  checked={exportSettings.includeMetadata}
                  onCheckedChange={(checked: any) =>
                    setExportSettings({
                      ...exportSettings,
                      includeMetadata: checked,
                    })
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Compression
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Compress exported files
                  </p>
                </div>
                <Switch
                  checked={exportSettings.compressionEnabled}
                  onCheckedChange={(checked: any) =>
                    setExportSettings({
                      ...exportSettings,
                      compressionEnabled: checked,
                    })
                  }
                />
              </div>

              <div className="pt-2 space-y-3">
                <Button className="w-full">Export All Data</Button>

                <div className="relative">
                  <Button variant="outline" className="w-full">
                    Import Data
                  </Button>
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    accept=".csv,.xlsx,.json"
                  />
                </div>
              </div>

              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-900/30 rounded-md p-3 mt-2">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  Importing data will merge with your existing data. This action
                  cannot be undone.
                </p>
              </div>
            </div>
          </section>

          {/* Billing */}
          <section id="billing" className="pb-4">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Billing
            </h2>

            <div className="bg-gray-50 dark:bg-gray-800 rounded-md p-4 mb-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                  Current Plan
                </h3>
                <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-0.5 rounded">
                  Pro
                </span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                Your subscription renews on May 15, 2025
              </p>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  Change Plan
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50 hover:text-red-700"
                >
                  Cancel Subscription
                </Button>
              </div>
            </div>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="payment-methods">
                <AccordionTrigger className="text-sm font-medium text-gray-900 dark:text-white py-2">
                  Payment Methods
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                          <CreditCard size={16} />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                            Visa ending in 4242
                          </h4>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            Expires 12/2026
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                        >
                          Remove
                        </Button>
                      </div>
                    </div>

                    <Button variant="outline" size="sm" className="w-full">
                      <CreditCard size={16} className="mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="billing-history">
                <AccordionTrigger className="text-sm font-medium text-gray-900 dark:text-white py-2">
                  Billing History
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-3 pt-1">
                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Apr 15, 2025
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Pro Plan - Monthly
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          $49.00
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-blue-600"
                        >
                          Receipt
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Mar 15, 2025
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Pro Plan - Monthly
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          $49.00
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-blue-600"
                        >
                          Receipt
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                      <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          Feb 15, 2025
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          Pro Plan - Monthly
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          $49.00
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-6 px-2 text-xs text-blue-600"
                        >
                          Receipt
                        </Button>
                      </div>
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>

          {/* Save Button */}
          <div className="sticky bottom-0 bg-white dark:bg-gray-900 pt-4 pb-2 border-t border-gray-200 dark:border-gray-700 mt-8">
            <Button className="w-full">
              <Save className="mr-2 h-4 w-4" />
              Save Settings
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
