import { Page } from "@/components/page";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";

import { useParams } from "react-router-dom";

import { mockVeridionResults } from "@/mock/mockVeridionResults";

export function MaryMatchingPage() {
  const { searchId } = useParams<{ searchId: string }>();

  const columns = useMemo<ColumnsType<any>>(() => [], []);

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
