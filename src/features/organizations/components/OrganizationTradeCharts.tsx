import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { Card } from "antd";
import { parseISO } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import type { SingleOrganization } from "../dto/organization.dto";
import moment from "moment";

const generateSalesData = () => {
  const data = [];
  const startYear = 2022;
  const endYear = 2025;
  const endMonth = 3; // April is 3 because JavaScript months are 0-indexed

  for (let year = startYear; year <= endYear; year++) {
    const monthLimit = year === endYear ? endMonth : 11;
    for (let month = 0; month <= monthLimit; month++) {
      const date = new Date(Date.UTC(year, month, 1)).toISOString();
      const sales = Math.floor(Math.random() * 10000); // random sales value
      data.push({ date, sales });
    }
  }

  return data;
};

const salesData = generateSalesData();

export function OrganizationTradeCharts(
  props: SingleOrganization & { title: string }
) {
  return (
    <Card title={props.title} className="shadow-md font-grotesk">
      <ResponsiveContainer width="100%" height="300px">
        <ChartContainer
          config={{
            sales: {
              label: "Sales",
            },
          }}
        >
          <BarChart data={salesData}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis
              dataKey="date"
              interval={0}
              fontSize={12}
              fontFamily="Space Grotesk"
              tickFormatter={(value) =>
                moment(value).get("M") === 0 ? moment(value).format("YYYY") : ""
              }
            />
            <YAxis
              fontSize={12}
              fontFamily="Space Grotesk"
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
              width={60}
            />
            <ChartTooltip
              cursor={{ fill: "#eee" }}
              content={({ active, payload, label }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="rounded-lg border bg-background p-2 shadow-sm bg-white">
                      <div className="grid gap-2 font-grotesk">
                        <div className="flex gap-1">
                          <span className="text-xs text-muted-foreground">
                            Date:
                          </span>
                          <span className="font-medium">
                            {moment(parseISO(label)).format("MMMM")}
                          </span>
                        </div>
                        <div className="flex gap-1">
                          <span className="text-xs text-muted-foreground">
                            Shipments:
                          </span>
                          <span className="font-medium">
                            {payload[0].value}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="sales" fill="var(--color-sales)" />
          </BarChart>
        </ChartContainer>
      </ResponsiveContainer>
    </Card>
  );
}
