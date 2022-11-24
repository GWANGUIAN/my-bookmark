import * as React from "react";
import { useEffect, useState } from "react";
import "./ImportBookmarkModal.css";

interface Props {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
}

const ImportBookmarkModal = (props: Props) => {
  const { isOpen, modalRef } = props;
  const [bookmark, setBookmark] = useState<chrome.bookmarks.BookmarkTreeNode[]>(
    []
  );

  useEffect(() => {
    chrome.bookmarks.getTree(
      (results) => {
        setBookmark(results);
      }
    )
  }, []);

  return (
    <div
      className="import-modal-container"
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div
        className="modal-container"
        ref={modalRef}
      >
        {JSON.stringify(bookmark)}
      </div>
    </div>
  );
};

export default ImportBookmarkModal;
