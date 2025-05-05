import {
  useDeleteOrganizationMutation,
  useGetOrganizationsQuery,
  useImportOrganizationsMutation,
} from "@/app/store/services/api.service";
import { Page } from "@/components/page";
import {
  RiSearchLine,
  RiEditLine,
  RiDeleteBin6Line,
  RiEyeLine,
  RiAddFill,
  RiUploadFill,
  RiDownloadFill,
} from "@remixicon/react";
import {
  Button,
  Input,
  Table,
  Tooltip,
  Popconfirm,
  message,
  Segmented,
  Tag,
  Modal,
  notification,
} from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import type { SingleOrganization } from "./dto/organization.dto";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  MoonStar,
  PlaneLanding,
  Ship,
  TrainFront,
  TriangleAlert,
  Truck,
} from "lucide-react";
import { countries } from "@/constants/countries";
import { exportAsExcel } from "@/utils/exportOrganization";
import moment from "moment";

export function OrganizationsPage() {
  const { data, isFetching } = useGetOrganizationsQuery({});
  const [deleteOrganization] = useDeleteOrganizationMutation();
  const navigate = useNavigate();
  const [searchText, setSearchText] = useState("");
  const [messageApi, contextHolder] = message.useMessage();
  const inputRef = useRef<HTMLInputElement>(null);
  const [importOrgs, { isLoading }] = useImportOrganizationsMutation();
  const [params, setParams] = useSearchParams(
    new URLSearchParams({
      activeType: "Buyers",
    })
  );
  const activeType = params.get("activeType");

  const filteredData = useMemo(() => {
    if (activeType === "Buyers") {
      return data?.filter((item) => item.type === "company");
    }
    if (activeType === "Suppliers") {
      return data?.filter((item) => item.type === "supplier");
    }
    if (activeType === "Competitors") {
      return data?.filter((item) => item.isCompetitor);
    }
  }, [activeType, data]);

  const handleImport = useCallback(
    async (file: File) => {
      inputRef.current!.value = null as any;
      const modal = Modal.confirm({
        title: "Confirm action",
        content: (
          <div className="overflow-hidden grid gap-4">
            <h1 className="font-grotesk text-sm font-medium text-blue-600 whitespace-pre-wrap text-wrap overflow-hidden break-words block max-w-full">
              {file.name}
            </h1>
            <p className="font-sans text-xs">
              Do you want to import data form given file? <br />
              Our AI Agent analyzes this file and extracts data from it to our
              platform!
            </p>
          </div>
        ),
        okText: "Yes, proceed!",
        cancelText: "No, reject!",
        okButtonProps: { className: "success" },
        onOk: async () => {
          const data = new FormData();
          data.append("file", file);
          modal.update({
            okText: "Importing data. Please wait...",
            cancelButtonProps: { className: "hidden" },
            okButtonProps: {
              loading: true,
            },
          });
          try {
            const response = await importOrgs(data).unwrap();
            notification.success({
              message: (
                <div className="grid">
                  <p className="font-grotesk">
                    Detected items from the file:{" "}
                    <b>{response.extractedContent.length}</b>
                  </p>
                  <p className="font-grotesk">
                    Generated items in the file:{" "}
                    <b>{response.createdOrganizations.length}</b>
                  </p>
                </div>
              ),
            });
          } catch (error) {
            notification.error({
              message: "Error occured while importing data!",
            });
          }
        },
      });
    },
    [importOrgs]
  );

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        await deleteOrganization(id).unwrap();
        messageApi.success("Organization deleted successfully");
      } catch (error) {
        console.error("Failed to delete organization:", error);
        messageApi.error("Failed to delete organization");
      }
    },
    [deleteOrganization, messageApi]
  );

  const columns: ColumnsType<SingleOrganization> = useMemo(
    (): ColumnsType<SingleOrganization> => [
      {
        title: "№",
        dataIndex: "_id",
        width: 60,
        key: "_id",
        render: (_value, _record, index) => index + 1,
        align: "center",
      },
      {
        title: "Organization name",
        dataIndex: "name",
        minWidth: 450,
        key: "name",
        sorter: (a, b) => a.name.localeCompare(b.name),
      },

      {
        title: "Country",
        dataIndex: "country",
        key: "country",
        width: 100,
        filterSearch: true,
        filters: countries.map((item) => ({
          text: item.label,
          value: item.label,
        })),
        onFilter: (value, record) => record.country === value,
      },
      {
        title: "Competitor",
        dataIndex: "isCompetitor",
        key: "isCompetitor",
        align: "center",
        width: 120,
        filters: [
          { text: "Competitor", value: true },
          { text: "Not a Competitor", value: false },
        ],
        onFilter: (value, record) => record.isCompetitor === value,
        render: (value) =>
          value ? (
            <TriangleAlert className="text-red-600 mx-auto" />
          ) : (
            <MoonStar className="text-green-600 mx-auto" />
          ),
      },
      {
        title: "Aggregated volume",
        dataIndex: "aggregatedVolume",
        key: "aggregatedVolume",
        width: 150,
        render: (value) => (value > 0 ? value : "N/A"),
        sorter: (a, b) => a.aggregatedVolume! - b.aggregatedVolume!,
      },
      {
        title: "TOP destination ports",
        dataIndex: "topDestinationPorts",
        key: "topDestinationPorts",
        width: 200,
        render: (_value, record) =>
          record.topDestinationPorts!.length > 0 ? (
            <div className="flex gap-1 flex-wrap">
              {record.topDestinationPorts?.map((item, index) => (
                <a key={`dp_${index}_${record._id}`}> {item} </a>
              ))}
            </div>
          ) : (
            "N/A"
          ),
      },
      {
        title: "TOP departure ports",
        dataIndex: "topDeparturePorts",
        key: "topDeparturePorts",
        width: 200,
        render: (_value, record) =>
          record.topDeparturePorts!.length > 0 ? (
            <div className="flex gap-1 flex-wrap">
              {record.topDeparturePorts?.map((item, index) => (
                <a key={`dp_${index}_${record._id}`}> {item} </a>
              ))}
            </div>
          ) : (
            "N/A"
          ),
      },
      {
        title: "Total shipments",
        dataIndex: "totalShipments",
        key: "totalShipments",
        width: 130,
        sorter: (a, b) => a.totalShipments!.count - b.totalShipments!.count,
        render: (_value, record) =>
          record.totalShipments!.count > 0 ? (
            <div>
              <h1 className="font-grotesk font-medium">
                ${record.totalShipments?.cost.toLocaleString()}
              </h1>
              <p>{record.totalShipments?.count.toLocaleString()}</p>
            </div>
          ) : (
            "N/A"
          ),
      },
      {
        title: "Shipments by type",
        dataIndex: "shipments",
        key: "shipments",
        width: 200,
        render: (_value, record) => (
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <Ship className="size-4 text-blue-600" />
              {record.shipments?.sea}
            </span>
            <span className="flex items-center gap-1">
              <PlaneLanding className="size-4 text-indigo-600" />
              {record.shipments?.air}
            </span>
            <span className="flex items-center gap-1">
              <Truck className="size-4 text-orange-600" />
              {record.shipments?.land}
            </span>
            <span className="flex items-center gap-1">
              <TrainFront className="size-4 text-green-600" />
              {record.shipments?.rail}
            </span>
          </div>
        ),
      },
      {
        title: "Average TEU per shipment",
        dataIndex: "averageTEU",
        key: "averageTEUPS",
        width: 150,
        sorter: (a, b) => a.averageTEU!.perShipment - b.averageTEU!.perShipment,
        render: (_value, record) => record.averageTEU?.perShipment,
      },
      {
        title: "Average TEU per month",
        dataIndex: "averageTEU",
        key: "averageTEUPM",
        width: 150,
        sorter: (a, b) => a.averageTEU!.perMonth - b.averageTEU!.perMonth,
        render: (_value, record) => record.averageTEU?.perMonth,
      },
      {
        title: "Total TEU",
        dataIndex: "totalTEU",
        key: "totalTEU",
        width: 100,
        sorter: (a, b) => a.totalTEU! - b.totalTEU!,
      },
      {
        title: "Total weight",
        dataIndex: "totalWeight",
        key: "totalWeight",
        width: 100,
        sorter: (a, b) => a.totalWeight! - b.totalWeight!,
      },
      {
        title: "TOP HS codes",
        dataIndex: "totalWeight",
        key: "totalWeight",
        width: 100,
        render: (_value, record) => (
          <div className="flex gap-1 flex-wrap">
            {record.topHSCodes?.map((item) => (
              <Tag key={`${item}_${record._id}`}>{item}</Tag>
            ))}
          </div>
        ),
      },
      {
        title: "Location",
        dataIndex: "location",
        key: "location",
        width: 100,
      },
      {
        title: "Products",
        dataIndex: "products",
        key: "products",
        width: 200,
        render: (_value, record) => (
          <div className="flex gap-1 flex-wrap">
            {record.products.map((item) => (
              <Tag key={`${item.hsCode}_${record._id}`}>
                {item.hsCode} - {item.name}{" "}
              </Tag>
            ))}
          </div>
        ),
      },
      {
        title: "Tags",
        dataIndex: "tags",
        key: "tags",
        width: 200,
        render: (_value, record) => (
          <div className="flex gap-1 flex-wrap">
            {record.tags.map((item) => (
              <Tag key={`${item}_${record._id}`}>{item}</Tag>
            ))}
          </div>
        ),
      },
      {
        title: "Product description",
        dataIndex: "productDescription",
        key: "productDescription",
        width: 200,
      },

      {
        title: "Actions",
        key: "actions",
        fixed: "right",
        align: "center",
        width: 110,
        render: (_, record) => (
          <div className="flex items-center justify-between">
            <Tooltip title="View">
              <Button
                size="small"
                type="text"
                icon={<RiEyeLine className="text-blue-500 size-4" />}
                onClick={() => navigate(`/organizations/view/${record._id}`)}
              />
            </Tooltip>
            <Tooltip title="Edit">
              <Button
                size="small"
                type="text"
                icon={<RiEditLine className="text-green-500 size-4" />}
                onClick={() => navigate(`/organizations/form?id=${record._id}`)}
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Popconfirm
                title="Delete organization"
                description="Are you sure you want to delete this organization?"
                onConfirm={() => record._id && handleDelete(record._id)}
                okText="Yes"
                cancelText="No"
              >
                <Button
                  size="small"
                  type="text"
                  danger
                  icon={<RiDeleteBin6Line className=" size-4" />}
                />
              </Popconfirm>
            </Tooltip>
          </div>
        ),
      },
    ],
    [handleDelete, navigate]
  );

  return (
    <Page title="Organizations">
      {contextHolder}
      <input
        hidden
        value={undefined}
        type="file"
        onChange={(event) => {
          if (event.target.files && event.target.files?.length > 0) {
            handleImport(event.target.files[0]);
          }
        }}
        ref={inputRef}
        accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
      />
      <div className="grid gap-4">
        <div className="grid grid-cols-[1fr_auto_auto_auto] gap-2">
          <Input
            prefix={<RiSearchLine className="text-inherit size-4" />}
            placeholder="Search by name or location"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            allowClear
          />
          <Button
            type="primary"
            onClick={() =>
              exportAsExcel(
                data || [],
                `ATLAS ORGANIZATIONS | ${moment().format(
                  "DD-MMMM, YYYY, HH:mm"
                )}`
              )
            }
            icon={<RiDownloadFill className="size-4 mt-1.5" />}
          >
            Export
          </Button>
          <Button
            type="primary"
            loading={isLoading}
            onClick={() => inputRef.current?.click()}
            icon={<RiUploadFill className="size-4 mt-1.5" />}
          >
            Import
          </Button>
          <Button
            type="primary"
            icon={<RiAddFill className="size-4 mt-1.5" />}
            onClick={() => navigate("/organizations/form")}
          >
            Create new
          </Button>
        </div>
        <Segmented
          value={activeType}
          onChange={(val) => {
            params.set("activeType", val!);
            setParams(params);
          }}
          options={["Buyers", "Suppliers", "Competitors"]}
        />
        <Table
          dataSource={filteredData || []}
          columns={columns}
          bordered
          loading={isFetching}
          size="small"
          rowKey="_id"
          scroll={{ x: 3000, y: 600 }}
          pagination={false}
        />
      </div>
    </Page>
  );
}
