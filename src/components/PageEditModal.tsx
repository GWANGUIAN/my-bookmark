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
    <div className="page-edit-container">
      <div ref={modalRef} className="modal-container">
        <div>
          <label className='label-name'>이름</label>
          <input className='input-name' type='text' value={name}/>
          <label className='label-url'>URL</label>
          <input className='input-url' type='text' value={url}/>
          <label>아이콘</label>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default PageEditModal;
