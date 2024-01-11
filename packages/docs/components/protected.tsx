import React from "react";

type Props = {
  children: React.ReactNode;
};

function Protected({ children }: Props) {
  return (
    <div style={{ position: "relative" }}>
      {children}
      <div
        // style={{
        //   width: "100%",
        //   height: "100%",
        //   position: "absolute",
        //   top: 0,
        //   background: "black",
        //   zIndex: 100,
        // }}
        className="bg-red-200 w-full h-full absolute top-0"
      ></div>
    </div>
  );
}

export default Protected;
