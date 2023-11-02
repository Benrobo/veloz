import React, { useContext, useEffect, useState } from "react";
import { FlexColStart, FlexRowCenter } from "../Flex";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { cn, parseEnvString } from "@/lib/utils";
import { SecretDataTypes, Secrets } from "../../../types";
import { ProjectContext } from "@/context/ProjectContext";

interface ManageSecretsProps {
  selectedEnv?: {
    name: string;
    id: string | any;
    secrets: {
      id: string | any;
      name: string;
      value: string;
    }[];
  };
  getUpdatedSecrets?: (secrets: SecretDataTypes) => void;
  getOnlySecrets?: (secrets: Secrets[]) => void;
  hideSaveBtn?: boolean;
  btmSpace?: boolean;
}

function ManageSecrets({
  selectedEnv,
  hideSaveBtn,
  getUpdatedSecrets,
  getOnlySecrets,
  btmSpace,
}: ManageSecretsProps) {
  const {} = useContext(ProjectContext);
  const [env, setEnv] = useState<SecretDataTypes>({} as SecretDataTypes);
  const [focusInput, setFocusInput] = useState<"name" | "value">("name");

  useEffect(() => {
    if (
      selectedEnv ||
      selectedEnv !== null ||
      typeof selectedEnv !== "undefined"
    ) {
      setEnv(selectedEnv as SecretDataTypes);
    }
  }, [selectedEnv]);

  useEffect(() => {
    getUpdatedSecrets && getUpdatedSecrets(env);
    getOnlySecrets && getOnlySecrets(env?.secrets);
  }, [env]);

  useEffect(() => {
    window.addEventListener("paste", handlePaste);
  });

  function handleEnvInputChange(e: any, id: any, type: "name" | "value") {
    const inpValue = e.target.value;
    let updatedSecrets: { id: any; name: string; value: string }[];

    if (id === null) {
      const newId = Math.floor(Math.random() * 10e3);
      const _env = env?.secrets ?? [];
      updatedSecrets = [
        ..._env,
        {
          id: newId,
          name: type === "name" ? inpValue : "",
          value: type === "value" ? inpValue : "",
        },
      ];
    } else {
      updatedSecrets = env.secrets.map((secret) => {
        if (secret.id === id) {
          return {
            ...secret,
            [type]: inpValue,
          };
        }
        return secret;
      });
    }

    setFocusInput(type);
    setEnv((prevEnv) => ({
      ...prevEnv,
      secrets: updatedSecrets,
    }));
  }

  function addNewSecret() {
    const id = Math.floor(Math.random() * 10e3),
      _id = Math.floor(Math.random() * 10e3);
    const _name = env?.name;
    const prev = env?.secrets ?? [];
    const _prevVal =
      prev.length > 0 ? prev : [{ id: _id, name: "", value: "" }];
    const combEnv = [..._prevVal, { id, name: "", value: "" }];
    setEnv({
      name: _name,
      id,
      secrets: combEnv,
    });
  }

  function removeEnv(id: any) {
    const _env = env?.secrets.filter((s) => s.id !== id);
    if (_env) {
      setEnv({
        name: env.name,
        id: env.id,
        secrets: _env,
      });
    }
  }

  function checkIfSecretChanged() {
    const _prevEnv = selectedEnv?.secrets ?? [];
    const _env = env?.secrets;

    if (_prevEnv?.length !== _env?.length) {
      return true;
    }

    for (let i = 0; i < _env?.length; i++) {
      if (
        _env[i]?.name !== _prevEnv[i]?.name ||
        _env[i]?.value !== _prevEnv[i]?.value
      ) {
        return true;
      }
    }

    return false;
  }

  function handlePaste(e: any) {
    const paste = e.clipboardData.getData("text").trim();
    const parsedEnv = parseEnvString(paste);
    const parsedData = [] as any[];
    Object.entries(parsedEnv).forEach((d) => {
      const [key, value] = d;
      const id = Math.floor(Math.random() * 10e3);
      parsedData.push({
        id,
        name: key,
        value: value ?? "",
      });
    });
    const prevEnv = env.secrets;
    if (!prevEnv) return;
    const comb = [...prevEnv, ...parsedData];
    setEnv({
      name: env.name,
      id: env.id,
      secrets: comb,
    });
  }

  function saveSecret() {
    console.log(env);
  }

  return (
    <FlexColStart
      className={cn("w-full h-auto gap-2", btmSpace ? "pb-[4em]" : "")}
    >
      {env?.secrets?.length > 0 ? (
        env?.secrets?.map((d, i) => (
          <FlexRowCenter key={i} className="gap-2">
            <Input
              name="variable"
              placeholder="Variable name"
              className="bg-dark-200 placeholder:text-gray-100 text-white-200 font-jbSB border-solid border-[.5px] border-white-600 py-6 px-5"
              value={d.name}
              onChange={(e: any) => handleEnvInputChange(e, d.id, "name")}
              autoFocus={focusInput === "name" && true}
              // onPaste={handlePaste}
            />
            <span className="text-white-200 font-ppB text-[13px]">=</span>
            <Input
              name="variable"
              placeholder="Enter value"
              className="bg-dark-200 placeholder:text-gray-100 text-white-200 font-jbSB border-solid border-[.5px] border-white-600 py-6 px-5 "
              value={d.value}
              onChange={(e: any) => handleEnvInputChange(e, d.id, "value")}
              autoFocus={focusInput === "value" && true}
            />
            <button className={"text-red-305"} onClick={() => removeEnv(d.id)}>
              <X size={15} />
            </button>
          </FlexRowCenter>
        ))
      ) : (
        <FlexRowCenter className="gap-2">
          <Input
            name="variable"
            placeholder="Variable name"
            className="bg-dark-200 placeholder:text-gray-100 text-white-200 font-jbSB border-solid border-[.5px] border-white-600 py-6 px-5 "
            defaultValue={""}
            onChange={(e: any) => handleEnvInputChange(e, null, "name")}
            onPaste={handlePaste}
          />
          <span className="text-white-200 font-ppB text-[13px]">=</span>
          <Input
            name="variable"
            placeholder="Enter value"
            className="bg-dark-200 placeholder:text-gray-100 text-white-200 font-jbSB border-solid border-[.5px] border-white-600 py-6 px-5 "
            defaultValue={""}
            onChange={(e: any) => handleEnvInputChange(e, null, "name")}
          />
        </FlexRowCenter>
      )}
      <button
        className="text-white-200 text-[13px] font-ppR"
        onClick={addNewSecret}
      >
        Add Variable
      </button>

      {/* Save Secret */}
      {!hideSaveBtn && (
        <Button
          className="font-ppL text-[12px] mt-2 "
          variant={"appeal"}
          disabled={!checkIfSecretChanged()}
          onClick={saveSecret}
        >
          <span className="font-ppR">Save Changes</span>
        </Button>
      )}
    </FlexColStart>
  );
}

export default ManageSecrets;
