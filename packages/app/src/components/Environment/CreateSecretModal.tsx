import React, { useEffect, useState } from "react";
import Modal from "../Modal";
import { FlexColCenter, FlexColStart, FlexRowCenterBtw } from "../Flex";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import ManageSecrets from "./ManageSecrets";
import { Button } from "../ui/button";
import { TechStackCategory } from "@veloz/shared/types";
import { Secrets } from "../../../types";
import toast from "react-hot-toast";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
  DropdownMenuRadioItem,
  DropdownMenuRadioGroup,
} from "../ui/dropdown-menu";
import { Tags } from "lucide-react";

interface AddSecretModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function AddSecretModal({ isOpen, onClose }: AddSecretModalProps) {
  const [envName, setEnvName] = useState("test-env");
  const [secrets, setSecrets] = useState<Secrets[]>([]);
  const [category, setCategory] = useState<TechStackCategory>("frontend");

  function saveSecret() {
    if (envName.length === 0) {
      toast.error("ENV name cannot be empty.");
      return;
    }
    if (typeof secrets === "undefined" || secrets.length === 0) {
      toast.error("Secrets cannot be empty.");
      return;
    }

    const payload = {
      name: envName,
      secrets,
      category,
    };
    console.log(payload);
  }

  return (
    <Modal isBlurBg isOpen={isOpen} onClose={onClose} showCloseIcon>
      {/* Card */}
      <FlexColCenter className="w-full h-full">
        {/* Header */}
        <FlexColCenter className="w-full h-auto max-h-[550px] max-w-[550px] bg-dark-300 rounded-lg py-3 shadow-xl drop-shadow-xl">
          <FlexColStart className="w-full px-4 py-3 border-b-solid border-b-[.5px] border-b-white-600">
            <h1
              className={cn("text-white-100 font-ppB text-[20px] leading-none")}
            >
              Create Environmental Variable
            </h1>
            <p className="text-gray-100 font-ppR text-[14px] mt-[-.5em] leading-none">
              Create a new environmental variable for your project.
            </p>
          </FlexColStart>
          <FlexRowCenterBtw className="w-full px-5">
            <FlexColStart className="w-full">
              <span className="text-white-200 text-[13px] font-jbR ">
                Environment name (max: {25 - envName.length})
              </span>
              <Input
                name="variable"
                placeholder="Environment Name"
                className="bg-dark-200 placeholder:text-gray-100 text-white-200 font-jbSB border-solid border-[.5px] border-white-600 py-6 px-5 "
                defaultValue={envName}
                onChange={(e: any) => setEnvName(e.target.value)}
                autoFocus={true}
                maxLength={20}
              />
            </FlexColStart>
            <FlexColStart className="w-full">
              <span className="text-white-200 text-[13px] font-jbR ">
                Category
              </span>
              <DropdownMenu>
                <DropdownMenuTrigger className="w-auto">
                  <Button className="w-auto gap-1 bg-dark-200 py-6 font-jbR text-[12.4px] text-white-100 hover:bg-dark-200/90 ">
                    <Tags size={15} className="mr-1" /> Select Category (
                    {category})
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-full bg-dark-200 border-white-600">
                  {["Frontend", "Backend"].map((d) => (
                    <DropdownMenuRadioGroup
                      value={category}
                      onValueChange={(value) =>
                        setCategory(value as TechStackCategory)
                      }
                    >
                      <DropdownMenuRadioItem
                        key={d}
                        className="w-full text-white-100 font-jbR hover:!bg-dark-300 hover:!text-white-100 cursor-pointer"
                        value={d.toLowerCase()}
                      >
                        {d}
                      </DropdownMenuRadioItem>
                    </DropdownMenuRadioGroup>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </FlexColStart>
          </FlexRowCenterBtw>
          <FlexColStart className="w-full h-full overflow-y-scroll hideScrollBar2 px-4 mt-5">
            <span className="text-white-200 text-[13px] font-jbR ">
              Secrets
            </span>
            <ManageSecrets
              getOnlySecrets={(secrets) => setSecrets(secrets)}
              hideSaveBtn={true}
            />
          </FlexColStart>
          <FlexColCenter className="w-full px-3 py-3">
            <Button
              variant={"appeal"}
              className="w-full font-jbR text-[13px] py-4"
              onClick={saveSecret}
            >
              Save Secret
            </Button>
          </FlexColCenter>
        </FlexColCenter>
      </FlexColCenter>
    </Modal>
  );
}

export default AddSecretModal;
