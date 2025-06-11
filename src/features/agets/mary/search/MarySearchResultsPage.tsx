import { Page } from "@/components/page";
import { Button, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useMemo } from "react";

import { useNavigate, useParams } from "react-router-dom";
import type { CompanySearchResult, SingleCompany } from "./mary-search.dto";
import { useGetSearchByIdQuery } from "@/app/store/services/api.service";
import {
  RiArrowLeftLine,
  RiLinkedinBoxFill,
  RiPhoneFill,
  RiGlobalLine,
} from "@remixicon/react";

export function MarySearchResultsPage() {
  const { searchId } = useParams<{ searchId: string }>();
  const navigate = useNavigate();

  const { data, isFetching } = useGetSearchByIdQuery(searchId!, {
    skip: !searchId,
    refetchOnMountOrArgChange: true,
  });

  const renderCell = (value: any) =>
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0) ? (
      <span
        style={{
          fontSize: 22,
          color: "#bbb",
          display: "block",
          textAlign: "center",
        }}
      >
        -
      </span>
    ) : (
      false
    );

  const columns = useMemo<ColumnsType<SingleCompany>>(
    () => [
      {
        title: "Company Name",
        dataIndex: "company_name",
        key: "company_name",
        width: 220,
        fixed: "left",
        render: (text) =>
          renderCell(text) || (
            <div className="font-semibold text-base text-stone-800">{text}</div>
          ),
      },
      {
        title: "Type",
        dataIndex: "company_type",
        key: "company_type",
        width: 120,
        align: "center",
        render: (type) =>
          renderCell(type) || (
            <Tag color="blue" className="capitalize">
              {type}
            </Tag>
          ),
      },
      {
        title: "Founded",
        dataIndex: "year_founded",
        key: "year_founded",
        width: 100,
        align: "center",
        render: renderCell,
      },
      {
        title: "Employees",
        dataIndex: "employee_count",
        key: "employee_count",
        width: 120,
        align: "center",
        render: (val) =>
          val ? `${val.value.toLocaleString()} (${val.type})` : renderCell(val),
      },
      {
        title: "Revenue",
        dataIndex: "revenue",
        key: "revenue",
        width: 120,
        align: "center",
        render: (val) =>
          val
            ? `$${val.value.toLocaleString()} (${val.type})`
            : renderCell(val),
      },
      {
        title: "Industry",
        dataIndex: "main_industry",
        key: "main_industry",
        width: 250,
        align: "center",
        render: (text) =>
          renderCell(text) || (
            <Tag color="purple" className="capitalize">
              {text}
            </Tag>
          ),
      },
      {
        title: "Sector",
        dataIndex: "main_sector",
        key: "main_sector",
        width: 250,
        align: "center",
        render: (text) =>
          renderCell(text) || (
            <Tag color="geekblue" className="capitalize">
              {text}
            </Tag>
          ),
      },
      {
        title: "Description",
        dataIndex: "short_description",
        key: "short_description",
        width: 300,
        align: "center",
        render: (text) =>
          renderCell(text) || (
            <span className="text-stone-600 line-clamp-2">{text}</span>
          ),
      },
      {
        title: "Top Tags",
        dataIndex: "business_tags_extracted",
        key: "business_tags_extracted",
        width: 300,
        align: "center",
        render: (tags: string[]) =>
          !tags || tags.length === 0 ? (
            renderCell(tags)
          ) : (
            <div className="flex flex-wrap gap-1">
              {(tags?.slice(0, 2) || []).map((tag) => (
                <Tag color="success" key={tag} className="mb-1">
                  {tag}
                </Tag>
              ))}
              {tags && tags.length > 2 && (
                <Tag color="default" className="mb-1">
                  +{tags.length - 2} more
                </Tag>
              )}
            </div>
          ),
      },
      {
        title: "Phone",
        dataIndex: "primary_phone",
        key: "primary_phone",
        width: 140,
        align: "center",
        render: (phone) =>
          phone ? (
            <span className="flex items-center gap-1">
              <RiPhoneFill className="text-green-500 size-4" />
              <span>{phone}</span>
            </span>
          ) : (
            renderCell(phone)
          ),
      },
      {
        title: "LinkedIn",
        dataIndex: "linkedin_url",
        key: "linkedin_url",
        width: 120,
        align: "center",
        render: (url) =>
          url ? (
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-700 hover:underline"
            >
              <RiLinkedinBoxFill className="size-5" />
              LinkedIn
            </a>
          ) : (
            renderCell(url)
          ),
      },
      {
        title: "Website",
        dataIndex: "website_domain",
        key: "website_domain",
        width: 250,
        align: "center",
        render: (domain) =>
          domain ? (
            <a
              href={`https://${domain}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-blue-600 hover:underline"
            >
              <RiGlobalLine className="size-5 shrink-0" />
              {domain}
            </a>
          ) : (
            renderCell(domain)
          ),
      },
    ],
    []
  );

  return (
    <Page
      title={
        <div className="flex items-center gap-2">
          <Button type="text" onClick={() => navigate(-1)} className="p-0">
            <RiArrowLeftLine />
          </Button>
          <h1 className="font-extrabold font-grotesk text-2xl">{searchId}</h1>
        </div>
      }
    >
      <Table
        dataSource={
          (
            JSON.parse(
              data?.data.json || JSON.stringify({ result: [] })
            ) as CompanySearchResult
          ).result
        }
        loading={isFetching}
        bordered
        pagination={false}
        rowSelection={{}}
        columns={columns as any}
        scroll={{ y: window.innerHeight * 0.75, x: 1600 }}
      />
    </Page>
  );
}
