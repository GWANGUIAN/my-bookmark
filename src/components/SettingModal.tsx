import * as React from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import IconImport from "../icons/IconImport";
import ImportBookmarkModal from "./ImportBookmarkModal";
import "./SettingModal.css";

interface Props {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  importButtonRef: React.RefObject<HTMLButtonElement>;  
  onOpenImportModal: () => void;
}

const SettingModal = (props: Props) => {
  const { isOpen, modalRef, importButtonRef, onOpenImportModal } = props;
  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <div
        ref={modalRef}
        className="setting-container"
        style={{
          display: isOpen ? "flex" : "none",
        }}
      >
        <button
          className="btn-import"
          ref={importButtonRef}
          onClick={() => {
            onOpenImportModal();
          }}
          onMouseEnter={() => {
            setIsHover(true);
          }}
          onMouseLeave={() => {
            setIsHover(false);
          }}
        >
          <IconImport fill={isHover ? "#ffffff" : undefined} />
          <span>북마크 가져오기</span>
        </button>
      </div>
    </>
  );
};

export default SettingModal;
