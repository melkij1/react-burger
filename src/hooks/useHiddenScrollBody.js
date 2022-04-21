import { useEffect } from "react";

export const useHiddenScrollBody = show => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
    }
    return () => (document.body.style.overflow = "unset");
  }, [show]);
};
