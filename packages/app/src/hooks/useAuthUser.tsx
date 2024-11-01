import { DataContext } from "@/context/DataContext";
import { getUser } from "@/lib/http/requests";
import { ResponseData, UserInfo } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";

// hook meant to fetch auth user info
export default function useAuthUser(shouldFetchOnMount: boolean = false) {
  const { userInfo, setUserInfo } = useContext(DataContext);
  const userInfoMutation = useMutation({
    mutationFn: () => getUser(),
  });

  React.useEffect(() => {
    if (shouldFetchOnMount) {
      if (!userInfo) {
        userInfoMutation.mutate();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo, shouldFetchOnMount]);

  React.useEffect(() => {
    if (userInfoMutation?.error) {
      const data = (userInfoMutation?.error as any)?.response
        ?.data as ResponseData;
      const code = data?.code;
      if (code === "UNAUTHORIZED") {
        toast.error("Unauthorized");
        signOut();
      }
    }
    if (!userInfoMutation?.data?.errorStatus) {
      // fetch user info if none exists and user is logged in
      const reqData = userInfoMutation.data?.data as UserInfo;
      setUserInfo(reqData);
    } else {
      setUserInfo(null as any);
      toast.error(
        userInfoMutation.data?.data?.message ?? "Something went wrong"
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    userInfoMutation.isPending,
    userInfoMutation.data,
    userInfoMutation.error,
    setUserInfo,
  ]);

  return {
    loading: userInfoMutation.isPending,
    error: userInfoMutation.error,
    refetch: userInfoMutation.mutate,
    data: userInfo,
  };
}
