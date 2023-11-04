"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth, useUser } from "@clerk/nextjs";

export const withAuth = <P extends { children: React.ReactNode }>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { isLoaded, userId } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (isLoaded) {
        const isLoggedIn = !userId;
        // Avoid infinite redirection loop
        if (isLoggedIn && router.pathname !== "/auth") {
          router.push("/auth");
        }
      }
    }, [isLoaded, userId, user, router]);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};

export const withoutAuth = <P extends { children: React.ReactNode }>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper: React.FC<P> = (props) => {
    const { isLoaded, userId } = useAuth();
    const { user } = useUser();
    const router = useRouter();

    useEffect(() => {
      if (isLoaded) {
        const isLoggedIn = userId;

        // Avoid infinite redirection loop
        if (isLoggedIn) {
          router.push("/dashboard");
        }
      }
    }, [isLoaded, userId, user, router]);

    const wrappedComponent = React.createElement(WrappedComponent, props);
    return wrappedComponent;
  };

  return Wrapper;
};
