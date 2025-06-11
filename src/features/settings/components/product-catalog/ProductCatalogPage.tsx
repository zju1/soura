import { useState } from "react";
import {
  Table,
  Button,
  Modal,
  Tag,
  notification,
  Upload,
  Typography,
} from "antd";
import { FilePdfOutlined, FileExcelOutlined } from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import type { ProductCatalog, TechSpec } from "./product-catalog.dto";
import { Page } from "@/components/page";
import {
  useGetProductCatalogQuery,
  useAddItemToProductCatalogMutation,
} from "@/app/store/services/api.service";

export function ProductCatalogPage() {
  const { data = [], isLoading } = useGetProductCatalogQuery();
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [addItemToProductCatalog, { isLoading: isUploading }] =
    useAddItemToProductCatalogMutation();

  const columns: ColumnsType<ProductCatalog> = [
    {
      title: "Product ID",
      dataIndex: "product_id",
      key: "product_id",
      width: 120,
    },
    {
      title: "Name",
      dataIndex: "product_name",
      key: "product_name",
      width: 180,
    },
    {
      title: "Type",
      dataIndex: "product_type",
      key: "product_type",
      width: 120,
    },
    { title: "Material", dataIndex: "material", key: "material", width: 120 },
    {
      title: "Certifications",
      dataIndex: "certifications",
      key: "certifications",
      width: 180,
      render: (certs: string[]) => certs?.map((c) => <Tag key={c}>{c}</Tag>),
    },
    { title: "MOQ", dataIndex: "moq", key: "moq", width: 80 },
    {
      title: "Lead Time (days)",
      dataIndex: "lead_time_days",
      key: "lead_time_days",
      width: 120,
    },
    {
      title: "Unit Price (USD)",
      dataIndex: "unit_price_usd",
      key: "unit_price_usd",
      width: 120,
    },
    {
      title: "Annual Capacity",
      dataIndex: "annual_capacity",
      key: "annual_capacity",
      width: 120,
    },
    {
      title: "Factory Location",
      dataIndex: "factory_location",
      key: "factory_location",
      width: 150,
    },
    {
      title: "Tech Specs",
      dataIndex: "tech_specs",
      key: "tech_specs",
      width: 200,
      render: (specs: TechSpec[]) =>
        specs?.map((s) => (
          <Tag key={s.name}>
            {s.name}: {s.value}
          </Tag>
        )),
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 250,
    },
  ];

  const handleAdd = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      await addItemToProductCatalog(formData).unwrap();
      notification.success({
        message: "Product catalog uploaded successfully",
      });
      setModalOpen(false);
      setFile(null);
    } catch (error: any) {
      notification.error({
        message: "Upload failed",
        description:
          error?.data?.message ||
          error?.message ||
          "An error occurred while uploading.",
      });
    }
  };

  return (
    <Page
      title="Product Catalog"
      disablePadding
      extra={
        <Button type="primary" onClick={() => setModalOpen(true)}>
          Add Product
        </Button>
      }
    >
      <Table
        dataSource={data}
        columns={columns}
        rowKey="product_id"
        bordered
        scroll={{ x: 1600, y: window.innerHeight * 0.65 }}
        pagination={false}
        loading={isLoading}
      />
      <Modal
        title="Upload Product Catalog File"
        open={modalOpen}
        onCancel={() => {
          setModalOpen(false);
          setFile(null);
        }}
        onOk={handleAdd}
        okText={isUploading ? "Processing..." : "Upload"}
        okButtonProps={{ disabled: !file || isUploading }}
        maskClosable={!isUploading}
        closable={!isUploading}
        confirmLoading={isUploading}
        footer={null}
      >
        {isUploading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 320,
            }}
          >
            <div style={{ marginBottom: 24 }}>
              <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#1890ff"
                  strokeWidth="8"
                  opacity="0.2"
                />
                <circle
                  cx="40"
                  cy="40"
                  r="32"
                  stroke="#1890ff"
                  strokeWidth="8"
                  strokeDasharray="50 100"
                  strokeLinecap="round"
                  style={{
                    transformOrigin: "center",
                    animation: "spin 1s linear infinite",
                  }}
                />
                <style>{`
                  @keyframes spin {
                    100% { transform: rotate(360deg); }
                  }
                `}</style>
              </svg>
            </div>
            <div style={{ fontWeight: 700, fontSize: 24, marginBottom: 12 }}>
              Processing file...
            </div>
            <div style={{ color: "#888", fontSize: 16 }}>
              Please wait while your product catalog is being uploaded.
            </div>
          </div>
        ) : (
          <>
            <Typography.Paragraph type="secondary">
              Supported file types: <b>Excel (.xlsx, .xls)</b>,{" "}
              <b>CSV (.csv)</b>, <b>PDF (.pdf)</b>
            </Typography.Paragraph>
            <Upload.Dragger
              name="file"
              accept=".csv,.xlsx,.xls,.pdf"
              maxCount={1}
              beforeUpload={(file) => {
                setFile(file);
                return false; // prevent auto upload
              }}
              onRemove={() => setFile(null)}
              fileList={
                file
                  ? [
                      {
                        uid: (file as any).uid || file.name, // Fix: ensure uid is string
                        name: file.name,
                        status: "done",
                        size: file.size,
                        type: file.type,
                        originFileObj: file,
                      },
                    ]
                  : ([] as any)
              }
              showUploadList={{ showRemoveIcon: true }}
              style={{
                marginTop: 32,
                minHeight: 220,
                borderRadius: 16,
                border: "2px dashed #1890ff",
                background: "#f6faff",
              }}
              disabled={isUploading}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: 32,
                }}
              >
                <div style={{ fontSize: 56, marginBottom: 12 }}>
                  {file?.type === "application/pdf" ? (
                    <FilePdfOutlined style={{ color: "#d32f2f" }} />
                  ) : (
                    <FileExcelOutlined style={{ color: "#388e3c" }} />
                  )}
                </div>
                <div
                  style={{
                    fontWeight: 700,
                    fontSize: 22,
                    marginBottom: 8,
                  }}
                >
                  Click or drag file to upload
                </div>
                <div
                  style={{
                    color: "#888",
                    fontSize: 16,
                    marginBottom: 8,
                  }}
                >
                  Supported: Excel (.xlsx, .xls), CSV (.csv), PDF (.pdf)
                </div>
                <div style={{ color: "#aaa", fontSize: 14 }}>
                  Only one file can be uploaded at a time.
                </div>
              </div>
            </Upload.Dragger>
            <Button
              type="primary"
              block
              style={{ marginTop: 32, height: 48, fontSize: 18 }}
              onClick={handleAdd}
              disabled={!file}
            >
              Upload
            </Button>
          </>
        )}
      </Modal>
    </Page>
  );
}
