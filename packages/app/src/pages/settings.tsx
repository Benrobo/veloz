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
import { RadioGroup } from "@radix-ui/themes";
import { useQuery } from "@tanstack/react-query";
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
  const [settings, setSettings] = useState<SettingsDetails>({
    ghAccountConnected: false,
    routerConfig: "page",
  });
  const getSettingsQuery = useQuery({
    queryKey: ["getSettings"],
    queryFn: async () => await getUserSettings(),
  });

  useEffect(() => {
    if (getSettingsQuery.data) {
      const data = getSettingsQuery.data as SettingsResponse;
      if (data.errorStatus) {
        toast.error(getSettingsQuery.data?.message as string);
        return;
      }
      console.log(data?.data);
      setSettings({
        ghAccountConnected: data?.data?.ghAccountConnected,
        routerConfig: data?.data?.default_nextjs_router,
      });
    }
  }, [
    getSettingsQuery.data,
    getSettingsQuery.error,
    getSettingsQuery.isLoading,
  ]);

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
        {getSettingsQuery.isLoading && (
          <FlexColCenter className="w-full">
            <Spinner color="#fff" />
          </FlexColCenter>
        )}

        {/* General Tab Content */}
        {getSettingsQuery.isLoading
          ? null
          : activeTab === "general" && (
              <FlexColStart className="w-full mt-5">
                <FlexColStart className="w-fit">
                  <h1 className="text-white-100 text-[15px] font-ppB">
                    Connect your Github account
                  </h1>
                  <p className="text-gray-100 leading-none font-ppL text-[13px]">
                    Connect your Github account to Veloz to enable Github
                    integration.
                  </p>
                  <Button
                    className={cn(
                      "w-auto mt-2 gap-2",
                      settings.ghAccountConnected
                        ? "bg-dark-300"
                        : "bg-green-105"
                    )}
                    variant={
                      settings.ghAccountConnected ? "success" : "success"
                    }
                    onClick={() =>
                      (window.location.href = "/api/github/connect")
                    }
                    disabled={settings.ghAccountConnected}
                  >
                    <Github size={15} />
                    <span className="text-white-100 text-[10px] font-ppSB">
                      {settings.ghAccountConnected
                        ? "Connected"
                        : "Connect Github"}
                    </span>
                  </Button>
                </FlexColStart>
                <br />
              </FlexColStart>
            )}

        {/* Project Tab Content */}
        {!getSettingsQuery.isPending && activeTab === "project" && (
          <FlexColStart className="w-full mt-5">
            {/* Nextjs (App / Page) router config */}
            <FlexColStart>
              <h1 className="text-white-100 text-[15px] font-ppB">
                Nextjs router config
              </h1>
              <p className="text-gray-100 leading-none font-ppL text-[13px]">
                Veloz uses page router by default, you can select your default
                router here.
              </p>
              <FlexRowStartCenter className="mt-2">
                <RadioGroup.Root
                  onValueChange={(value) =>
                    setSettings((prev) => ({ ...prev, routerConfig: "page" }))
                  }
                  defaultValue={settings.routerConfig}
                >
                  <FlexRowCenter className="w-fit gap-4">
                    <FlexRowCenter>
                      <RadioGroup.Item value="page" />
                      <span className="text-white-100 text-[13px] font-ppSB">
                        Page
                      </span>
                    </FlexRowCenter>
                    <FlexRowCenter>
                      <RadioGroup.Item value="app" />
                      <span className="text-white-100 text-[13px] font-ppSB">
                        App
                      </span>
                    </FlexRowCenter>
                  </FlexRowCenter>
                </RadioGroup.Root>
              </FlexRowStartCenter>
              <Button
                className="w-auto mt-2"
                variant={"appeal"}
                disabled={settings.routerConfig === "page"}
              >
                <span className="text-white-100 text-[10px] font-ppSB">
                  Save Changes
                </span>
              </Button>
            </FlexColStart>

            <br />
          </FlexColStart>
        )}
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
