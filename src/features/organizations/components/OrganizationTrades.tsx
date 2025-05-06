import { Card, DatePicker, Form, Table } from "antd";
import type { SingleOrganization } from "../dto/organization.dto";
import { mockTrades } from "@/mock/mock-trades";
import { OrganizationTradeCharts } from "./OrganizationTradeCharts";

export function OrganizationTrades(props: SingleOrganization) {
  return (
    <div className="grid gap-4">
      <Form>
        <Form.Item label="Select date range">
          <DatePicker.RangePicker />
        </Form.Item>
      </Form>
      <div className="grid gap-4 grid-cols-2">
        <OrganizationTradeCharts
          title={`${props.name}'s total shipments over time`}
          {...props}
        />
        <OrganizationTradeCharts
          title={`${props.name}'s total purchases over time`}
          {...props}
        />
      </div>
      <Card
        title={`${props.name}'s most recent shipments`}
        className="shadow-md font-grotesk"
      >
        <Table
          columns={[
            {
              title: "№",
              dataIndex: "_id",
              width: 50,
              key: "_id",
              render: (_value, _record, index) => index + 1,
              align: "center",
            },

            {
              title: "Supplier name",
              dataIndex: "supplierName",
              minWidth: 250,
              key: "supplierName",
              sorter: (a, b) => a.supplierName.localeCompare(b.supplierName),
              render: (value, record) => (
                <div className="grid gap-1">
                  <a
                    className="text-blue-600 underline font-grotesk font-semibold text-sm"
                    href="#"
                  >
                    {value}
                  </a>
                  <a
                    className="text-blue-600 underline font-grotesk font-normal text-xs"
                    href="#"
                  >
                    {record.fromCountry}
                  </a>
                </div>
              ),
            },
            {
              title: "Declaration date",
              dataIndex: "declarationDate",
              width: 150,
              key: "declarationDate",
              sorter: (a, b) =>
                a.declarationDate.localeCompare(b.declarationDate),
            },
            {
              title: "HS Code",
              dataIndex: "hsCode",
              width: 150,
              key: "hsCode",
              sorter: (a, b) => a.hsCode.localeCompare(b.hsCode),
              render: (value) => (
                <a className="underline" href="#">
                  {" "}
                  {value}{" "}
                </a>
              ),
            },
            {
              title: "Product",
              dataIndex: "product",
              width: 150,
              key: "product",
              sorter: (a, b) => a.product.localeCompare(b.product),
              render: (value) => (
                <a className="underline" href="#">
                  {" "}
                  {value}{" "}
                </a>
              ),
            },
            {
              title: "Product description",
              dataIndex: "productDescription",
              width: 450,
              key: "productDescription",
              sorter: (a, b) =>
                a.productDescription.localeCompare(b.productDescription),
            },
            {
              title: "Origin country",
              dataIndex: "fromCountry",
              width: 150,
              key: "fromCountry",
              sorter: (a, b) => a.fromCountry.localeCompare(b.fromCountry),
              render: (value) => (
                <a className="underline" href="#">
                  {" "}
                  {value}{" "}
                </a>
              ),
            },
            {
              title: "Total price (USD)",
              dataIndex: "totalPrice",
              width: 100,
              key: "totalPrice",
              sorter: (a, b) =>
                String(a.totalPrice).localeCompare(String(b.totalPrice)),
              render: (value: number) => `$${value.toLocaleString()}`,
            },
            {
              title: "Net weight (kg)",
              dataIndex: "netWeight",
              width: 100,
              key: "netWeight",
              sorter: (a, b) =>
                String(a.netWeight).localeCompare(String(b.netWeight)),
            },
            {
              title: "Quantity",
              dataIndex: "quantity",
              width: 100,
              key: "quantity",
              sorter: (a, b) =>
                String(a.quantity).localeCompare(String(b.quantity)),
            },
            {
              title: "Quantity unit",
              dataIndex: "quantityUnit",
              width: 100,
              key: "quantityUnit",
              sorter: (a, b) =>
                String(a.quantityUnit).localeCompare(String(b.quantityUnit)),
            },
            {
              title: "Unit price",
              dataIndex: "unitPrice",
              width: 100,
              key: "unitPrice",
              sorter: (a, b) =>
                String(a.unitPrice).localeCompare(String(b.unitPrice)),
              render: (value: number) => `$${value.toLocaleString()}`,
            },
          ]}
          dataSource={mockTrades}
          bordered
          rowKey="_id"
          pagination={false}
          scroll={{
            y: 600,
            x: 2000,
          }}
        />
      </Card>
    </div>
  );
}
