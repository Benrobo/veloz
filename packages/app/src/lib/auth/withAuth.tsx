import { FullPageLoader } from "@/components/Loader";
import { DataContext } from "@/context/DataContext";
import useAuthUser from "@/hooks/useAuthUser";
import { useSession } from "next-auth/react";
import React, { useCallback, useContext, useEffect } from "react";

export default function withAuth<P>(Component: React.ComponentType<P>) {
  const ComponentWithAuth = (props: P & any) => {
    const { setUserInfo, setPurchasedTemplates, userInfo } =
      useContext(DataContext);
    const { data, loading, error, refetch } = useAuthUser(false);
    const { status } = useSession();

    useEffect(() => {
      if (status !== "loading") {
        // Avoid infinite redirection loop
        const pathname = window.location.pathname;
        if (status === "unauthenticated" && pathname !== "/auth")
          window.location.href = "/auth";
        if (status === "authenticated" && !userInfo) refetch();
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [status]);

    useEffect(() => {
      if (status === "authenticated") {
        if (data) {
          setUserInfo(data);
          setPurchasedTemplates(data?.purchased_items);
        }
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loading, data, status]);

    if (status === "loading" || loading) return <FullPageLoader />;
    if (status === "unauthenticated") {
      window.location.href = "/auth";
    }

    return <Component {...props} />;
  };

  return ComponentWithAuth;
}
