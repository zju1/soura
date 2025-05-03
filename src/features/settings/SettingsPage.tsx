import { Tabs } from "antd";
import { useSearchParams } from "react-router-dom";
import { ProfileView } from "./components/profile/ProfileView";
import { OrganizationView } from "./components/organization/OrganizationView";

const tabContent = {
  profile: <ProfileView />,
  "my-organization": <OrganizationView />,
};

export function SettingsPage() {
  const [params, setParams] = useSearchParams(
    new URLSearchParams({
      activeTab: "profile",
    })
  );
  const activeTab = params.get("activeTab");

  return (
    <div className="px-6 py-2 grid gap-4">
      <Tabs
        size="large"
        activeKey={activeTab!}
        onChange={(newKey) => {
          params.set("activeTab", newKey);
          setParams(params);
        }}
        items={[
          {
            label: "Profile",
            key: "profile",
          },
          {
            label: "My organization",
            key: "my-organization",
          },
        ]}
      />
      {tabContent[activeTab as keyof typeof tabContent]}
    </div>
  );
}
