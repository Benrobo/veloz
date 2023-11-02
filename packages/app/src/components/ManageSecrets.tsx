import React, { useEffect, useState } from "react";
import { FlexColStart, FlexRowCenter } from "./Flex";
import { Input } from "./ui/input";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface ManageSecretsProps {
  selectedEnv: {
    name: string;
    id: string | any;
    secrets: {
      id: string | any;
      name: string;
      value: string;
    }[];
  };
}

type SecretDataTypes = {
  name: string;
  id: string | any;
  secrets: {
    id: string | any;
    name: string;
    value: string;
  }[];
};

function ManageSecrets({ selectedEnv }: ManageSecretsProps) {
  const [env, setEnv] = useState<SecretDataTypes>({} as SecretDataTypes);
  const [focusInput, setFocusInput] = useState<"name" | "value">("name");

  useEffect(() => {
    // set env
    setEnv(selectedEnv);
  }, [selectedEnv]);

  useEffect(() => {
    // setEnv(selectedEnv);
    console.log("Selected", selectedEnv);
    console.log("UPDATED", env);
  }, [env]);

  function handleEnvInputChange(e: any, id: any, type: "name" | "value") {
    const inpValue = e.target.value;
    const _name = selectedEnv.name;
    let updatedSecrets: { id: any; name: string; value: string }[];

    if (id === null) {
      const newId = Math.floor(Math.random() * 10e3);
      updatedSecrets = [
        ...env.secrets,
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
    const id = Math.floor(Math.random() * 10e3);
    const _name = selectedEnv.name;
    setEnv((prev) => {
      console.log({ prev });
      return {
        name: _name,
        id,
        secrets: [...prev.secrets, { id: id, name: "", value: "" }],
      };
    });
  }

  function removeEnv(id: any) {
    const _env = env.secrets.filter((s) => s.id !== id);
    if (_env) {
      setEnv({
        name: env.name,
        id: selectedEnv.id,
        secrets: _env,
      });
    }
  }

  function checkIfSecretChanged() {
    const _prevEnv = selectedEnv.secrets;
    const _env = env.secrets;

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

  function saveSecret() {
    console.log(env);
  }

  return (
    <FlexColStart className="w-full h-screen pb-[4em] gap-2">
      {env.secrets?.length > 0 ? (
        env.secrets?.map((d, i) => (
          <FlexRowCenter key={i} className="gap-2">
            <Input
              name="variable"
              placeholder="Variable name"
              className="bg-dark-200 placeholder:text-gray-100 text-white-200 font-jbSB border-solid border-[.5px] border-white-600 py-6 px-5"
              defaultValue={d.name}
              onChange={(e: any) => handleEnvInputChange(e, d.id, "name")}
              autoFocus={focusInput === "name" && true}
            />
            <span className="text-white-200 font-ppB text-[13px]">=</span>
            <Input
              name="variable"
              placeholder="Enter value"
              className="bg-dark-200 placeholder:text-gray-100 text-white-200 font-jbSB border-solid border-[.5px] border-white-600 py-6 px-5 "
              defaultValue={d.value}
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
      <Button
        className="font-ppL text-[12px] mt-2 "
        variant={"appeal"}
        disabled={checkIfSecretChanged()}
        onClick={saveSecret}
      >
        <span className="font-ppR">Save Changes</span>
      </Button>
    </FlexColStart>
  );
}

export default ManageSecrets;
