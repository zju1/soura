import { Page } from "@/components/page";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";

import { useParams } from "react-router-dom";
import type {
  EmployeeCount,
  SingleVeridionResult,
} from "./veridion-search.dto";
import { mockVeridionResults } from "@/mock/mockVeridionResults";
import { shortenNumber } from "@/utils/millifyNumber";
import moment from "moment";

export function MarySearchResultsPage() {
  const { searchId } = useParams<{ searchId: string }>();

  const columns = useMemo<ColumnsType<SingleVeridionResult>>(
    () => [
      {
        title: "Company",
        dataIndex: "company_name",
        key: "company_name",
        width: 220,
      },

      /* ─────── COMPANY FACTS ─────── */
      { title: "Type", dataIndex: "company_type", key: "company_type" },
      {
        title: "Founded",
        dataIndex: "year_founded",
        key: "year_founded",
        align: "center",
        width: 100,
      },
      {
        title: "Employees",
        dataIndex: "employee_count",
        key: "employee_count",
        render: ({ value, type }: EmployeeCount) =>
          `${shortenNumber(value)} - ${type}`,
      },
      {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
        render: ({ value, type }: EmployeeCount) =>
          `${shortenNumber(value)} - ${type}`,
      },

      /* ─────── INDUSTRY CLASSIFICATION ─────── */
      {
        title: "Category",
        dataIndex: "main_business_category",
        key: "main_business_category",
      },
      { title: "Industry", dataIndex: "main_industry", key: "main_industry" },
      { title: "Sector", dataIndex: "main_sector", key: "main_sector" },

      /* ─────── ONLINE PRESENCE ─────── */
      { title: "Domain", dataIndex: "website_domain", key: "website_domain" },

      /* ─────── DATES ─────── */
      {
        title: "Updated",
        dataIndex: "last_updated_at",
        key: "last_updated_at",
        width: 120,
        render: (d: Date) => moment(d).format("YYYY-MM-DD"),
      },
    ],
    []
  );

  return (
    <Page title={searchId}>
      <Table
        dataSource={mockVeridionResults}
        bordered
        pagination={false}
        rowSelection={{}}
        columns={columns as any}
        scroll={{ y: window.innerHeight * 0.75, x: 1600 }}
      />
    </Page>
  );
}
