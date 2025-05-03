import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ExternalLink, Search } from "lucide-react";
import { Button, Input } from "antd";

// Sample data for triggered alerts
const initialAlerts = [
  {
    id: "1",
    name: "Price Increase Alert",
    description:
      "Acme Electronics has increased prices by 15% on semiconductor components",
    supplier: "Acme Electronics",
    severity: "high",
    timestamp: "2023-11-20T08:45:00Z",
    status: "new",
  },
  {
    id: "2",
    name: "Delivery Delay Detected",
    description:
      "Global Materials Inc. has reported a 7-day delay on your pending order #GML-7829",
    supplier: "Global Materials Inc.",
    severity: "medium",
    timestamp: "2023-11-19T14:30:00Z",
    status: "new",
  },
  {
    id: "3",
    name: "Quality Control Issue",
    description:
      "Precision Parts Ltd. has reported a 5% increase in defect rate for the latest batch",
    supplier: "Precision Parts Ltd.",
    severity: "low",
    timestamp: "2023-11-18T11:15:00Z",
    status: "acknowledged",
  },
  {
    id: "4",
    name: "Suspicious Activity",
    description:
      "Unusual login pattern detected from TechSupply Co. admin portal",
    supplier: "TechSupply Co.",
    severity: "high",
    timestamp: "2023-11-17T23:10:00Z",
    status: "acknowledged",
  },
  {
    id: "5",
    name: "Contract Change",
    description:
      "MetalWorks Inc. has updated their terms of service with changes to payment terms",
    supplier: "MetalWorks Inc.",
    severity: "medium",
    timestamp: "2023-11-16T16:20:00Z",
    status: "resolved",
  },
];

export function ReceivedAlertsPage() {
  const formatDate = (dateString: string | number | Date) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(date);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-amber-100 text-amber-800";
      case "low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <Input
        size="large"
        prefix={<Search className="size-4 mr-2 text-gray-500" />}
        placeholder="Search..."
      />

      <div className="grid max-w-3xl mx-auto gap-2">
        {initialAlerts.map((alert) => (
          <Card className="bg-white shadow-none rounded-md p-0" key={alert.id}>
            <CardHeader className="pb-2">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg flex items-center gap-2 font-grotesk">
                    {alert.name}
                    <Badge
                      className={`${getSeverityColor(
                        alert.severity
                      )} text-xs py-0 shadow-none`}
                    >
                      {alert.severity}
                    </Badge>
                  </CardTitle>
                  <CardDescription>
                    <span className="font-medium text-xs">
                      {alert.supplier}
                    </span>{" "}
                    • {formatDate(alert.timestamp)}
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p>{alert.description}</p>
            </CardContent>
            <CardFooter className="flex justify-between pt-0">
              <Button variant="outlined">
                <ExternalLink className="h-4 w-4 mr-2" />
                View Details
              </Button>
              <div className="space-x-2">
                <Button variant="outlined">Acknowledge</Button>
                <Button variant="solid" type="primary">
                  Resolve
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
