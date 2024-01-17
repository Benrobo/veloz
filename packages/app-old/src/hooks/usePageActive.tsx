import React, { useCallback, useEffect } from "react";

type Props = {
  fn: () => void;
  log?: boolean;
};

async function usePageActive({ fn, log }: Props) {
  const [visibilityState, setVisibilityState] = React.useState(
    document.visibilityState
  );

  // use useCallback to memoize the function
  const handleVisibilityChange = useCallback(() => {
    if (document.visibilityState === "visible") {
      log && console.log("page visible");
      setVisibilityState(document.visibilityState);
      fn();
    }
    if (document.visibilityState === "hidden") {
      log && console.log("page hidden");
      setVisibilityState(document.visibilityState);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return visibilityState;
}

export default usePageActive;
