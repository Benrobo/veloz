import Layout from "@/components/Layout";
import Link from "next/link";
import React, { useContext, useEffect, useState } from "react";
import {
  FineTunedStacksName,
  ProjectType,
  TechStackPricingPlan,
} from "@veloz/shared/types";
import { useQuery } from "@tanstack/react-query";
import { getProjects, getKits } from "@/lib/http/requests";
import {
  FlexColCenter,
  FlexColStart,
  FlexColStartCenter,
  FlexRowCenter,
  FlexRowCenterBtw,
  FlexRowStart,
  FlexRowStartBtw,
  FlexRowStartCenter,
} from "@/components/Flex";
import { Spinner } from "@/components/Spinner";
import DataContext from "@/context/DataContext";
import { ProjectContext } from "@/context/ProjectContext";
import { ResponseData, ReturnedTemplatesType } from "@/types";
import toast from "react-hot-toast";
import StarterKitCard from "@/components/StarterKits/StarterKitCard";
import withAuth from "@/lib/auth/withAuth";

function Templates() {
  const {} = useContext(ProjectContext);
  const [templates, setTemplates] = useState<ReturnedTemplatesType[]>([]);
  const getTemplatesQuery = useQuery({
    queryKey: ["getKits"],
    queryFn: async () => await getKits(),
  });

  // refetch templates when page is active
  // usePageActive({ fn: () => getTemplatesQuery.refetch(), log: true });

  useEffect(() => {
    if (getTemplatesQuery.error) {
      const errMsg = (getTemplatesQuery.error as any)?.response?.data?.message;
      toast.error(errMsg);
    }
    if (getTemplatesQuery.data) {
      const data = getTemplatesQuery.data as ResponseData;
      setTemplates(data.data as ReturnedTemplatesType[]);
    }
  }, [
    getTemplatesQuery.data,
    getTemplatesQuery.error,
    getTemplatesQuery.isPending,
  ]);

  return (
    // @ts-expect-error
    <Layout activePage="kits">
      <FlexColStart className="w-full px-4 py-4 ">
        <FlexRowCenterBtw className="w-full">
          <FlexColStart className="gap-2">
            <p className="text-white-100 font-jbEB text-[14px]">
              Veloz Templates
            </p>
            <p className="text-white-300 font-jbSB text-[11px]">
              Ship your project faster with our templates. Select a template to
              start with.
            </p>
          </FlexColStart>
        </FlexRowCenterBtw>

        {getTemplatesQuery.isPending && (
          <FlexColStartCenter className="w-full h-full">
            <Spinner size={15} />
          </FlexColStartCenter>
        )}

        <br />
        {/* Template parents */}
        <FlexRowStartCenter className="w-full flex-wrap">
          {!getTemplatesQuery.isPending &&
            templates.length > 0 &&
            templates.map((d) => (
              <StarterKitCard
                name={d.name}
                id={d.id}
                tagline={d.tagline}
                pricing_plan={d.pricing_plan}
                userImages={d.users.images}
                thumbnail={d.image}
                key={d.id}
                discount={d.discount}
              />
            ))}

          {!getTemplatesQuery.isPending && templates.length === 0 && (
            <FlexColStartCenter className="w-full h-full">
              <p className="text-white-300 font-jbSB text-[12px] ">
                No templates found
              </p>
            </FlexColStartCenter>
          )}
        </FlexRowStartCenter>
      </FlexColStart>
    </Layout>
  );
}

export default withAuth(Templates);
