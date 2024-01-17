import React from "react";

function usePageLoaded(timeout = 1000) {
  const [pageLoaded, setPageLoaded] = React.useState(false);

  React.useEffect(() => {
    // timeout
    setTimeout(() => {
      setPageLoaded(true);
    }, timeout);
  }, []);

  return pageLoaded;
}

export default usePageLoaded;
