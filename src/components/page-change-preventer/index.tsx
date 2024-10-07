import { useCallback, useEffect } from "react";

export default function PageChangePreventer() {
  //prompt user on page reload on unsaved data
  const pageReloadHandler = useCallback((event: any) => {
    event.preventDefault();
    event.returnValue = "Don't leave";
    return "Don't leave";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", pageReloadHandler);
    return () => {
      window.removeEventListener("beforeunload", pageReloadHandler);
    };
  }, []);
}
