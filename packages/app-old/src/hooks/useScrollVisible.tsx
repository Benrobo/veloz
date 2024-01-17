import React from "react";

function useScrollVisible() {
  const [scrollVisible, setScrollVisible] = React.useState(false);

  // effect to check
  React.useEffect(() => {
    const scrollHeight = document.body.scrollHeight;
    const clientHeight = document.body.clientHeight;
    const scrollVisible = scrollHeight > clientHeight;
    setScrollVisible(scrollVisible);
  }, []);

  return scrollVisible;
}

export default useScrollVisible;
