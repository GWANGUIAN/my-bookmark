import * as React from "react";
import { useState } from "react";
import { PageConfig } from "../types/common";
import { getFaviconFromUrl } from "../utils/common";
import "./PageEditModal.css";

interface Props extends PageConfig {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const PageEditModal = (props: Props) => {
  const { isOpen, modalRef, onClose } = props;
  const [name, setName] = useState(props.name);
  const [url, setUrl] = useState(props.url);
  const [icon, setIcon] = useState(props.icon || getFaviconFromUrl(url));

  return (
    <div
      className="page-edit-container"
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div ref={modalRef} className="modal-container">
        <div className="inner-modal-container">
          <label className='box-name'>
            <span>이름</span>
            <input 
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <label className='box-url'>
            <span>URL</span>
            <input
              type='text'
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </label>
          {/* <label>아이콘</label>
          <div></div> */}
        </div>
        <button
          className={
            name === props.name && url === props.url
            ? 'btn-save-disabled'
            : 'btn-save'
          }
        >
          저장
        </button>
      </div>
    </div>
  );
};

export default PageEditModal;
