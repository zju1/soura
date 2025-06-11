import { Page } from "@/components/page";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { mockMaryMatching } from "@/mock/mockMaryMatching";

export function MaryMatchingPage() {
  const { searchId } = useParams<{ searchId: string }>();

  const columns = useMemo<ColumnsType<any>>(() => [], []);

  return (
    <Page title={searchId ? `AI Matching: ${searchId}` : "AI Matching"}>
      <Table
        dataSource={mockMaryMatching.filter(
          (row) => !searchId || row.searchId === searchId
        )}
        bordered
        pagination={false}
        rowKey={(_row, idx) => String(idx)}
        columns={columns}
        scroll={{ y: window.innerHeight * 0.75, x: 1800 }}
      />
    </Page>
  );
}
