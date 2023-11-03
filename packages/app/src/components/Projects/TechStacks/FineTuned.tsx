import { FlexColStart, FlexRowStartCenter } from "@/components/Flex";
import { cn } from "@/lib/utils";
import { Button } from "@radix-ui/themes";
import { Crosshair, Gem } from "lucide-react";
import React from "react";
import { Tabs } from ".";

interface FineTunedProps {}

function FineTuned({}: FineTunedProps) {
  return <FlexColStart className="w-full">refined</FlexColStart>;
}

export default FineTuned;
