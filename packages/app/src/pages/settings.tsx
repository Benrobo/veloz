import {
  FlexColCenter,
  FlexColStart,
  FlexRowCenter,
  FlexRowStart,
  FlexRowStartCenter,
} from "@/components/Flex";
import Layout from "@/components/Layout";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { withAuth } from "@/lib/helpers";
import { getUserSettings, rotateToken } from "@/lib/http/requests";
import { cn } from "@/lib/utils";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  Copy,
  Github,
  LayoutDashboard,
  RotateCw,
  Settings,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Tabs = ["general"] as const;

type SettingsTabs = (typeof Tabs)[number];

type SettingsDetails = {
  veloz_token: string;
};

type SettingsResponse = {
  errorStatus: boolean;
  data: {
    veloz_token: string;
  };
  message: string;
};

function SettingsPage() {
  const [activeTab, setActiveTab] = useState<SettingsTabs>("general");
  const [settings, setSettings] = useState<SettingsDetails>({
    veloz_token: "",
  });
  const getSettingsQuery = useQuery({
    queryKey: ["getSettings"],
    queryFn: async () => await getUserSettings(),
  });
  const rotateTokenMutation = useMutation({
    mutationFn: async () => await rotateToken(),
  });

  useEffect(() => {
    if (getSettingsQuery.error) {
      toast.error(getSettingsQuery.error?.message as string);
      return;
    }

    if (getSettingsQuery.data) {
      const data = getSettingsQuery.data as SettingsResponse;
      if (data.errorStatus) {
        toast.error(getSettingsQuery.data?.message as string);
        return;
      }
      setSettings({
        veloz_token: data?.data.veloz_token,
      });
    }
  }, [
    getSettingsQuery.data,
    getSettingsQuery.error,
    getSettingsQuery.isLoading,
  ]);

  useEffect(() => {
    if (rotateTokenMutation.error) {
      rotateTokenMutation.reset();
      toast.error(rotateTokenMutation.error?.message as string);
      return;
    }

    if (rotateTokenMutation.data) {
      rotateTokenMutation.reset();
      getSettingsQuery.refetch();
    }
  }, [
    rotateTokenMutation.data,
    rotateTokenMutation.error,
    rotateTokenMutation.isPending,
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
        {/* {getSettingsQuery.isLoading && (
          <FlexColCenter className="w-full">
            <Spinner color="#fff" />
          </FlexColCenter>
        )} */}

        {/* General Tab Content */}
        {activeTab === "general" && (
          <FlexColStart className="w-full mt-4">
            <FlexColStart className="w-fit max-w-[70%]">
              <p className="text-white-100 text-[13px] font-ppSB">Account</p>
              <p className="text-[12px] text-white-200 font-jbSB">
                Veloz token authenticates your CLI. Keep it confidential.
                Rotating the token invalidates the previous one;
                reauthentication with the new token is{" "}
                <span className="text-white-100 font-jbEB">required</span>.
              </p>
            </FlexColStart>
            <FlexRowStart className="w-fit min-w-[350px] gap-2 bg-dark-200 px-3 py-[5px] rounded-md">
              <Input
                placeholder="veloz token"
                value={settings.veloz_token}
                disabled
                className="min-w-[200px] bg-dark-200 border-none font-jbSB text-white-300 focus-visible:ring-transparent placeholder:text-white-400 focus-visible:outline-none  "
              />
              <button
                className=" px-3 py-3 rounded-lg border-solid border-[.5px] border-white-600 font-jbSB text-white-300 scale-[.85]"
                onClick={() => {
                  navigator.clipboard.writeText(settings.veloz_token);
                  toast.success("Copied to clipboard");
                }}
              >
                <Copy size={15} />
              </button>
              <button
                className={cn(
                  " px-3 py-3 rounded-lg border-solid border-[.5px] border-white-600 font-jbSB text-white-300 scale-[.85]"
                )}
                onClick={() => {
                  const confirm = window.confirm(
                    "This would rotate your token, Are you sure about this action?"
                  );
                  if (confirm) {
                    rotateTokenMutation.mutate();
                  }
                }}
                disabled={
                  rotateTokenMutation.isPending ?? getSettingsQuery.isPending
                }
              >
                <RotateCw
                  size={15}
                  className={cn(
                    rotateTokenMutation.isPending ? "animate-spin" : ""
                  )}
                />
              </button>
            </FlexRowStart>
          </FlexColStart>
        )}

        {/* Project Tab Content */}
        {/* {activeTab === "project" && (
          <FlexColStart className="w-auto">
            
          </FlexColStart>
        )} */}
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
