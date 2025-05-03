import { useGetOrganizationByIdQuery } from "@/app/store/services/api.service";
import { Page } from "@/components/page";
import {
  RiArrowLeftLine,
  RiBookmarkLine,
  RiEditLine,
  RiShareLine,
} from "@remixicon/react";
import { Button, Tabs } from "antd";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { GeneralInfoCard } from "./components/GeneralInfoCard";
import { countries } from "@/constants/countries";
import { OrganizationTrades } from "./components/OrganizationTrades";

export function OrganizationViewPage() {
  const [params, setParams] = useSearchParams(
    new URLSearchParams({
      activeTab: "trades",
    })
  );
  const activeTab = params.get("activeTab");
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetOrganizationByIdQuery(id!, {
    refetchOnMountOrArgChange: true,
  });
  const navigate = useNavigate();
  const title = (
    <h2 className="flex items-center gap-2 font-grotesk font-black text-2xl">
      <span>{data?.name}</span>
      <img
        src={countries.find((item) => item.label === data?.country)?.image}
        className="size-8"
      />
    </h2>
  );
  return (
    <Page
      title={
        isLoading && !data ? (
          "Loading..."
        ) : (
          <div className="grid lg:flex gap-4 items-center">
            <Button
              onClick={() => navigate(-1)}
              type="text"
              className="p-0 aspect-square rounded-full"
            >
              <RiArrowLeftLine />
            </Button>
            <div className="hidden lg:block">{title}</div>
          </div>
        )
      }
      extra={
        <div className="flex gap-2">
          <Button size="small" icon={<RiShareLine className="size-3 mt-0.5" />}>
            Share
          </Button>
          <Button
            size="small"
            icon={<RiBookmarkLine className="size-3 mt-0.5" />}
          >
            Save
          </Button>
          <Button
            onClick={() => navigate(`/organizations/form?id=${data?._id}`)}
            size="small"
            icon={<RiEditLine className="size-3 mt-0.5" />}
          >
            Edit
          </Button>
        </div>
      }
    >
      {data && (
        <div className="grid gap-4">
          <div className="block lg:hidden">{title}</div>
          <GeneralInfoCard {...data!} />
          <Tabs
            activeKey={activeTab!}
            onChange={(newActiveKey) => {
              params.set("activeTab", newActiveKey);
              setParams(params);
            }}
            className="font-grotesk font-bold"
            items={[
              {
                label: "Trade info",
                key: "trades",
              },
              {
                label: "Statistics",
                key: "statistics",
              },
              {
                label: "Relations",
                key: "relations",
              },
              {
                label: "Products",
                key: "products",
              },
            ]}
          />
          {activeTab === "trades" && <OrganizationTrades {...data} />}
        </div>
      )}
    </Page>
  );
}
