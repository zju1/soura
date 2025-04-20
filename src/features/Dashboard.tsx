import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Line,
  LineChart,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  AreaChart,
  Area,
  Cell,
  ReferenceLine,
} from "recharts";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  CalendarIcon,
  AlertTriangleIcon,
  AnchorIcon,
  UsersIcon,
  TrendingDownIcon,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-6">Supplier Dashboard</h1>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid grid-cols-2 mb-6">
          <TabsTrigger value="overview">OVERVIEW</TabsTrigger>
          <TabsTrigger value="risk-monitoring">RISK MONITORING</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <OverviewTab />
        </TabsContent>

        <TabsContent value="risk-monitoring">
          <RiskMonitoringTab />
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Overview Tab Component
function OverviewTab() {
  // Sample data for stat cards
  const statCardsData = [
    {
      title: "Active Suppliers",
      value: "243",
      change: "+12%",
      data: [35, 40, 45, 50, 55, 60, 65, 70, 75, 80],
    },
    {
      title: "Pending Requests",
      value: "18",
      change: "-3%",
      data: [20, 25, 22, 18, 15, 19, 18, 20, 18, 18],
    },
    {
      title: "High Risk Suppliers",
      value: "32",
      change: "+5%",
      data: [25, 28, 30, 32, 29, 30, 31, 32, 33, 32],
    },
    {
      title: "Shipments in Transit",
      value: "87",
      change: "+8%",
      data: [65, 70, 75, 80, 85, 82, 80, 85, 87, 87],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {statCardsData.map((stat, index) => (
          <StatCard
            key={index}
            title={stat.title}
            value={stat.value}
            change={stat.change}
            data={stat.data}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Supplier Risk Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SupplierRiskDistribution />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Active Sourcing Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ActiveSourcingRequests />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Geopolitical Risk Map</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <GeopoliticalRiskMap />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Tariff Trends</CardTitle>
          </CardHeader>
          <CardContent className="h-[250px]">
            <TariffTrends />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Risk Monitoring Tab Component
function RiskMonitoringTab() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Countries with Rising Risk
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CountriesWithRisingRisk />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Suppliers with Falling Shipments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <SuppliersWithFallingShipments />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">
              Products Affected by Tariffs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ProductsAffectedByTariffs />
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Risk Factors by Region</CardTitle>
          <p className="text-sm text-muted-foreground">
            Detailed breakdown of risk factors across supplier regions
          </p>
        </CardHeader>
        <CardContent>
          <RiskFactorsByRegion />
        </CardContent>
      </Card>
    </div>
  );
}

// Stat Card Component
interface StatCardProps {
  title: string;
  value: string;
  change: string;
  data: number[];
}

function StatCard({ title, value, change, data }: StatCardProps) {
  const isPositive = change.startsWith("+");
  const chartColor = isPositive ? "#22c55e" : "#ef4444";
  const gradientId = `gradient-${title.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between pb-2 pt-4 px-4">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent className="px-4 pb-4 pt-0">
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          {isPositive ? (
            <ArrowUpIcon className="mr-1 h-4 w-4 text-green-500" />
          ) : (
            <ArrowDownIcon className="mr-1 h-4 w-4 text-red-500" />
          )}
          <span className={isPositive ? "text-green-500" : "text-red-500"}>
            {change}
          </span>
          <span className="ml-1">from last month</span>
        </div>
        <div className="h-[50px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={data.map((value, i) => ({ value, month: i }))}
              margin={{ top: 5, right: 5, left: 5, bottom: 5 }}
            >
              <defs>
                <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={chartColor} stopOpacity={0.8} />
                  <stop offset="95%" stopColor={chartColor} stopOpacity={0.2} />
                </linearGradient>
              </defs>
              <Line
                type="monotone"
                dataKey="value"
                stroke={chartColor}
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0 }}
              />
              <Area
                type="monotone"
                dataKey="value"
                stroke="none"
                fill={`url(#${gradientId})`}
                fillOpacity={0.2}
              />
              <Tooltip
                contentStyle={{
                  background: "rgba(255, 255, 255, 0.8)",
                  border: "none",
                  borderRadius: "4px",
                  fontSize: "12px",
                }}
                formatter={(value) => [`${value}`, "Value"]}
                labelFormatter={() => ""}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

// Supplier Risk Distribution Component - Now using Bar Chart
function SupplierRiskDistribution() {
  const data = [
    { name: "Low Risk", value: 120, color: "#22c55e" },
    { name: "Medium Risk", value: 91, color: "#f59e0b" },
    { name: "High Risk", value: 32, color: "#ef4444" },
  ];

  return (
    <div className="h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 10, right: 30, left: 20, bottom: 10 }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            horizontal={true}
            vertical={false}
            stroke="#e5e7eb"
          />
          <XAxis
            type="number"
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
            domain={[0, "dataMax + 20"]}
          />
          <YAxis
            dataKey="name"
            type="category"
            width={90}
            axisLine={false}
            tickLine={false}
            tick={{ fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "rgba(0, 0, 0, 0.05)" }}
            contentStyle={{
              background: "white",
              border: "none",
              borderRadius: "4px",
              boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            }}
            formatter={(value) => [`${value} suppliers`, "Count"]}
          />
          <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={30}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
          <ReferenceLine x={0} stroke="#e5e7eb" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}

// Active Sourcing Requests Component
function ActiveSourcingRequests() {
  const requests = [
    {
      name: "Electronic Components",
      dueDate: "Apr 28, 2025",
      stage: "AI Matching",
      progress: 80,
      color: "#22c55e",
    },
    {
      name: "Raw Materials",
      dueDate: "May 15, 2025",
      stage: "Risk Assessment",
      progress: 50,
      color: "#f59e0b",
    },
    {
      name: "Packaging Materials",
      dueDate: "Jun 10, 2025",
      stage: "Sourcing",
      progress: 30,
      color: "#ef4444",
    },
  ];

  return (
    <div className="space-y-5 py-2">
      {requests.map((request, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-sm font-medium">{request.name}</h3>
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-3.5 w-3.5" />
                Due {request.dueDate}
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">{request.stage}</div>
              <div className="text-sm text-muted-foreground">
                {request.progress}%
              </div>
            </div>
          </div>
          <Progress value={request.progress} className="h-2" />
        </div>
      ))}
    </div>
  );
}

// Geopolitical Risk Map Component - Now using a chart instead of placeholder
function GeopoliticalRiskMap() {
  // Sample data for a heatmap-like visualization
  const data = [
    { region: "North America", lowRisk: 30, mediumRisk: 15, highRisk: 5 },
    { region: "Europe", lowRisk: 25, mediumRisk: 10, highRisk: 3 },
    { region: "Asia", lowRisk: 20, mediumRisk: 25, highRisk: 15 },
    { region: "South America", lowRisk: 10, mediumRisk: 15, highRisk: 8 },
    { region: "Africa", lowRisk: 5, mediumRisk: 10, highRisk: 12 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 15, right: 30, left: 0, bottom: 5 }}
      >
        <defs>
          <linearGradient id="colorLowRisk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorMediumRisk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.2} />
          </linearGradient>
          <linearGradient id="colorHighRisk" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#ef4444" stopOpacity={0.2} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="region"
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
        />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            fontSize: "12px",
          }}
        />
        <Area
          type="monotone"
          dataKey="lowRisk"
          stackId="1"
          stroke="#22c55e"
          fill="url(#colorLowRisk)"
          name="Low Risk"
        />
        <Area
          type="monotone"
          dataKey="mediumRisk"
          stackId="1"
          stroke="#f59e0b"
          fill="url(#colorMediumRisk)"
          name="Medium Risk"
        />
        <Area
          type="monotone"
          dataKey="highRisk"
          stackId="1"
          stroke="#ef4444"
          fill="url(#colorHighRisk)"
          name="High Risk"
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
          iconType="circle"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

// Tariff Trends Component
function TariffTrends() {
  const data = [
    { month: "Jan", china: 20, vietnam: 5, mexico: 8, eu: 3 },
    { month: "Feb", china: 22, vietnam: 5, mexico: 8, eu: 3 },
    { month: "Mar", china: 25, vietnam: 6, mexico: 8, eu: 3 },
    { month: "Apr", china: 25, vietnam: 8, mexico: 7, eu: 3 },
    { month: "May", china: 25, vietnam: 10, mexico: 7, eu: 4 },
    { month: "Jun", china: 25, vietnam: 12, mexico: 7, eu: 4 },
  ];

  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        data={data}
        margin={{ top: 15, right: 30, left: 0, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis
          dataKey="month"
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
        />
        <YAxis
          tick={{ fontSize: 12 }}
          axisLine={{ stroke: "#e5e7eb" }}
          tickLine={false}
          domain={[0, "dataMax + 5"]}
        />
        <Tooltip
          contentStyle={{
            background: "white",
            border: "none",
            borderRadius: "4px",
            boxShadow: "0 2px 10px rgba(0, 0, 0, 0.1)",
            fontSize: "12px",
          }}
          formatter={(value) => [`${value}%`, ""]}
        />
        <Legend
          wrapperStyle={{ fontSize: "12px", paddingTop: "10px" }}
          iconType="circle"
        />
        <Line
          type="monotone"
          dataKey="china"
          stroke="#ef4444"
          name="China"
          strokeWidth={2}
          dot={{ stroke: "#ef4444", strokeWidth: 2, r: 4, fill: "white" }}
          activeDot={{ r: 6, strokeWidth: 0, fill: "#ef4444" }}
        />
        <Line
          type="monotone"
          dataKey="vietnam"
          stroke="#f59e0b"
          name="Vietnam"
          strokeWidth={2}
          dot={{ stroke: "#f59e0b", strokeWidth: 2, r: 4, fill: "white" }}
          activeDot={{ r: 6, strokeWidth: 0, fill: "#f59e0b" }}
        />
        <Line
          type="monotone"
          dataKey="mexico"
          stroke="#3b82f6"
          name="Mexico"
          strokeWidth={2}
          dot={{ stroke: "#3b82f6", strokeWidth: 2, r: 4, fill: "white" }}
          activeDot={{ r: 6, strokeWidth: 0, fill: "#3b82f6" }}
        />
        <Line
          type="monotone"
          dataKey="eu"
          stroke="#22c55e"
          name="EU"
          strokeWidth={2}
          dot={{ stroke: "#22c55e", strokeWidth: 2, r: 4, fill: "white" }}
          activeDot={{ r: 6, strokeWidth: 0, fill: "#22c55e" }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

// Countries with Rising Risk Component
function CountriesWithRisingRisk() {
  const countries = [
    {
      name: "China",
      risk: "High Tariffs",
      icon: AlertTriangleIcon,
      color: "#ef4444",
    },
    {
      name: "Vietnam",
      risk: "Port Congestion",
      icon: AnchorIcon,
      color: "#f59e0b",
    },
    {
      name: "Malaysia",
      risk: "Labor Shortages",
      icon: UsersIcon,
      color: "#3b82f6",
    },
  ];

  return (
    <div className="space-y-4 py-2">
      {countries.map((country, index) => (
        <div key={index} className="flex items-center gap-3">
          <div
            className={`flex h-8 w-8 items-center justify-center rounded-lg bg-opacity-20`}
            style={{ backgroundColor: country.color + "20" }}
          >
            <country.icon
              className="h-4 w-4"
              style={{ color: country.color }}
            />
          </div>
          <div>
            <h3 className="text-sm font-medium">{country.name}</h3>
            <p className="text-sm text-muted-foreground">{country.risk}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

// Suppliers with Falling Shipments Component
function SuppliersWithFallingShipments() {
  const suppliers = [
    {
      name: "TechComp Electronics",
      percentage: "-24%",
    },
    {
      name: "Global Materials Inc.",
      percentage: "-18%",
    },
    {
      name: "Eastern Manufacturing",
      percentage: "-12%",
    },
  ];

  return (
    <div className="space-y-4 py-2">
      {suppliers.map((supplier, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="text-sm font-medium">{supplier.name}</div>
          <div className="flex items-center text-red-500 text-sm font-medium">
            <TrendingDownIcon className="mr-1 h-4 w-4" />
            {supplier.percentage}
          </div>
        </div>
      ))}
    </div>
  );
}

// Products Affected by Tariffs Component
function ProductsAffectedByTariffs() {
  const products = [
    {
      name: "Electronics",
      tariff: "25% Tariff",
    },
    {
      name: "Steel Components",
      tariff: "18% Tariff",
    },
    {
      name: "Textiles",
      tariff: "12% Tariff",
    },
  ];

  return (
    <div className="space-y-4 py-2">
      {products.map((product, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="text-sm font-medium">{product.name}</div>
          <div className="text-amber-500 font-medium text-sm">
            {product.tariff}
          </div>
        </div>
      ))}
    </div>
  );
}

// Risk Factors by Region Component
function RiskFactorsByRegion() {
  const riskData = [
    {
      supplier: "China",
      riskLevel: "High",
      riskFactor: "High Tariffs",
      notes: "25% tariff on electronics",
    },
    {
      supplier: "Vietnam",
      riskLevel: "Medium",
      riskFactor: "Port congestion",
      notes: "3-week delay avg",
    },
    {
      supplier: "Germany",
      riskLevel: "Low",
      riskFactor: "Stable",
      notes: "Stable EU supplier",
    },
    {
      supplier: "Malaysia",
      riskLevel: "Medium",
      riskFactor: "Labor Shortages",
      notes: "Affecting production capacity",
    },
    {
      supplier: "Mexico",
      riskLevel: "Low",
      riskFactor: "Nearshoring",
      notes: "Favorable trade agreements",
    },
  ];

  const getRiskBadgeColor = (risk: string) => {
    switch (risk) {
      case "High":
        return "bg-red-100 text-red-800 hover:bg-red-100";
      case "Medium":
        return "bg-amber-100 text-amber-800 hover:bg-amber-100";
      case "Low":
        return "bg-green-100 text-green-800 hover:bg-green-100";
      default:
        return "";
    }
  };

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-sm">Supplier/Country</TableHead>
            <TableHead className="text-sm">Risk Level</TableHead>
            <TableHead className="text-sm">Risk Factor</TableHead>
            <TableHead className="text-sm">Notes</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {riskData.map((row, index) => (
            <TableRow key={index}>
              <TableCell className="py-3 text-sm font-medium">
                {row.supplier}
              </TableCell>
              <TableCell className="py-3">
                <Badge
                  variant="outline"
                  className={`text-xs ${getRiskBadgeColor(row.riskLevel)}`}
                >
                  {row.riskLevel}
                </Badge>
              </TableCell>
              <TableCell className="py-3 text-sm">{row.riskFactor}</TableCell>
              <TableCell className="py-3 text-sm">{row.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
