import { Table } from "antd";

export interface Supplier {
  name: string;
  website: string;
  industry: string;
  desc: string;
  createdDate: string;
  country: string;
  address: string;
  contact: string;
  id: number;
}

export function SupplierTable({ result }: { result: Supplier[] }) {
  return (
    <div className="p-4 grid gap-4 content-start">
      <h1 className="font-bold text-xl py-4 border-b">Sourcing result</h1>
      <div>
        <Table<Supplier>
          bordered
          rowKey="id"
          size="large"
          columns={[
            {
              title: "№",
              dataIndex: "id",
              key: "id",
              width: 50,
              align: "center",
            },
            {
              title: "Name",
              dataIndex: "name",
              key: "name",
              width: 200,
            },
            {
              title: "Description",
              dataIndex: "desc",
              key: "desc",
              minWidth: 250,
              render: (value) => <p className="line-clamp-6">{value}</p>,
            },
            {
              title: "Website",
              dataIndex: "website",
              key: "website",
              width: 200,
              render: (value) => (
                <a href={value} target="_blank">
                  {" "}
                  {value}{" "}
                </a>
              ),
            },
            {
              title: "Industry",
              dataIndex: "industry",
              key: "industry",
              width: 200,
            },
            {
              title: "Country",
              dataIndex: "country",
              key: "country",
              width: 200,
            },
            {
              title: "Contact",
              dataIndex: "contact",
              key: "contact",
              width: 250,
            },
          ]}
          dataSource={result}
          scroll={{
            y: "70dvh",
            x: "1600px",
          }}
          pagination={false}
        />
      </div>
    </div>
  );
}
