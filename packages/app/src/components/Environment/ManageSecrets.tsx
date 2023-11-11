import React, { useContext, useEffect, useState } from "react";
import { FlexColStart, FlexRowCenter, FlexRowStartCenter } from "../Flex";
import { Input } from "../ui/input";
import { X } from "lucide-react";
import { Button } from "../ui/button";
import { cn, parseEnvString } from "@/lib/utils";
import { SecretDataTypes, Secrets } from "@veloz/shared/types";
import { ProjectContext } from "@/context/ProjectContext";
import { Spinner } from "../Spinner";
import { useMutation } from "@tanstack/react-query";
import { deleteSecret, updateSecret } from "@/lib/http/requests";
import { ResponseData } from "@/types";
import toast from "react-hot-toast";

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
  refetchSecrets?: () => void;
  showDeleteBtn?: boolean;
}

function ManageSecrets({
  selectedEnv,
  hideSaveBtn,
  getUpdatedSecrets,
  getOnlySecrets,
  btmSpace,
  refetchSecrets,
  showDeleteBtn,
}: ManageSecretsProps) {
  const {} = useContext(ProjectContext);
  const [env, setEnv] = useState<SecretDataTypes>({} as SecretDataTypes);
  const [focusInput, setFocusInput] = useState<"name" | "value">("name");
  const [newEnv, setNewEnv] = useState<Secrets[]>([]);
  const [deletedEnv, setDeletedEnv] = useState<Secrets[]>([]);
  const [envDetails, setEnvDetails] = useState({
    name: "",
    value: "",
  });
  const deleteSecretMutation = useMutation({
    mutationFn: async (data: string) => await deleteSecret(data),
  });
  const updateSecretMutation = useMutation({
    mutationFn: async (data: any) => await updateSecret(data),
  });

  //
  let _env_name = "";
  let _env_value = "";

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
    // ! work on this later
    // window.addEventListener("paste", handlePaste);
  });

  // delete secret
  useEffect(() => {
    if (deleteSecretMutation.error) {
      const data = (deleteSecretMutation.error as any)?.response
        ?.data as ResponseData;
      toast.error(data?.message as string);
    }
    if (deleteSecretMutation.data) {
      const data = deleteSecretMutation.data as ResponseData;
      toast.success(data?.message as string);
      refetchSecrets && refetchSecrets();
    }
  }, [
    deleteSecretMutation.data,
    deleteSecretMutation.isPending,
    deleteSecretMutation.error,
  ]);

  // update secret
  useEffect(() => {
    if (updateSecretMutation.error) {
      const data = (updateSecretMutation.error as any)?.response
        ?.data as ResponseData;
      toast.error((data?.message as string) ?? "Something went wrong.");
    }
    if (updateSecretMutation.data) {
      const data = updateSecretMutation.data as ResponseData;
      toast.success(data?.message as string);
      refetchSecrets && refetchSecrets();

      // clear newEnv and deletedEnv
      setNewEnv([]);
      setDeletedEnv([]);
    }
  }, [
    updateSecretMutation.data,
    updateSecretMutation.isPending,
    updateSecretMutation.error,
  ]);

  function handleEnvInputChange(e: any, id: any, type: "name" | "value") {
    const inpValue = e.target.value;
    let updatedSecrets: { id: any; name: string; value: string }[];

    setEnvDetails({
      ...envDetails,
      [type]: inpValue,
    });

    if (id === null) {
      const newId = Math.floor(Math.random() * 10e3);
      const _env = env?.secrets ?? [];
      updatedSecrets = [
        ..._env,
        {
          id: newId,
          ...envDetails,
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

    const _newEnv = newEnv?.find((e) => e.id === id);
    if (_newEnv) {
      const _prev = newEnv?.filter((e) => e.id !== id);
      setNewEnv([
        ..._prev,
        {
          id: _newEnv.id,
          ...envDetails,
        },
      ]);
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
    //* add new env to newEnv state (used to track new envs created)
    setNewEnv((prev) => [...prev, { id, name: "", value: "" }]);
  }

  function removeEnv(id: any) {
    const _env = env?.secrets.filter((s) => s.id !== id);
    const _deletedEnv = env?.secrets.filter((s) => s.id === id);
    if (_env) {
      setEnv({
        name: env.name,
        id: env.id,
        secrets: _env,
      });
      setDeletedEnv((prev) => [...prev, ..._deletedEnv]);
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

  // ! work on this later
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

  function removeEnvDuplicates(env: Secrets[]) {
    // remove env duplicates
    const _env: Secrets[] = [];
    env.forEach((e) => {
      const _e = _env.find((d) => d.name === e.name);
      if (!_e) {
        _env.push(e);
      }
    });
    return _env;
  }

  function saveSecret() {
    // const { id } = env;
    const updatedSecrets: any[] = [];
    const newlyAddedSecrets: any[] = newEnv;
    const deletedSecrets = deletedEnv;

    type Payload = {
      id: string;
      deleteEnv?: Secrets[];
      updateEnv?: Secrets[];
      createEnv?: Secrets[];
    };

    for (const s of env.secrets) {
      const selectedSecret = selectedEnv?.secrets.find(
        (sec) => sec.id === s.id
      );
      if (
        s.name !== selectedSecret?.name ||
        s.value !== selectedSecret?.value
      ) {
        const _newlyAddedSec = newlyAddedSecrets.find((sec) => sec.id === s.id);
        console.log({ _newlyAddedSec });
        const _deletedSec = deletedSecrets.find((sec) => sec.id === s.id);
        if (_deletedSec) {
          const _sec = deletedSecrets.find((sec) => sec?.id !== s?.id);
          if (_sec) deletedSecrets.push(_sec);
        } else if (_newlyAddedSec) {
          const _sec = updatedSecrets.find((sec) => sec?.id !== s?.id);
          if (_sec) {
            // make sure deleted secrets isn't included
            const _delsec = deletedSecrets.find((sec) => sec?.id === s?.id);
            if (_delsec) {
              const _withoutDeleted = deletedSecrets.filter(
                (sec) => sec?.id !== s?.id
              );
              updatedSecrets.push(_withoutDeleted);
            } else {
              updatedSecrets.push(_sec);
            }
          }
        } else {
          // make sure deleted secrets isn't included
          const _delsec = deletedSecrets.find((sec) => sec?.id === s?.id);
          if (_delsec) {
            const _withoutDeleted = deletedSecrets.filter(
              (sec) => sec?.id !== s?.id
            );
            updatedSecrets.push(_withoutDeleted);
          } else {
            updatedSecrets.push(s);
          }
        }
      }
    }

    const payload: Payload = {
      id: selectedEnv?.id,
    };

    if (deletedSecrets?.length > 0) {
      payload["deleteEnv"] = removeEnvDuplicates(deletedSecrets);
    }
    if (newlyAddedSecrets?.length > 0) {
      payload["createEnv"] = removeEnvDuplicates(newlyAddedSecrets);
    }
    if (updatedSecrets?.length > 0) {
      payload["updateEnv"] = removeEnvDuplicates(updatedSecrets);
    }

    updateSecretMutation.mutate(payload);
  }

  const deleteEnv = () => deleteSecretMutation.mutate(selectedEnv?.id);

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
      <FlexRowStartCenter className="w-full mt-2">
        {!hideSaveBtn && (
          <Button
            className="font-ppL text-[12px]"
            variant={"appeal"}
            disabled={!checkIfSecretChanged()}
            onClick={saveSecret}
          >
            {updateSecretMutation.isPending ? (
              <Spinner size={18} color="#fff" />
            ) : (
              <span className="font-ppR">Save Changes</span>
            )}
          </Button>
        )}
        {showDeleteBtn && (
          <Button
            className="font-ppR text-[12px]"
            variant={"destructive"}
            onClick={deleteEnv}
            disabled={deleteSecretMutation.isPending}
          >
            {!deleteSecretMutation.isPending ? (
              <span className="font-ppR">Delete Secret</span>
            ) : (
              <Spinner color="#fff" size={18} />
            )}
          </Button>
        )}
      </FlexRowStartCenter>
    </FlexColStart>
  );
}

export default ManageSecrets;
