import React from "react";

type Props = {
  children: React.ReactNode;
};

function RootLayout({ children }: Props) {
  return <>{children}</>;
}

export default RootLayout;
