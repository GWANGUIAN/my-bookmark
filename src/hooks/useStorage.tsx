import { useEffect, useState } from "react";
import { FolderConfig, PageConfig } from "../types/common";

const useStorage = (key: "all" | "frequent") => {
  const [data, setData] = useState<(PageConfig | FolderConfig)[] | null>(
    null
  );

  const setStorage = (data: (PageConfig | FolderConfig)[]) => {
    if (key === "all") {
      chrome.storage.sync.set({ all: data });
    } else {
      chrome.storage.sync.set({ frequent: data });
    }
  };

  const getStorage = () => {
    if (key === "all") {
      chrome.storage.sync.get(["all"], function (result) {
        setData(result as (PageConfig | FolderConfig)[]);
      });
    } else {
      chrome.storage.sync.get(["frequent"], function (result) {
        setData(result as PageConfig[]);
      });
    }
  };

  useEffect(() => {
    chrome.storage.onChanged.addListener(getStorage);

    return () => {
      chrome.storage.onChanged.removeListener(getStorage);
    };
  }, []);

  return { storage: data, setStorage };
};

export default useStorage;
