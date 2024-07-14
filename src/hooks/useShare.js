import { useCallback } from "react";

const useShare = () => {
  const shareContent = useCallback(async (title, text, url) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text,
          url,
        });
        console.log("Content shared successfully");
      } catch (error) {
        console.error("Error sharing content:", error);
      }
    } else {
      alert("Web Share API is not supported in your browser.");
    }
  }, []);

  return shareContent;
};

export default useShare;
