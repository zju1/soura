import { useGetOrganizationByIdQuery } from "@/app/store/services/api.service";

import { Button, Tabs } from "antd";
import { useNavigate, useSearchParams } from "react-router-dom";
import { countries } from "@/constants/countries";
import { GeneralInfoCard } from "@/features/organizations/components/GeneralInfoCard";
import { OrganizationTrades } from "@/features/organizations/components/OrganizationTrades";
import { useAuth } from "@/hooks/useAuth";
import { Edit } from "lucide-react";

export function OrganizationView() {
  const [params, setParams] = useSearchParams(
    new URLSearchParams({
      viewTab: "trades",
    })
  );
  const navigate = useNavigate();
  const viewTab = params.get("viewTab");
  const { user } = useAuth();
  const { data } = useGetOrganizationByIdQuery(user!.organizationId!, {
    refetchOnMountOrArgChange: true,
  });

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
    <div>
      {data && (
        <div className="grid gap-4">
          <div className="flex items-center justify-between">
            {title}
            <Button
              onClick={() =>
                navigate(`/organizations/form?id=${user?.organizationId}`)
              }
              icon={<Edit className="size-3" />}
            >
              Edit
            </Button>
          </div>
          <GeneralInfoCard {...data!} />
          <Tabs
            activeKey={viewTab!}
            onChange={(newActiveKey) => {
              params.set("viewTab", newActiveKey);
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
          {viewTab === "trades" && <OrganizationTrades {...data} />}
        </div>
      )}
    </div>
  );
}
