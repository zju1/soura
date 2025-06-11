import { Page } from "@/components/page";
import { Button, Form, Input, Modal, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import type { SingleMarySearch } from "./mary-search.dto";
import { useCallback, useMemo, useState } from "react";
import moment from "moment";
import { useTranslation } from "react-i18next";
import { RiAddLine, RiSearchLine } from "@remixicon/react";
import { useNavigate } from "react-router-dom";
import {
  useGetSearchesQuery,
  useNewSearchMutation,
} from "@/app/store/services/api.service";
import { useTypewriterSuggestions } from "./useTypewriterSuggestions";

export function MarySearchPage() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const [create, { isLoading }] = useNewSearchMutation();

  const { data, isFetching } = useGetSearchesQuery({});

  const columns: ColumnsType<SingleMarySearch> = useMemo(
    (): ColumnsType<SingleMarySearch> => [
      {
        title: "№",
        dataIndex: "_id",
        width: 60,
        key: "_id",
        align: "center",
        render: (_value, _record, index) => index + 1,
      },
      {
        title: "Search ID",
        dataIndex: "searchId",
        width: 120,
        key: "searchId",
        align: "center",
        sorter: (a, b) => a.searchId.localeCompare(b.searchId),
      },
      {
        title: "Title",
        dataIndex: "title",
        minWidth: 150,
        key: "title",
        sorter: (a, b) => a.title.localeCompare(b.title),
      },
      {
        title: "Created",
        dataIndex: "createdDate",
        width: 120,
        key: "createdDate",
        align: "center",
        sorter: (a, b) => a.createdDate.localeCompare(b.createdDate),
        render: (value) => moment(value).format("YYYY-MM-DD"),
      },
      {
        title: "Region",
        dataIndex: "region",
        width: 150,
        align: "center",
        key: "region",
        sorter: (a, b) => a.region.localeCompare(b.region),
      },
      {
        title: "Target industry",
        dataIndex: "targetIndustry",
        width: 150,
        align: "center",
        key: "targetIndustry",
        sorter: (a, b) => a.targetIndustry.localeCompare(b.targetIndustry),
      },
      {
        title: "Material",
        dataIndex: "material",
        width: 150,
        align: "center",
        key: "material",
        sorter: (a, b) => a.material.localeCompare(b.material),
      },
      {
        title: "Cert requirements",
        dataIndex: "certRequirements",
        width: 150,
        key: "certRequirements",
        align: "center",
        render: (value) => value.join(", "),
        sorter: (a, b) =>
          a.certRequirements
            .join(" ")
            .localeCompare(b.certRequirements.join(" ")),
      },
      {
        title: "Status",
        dataIndex: "status",
        width: 150,
        key: "status",
        align: "center",
        sorter: (a, b) => a.status.localeCompare(b.status),
        render: (value) => t(value),
      },
    ],
    [t]
  );

  const [form] = Form.useForm();

  const handleSend = useCallback(
    async (values: { prompt: string }) => {
      try {
        await create(values).unwrap();
        form.resetFields();
        setOpen(false);
      } catch (error) {
        console.log(error);
        console.error("Failed to create search:", error);
      }
    },
    [create, form]
  );

  const placeholder = useTypewriterSuggestions();

  return (
    <Page
      title="AI Search"
      extra={
        <Button
          onClick={() => setOpen(true)}
          type="primary"
          loading={isLoading}
          icon={<RiAddLine className="size-4 mt-1" />}
        >
          New search
        </Button>
      }
    >
      <Table
        dataSource={data?.data}
        loading={isFetching || isLoading}
        pagination={false}
        rowKey={(row) => row.searchId}
        rowSelection={{}}
        bordered
        columns={columns}
        onRow={({ searchId }) => ({
          onClick: () => navigate(`/mary/search/${searchId}`),
        })}
        scroll={{ y: window.innerHeight * 0.7, x: 1600 }}
      />
      <Modal
        footer={null}
        open={open}
        onCancel={() => setOpen(false)}
        title="New AI Search"
        destroyOnClose
      >
        <Form
          form={form}
          onFinish={handleSend}
          layout="vertical"
          className="mt-4"
        >
          <Form.Item name="prompt" rules={[{ required: true }]}>
            <Input.TextArea placeholder={placeholder} rows={4} minLength={10} />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            loading={isLoading}
            className="w-full mt-4"
            icon={<RiSearchLine className="size-4" />}
            size="large"
          >
            {t("search")}
          </Button>
        </Form>
      </Modal>
    </Page>
  );
}
