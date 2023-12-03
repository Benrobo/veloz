import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowStartCenter,
} from "@/components/Flex";
import Layout from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/lib/helpers";
import { getUserSettings } from "@/lib/http/requests";
import { cn } from "@/lib/utils";
import { Github, LayoutDashboard, Settings } from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Tabs = ["general", "project"] as const;

type SettingsTabs = (typeof Tabs)[number];

type SettingsDetails = {
  ghAccountConnected: boolean;
  routerConfig: "page" | "app";
};

type SettingsResponse = {
  errorStatus: boolean;
  data: {
    ghAccountConnected: boolean;
    default_nextjs_router: "page" | "app";
  };
  message: string;
};

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("general");
  // const [settings, setSettings] = useState<SettingsDetails>({
  //   ghAccountConnected: false,
  //   routerConfig: "page",
  // });
  // const getSettingsQuery = useQuery({
  //   queryKey: ["getSettings"],
  //   queryFn: async () => await getUserSettings(),
  // });

  // useEffect(() => {
  //   if (getSettingsQuery.data) {
  //     const data = getSettingsQuery.data as SettingsResponse;
  //     if (data.errorStatus) {
  //       toast.error(getSettingsQuery.data?.message as string);
  //       return;
  //     }
  //     console.log(data?.data);
  //     setSettings({
  //       ghAccountConnected: data?.data?.ghAccountConnected,
  //       routerConfig: data?.data?.default_nextjs_router,
  //     });
  //   }
  // }, [
  //   getSettingsQuery.data,
  //   getSettingsQuery.error,
  //   getSettingsQuery.isLoading,
  // ]);

  const getTabTitle = (tab: SettingsTabs) => {
    switch (tab) {
      case "general":
        return "General";
      case "project":
        return "Project";
      default:
        return "General";
    }
  };

  return (
    <Layout activePage="settings">
      <FlexColStart className="w-full px-4 py-5">
        <h1 className="text-white-100 text-2xl font-ppSB">Settings</h1>
        <p className="text-gray-100 leading-none font-ppL text-[13px]">
          Manage your account settings.
        </p>
      </FlexColStart>
      <br />
      <FlexColStart className="w-full px-5 mt-4">
        {/* Tabs */}
        <FlexRowStartCenter className="w-fit border-b-solid border-b-[1px] border-b-white-600 gap-0 ">
          {Tabs.map((t) => (
            <Button
              key={t}
              className={cn(
                "bg-transparent text-[13px] text-white-100 rounded-t-md rounded-b-none rounded-l-none rounded-r-none group transition-all gap-2 border-solid border-[1px]",
                activeTab === t
                  ? " border-b-transparent border-t-white-600 border-l-white-600 border-r-white-600 bg-dark-200 hover:bg-dark-200 "
                  : "border-transparent text-gray-100 hover:bg-transparent"
              )}
              onClick={() => setActiveTab(t)}
            >
              {renderTabIcon(t, activeTab)}
              <span
                className={cn(
                  "font-ppR group-hover:text-white-100 transition-all",
                  activeTab === t ? "text-white-100" : "text-gray-100"
                )}
              >
                {getTabTitle(t)}
              </span>
            </Button>
          ))}
        </FlexRowStartCenter>

        {/* Loading */}
        {/* {getSettingsQuery.isLoading && (
          <FlexColCenter className="w-full">
            <Spinner color="#fff" />
          </FlexColCenter>
        )} */}

        {/* General Tab Content */}

        {/* Project Tab Content */}
      </FlexColStart>
    </Layout>
  );
}

export default withAuth(SettingsPage);

function renderTabIcon(tab: SettingsTabs, activeTab: SettingsTabs) {
  let icon = null;
  if (tab === "general") {
    icon = (
      <Settings
        size={15}
        className={cn(
          "group-hover:text-white-100 text-white-100",
          activeTab === "general" ? "text-white-100" : "text-gray-100"
        )}
      />
    );
  }
  if (tab === "project") {
    icon = (
      <LayoutDashboard
        size={15}
        className={cn(
          "group-hover:text-white-100 text-white-100",
          activeTab === "project" ? "text-white-100" : "text-gray-100"
        )}
      />
    );
  }
  return icon;
}
