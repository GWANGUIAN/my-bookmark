import * as React from "react";
import { useState } from "react";
import { useChromeStorageSync } from 'use-chrome-storage';
import { FolderConfig, PageConfig } from "../types/common";
import "./PageAddModal.css";
import { v4 as uuid } from 'uuid';

interface Props {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const PageAddModal = (props: Props) => {
  const { isOpen, modalRef, onClose } = props;
  const [allPages, setAllPages] = useChromeStorageSync('all',[]) as unknown as [(PageConfig|FolderConfig)[], (data: (PageConfig|FolderConfig)[]) => void];
  const [name, setName] = useState('');
  const [url, setUrl] = useState('');
  const [icon, setIcon] = useState('');

  const add = () => {

    const newPage: PageConfig = {
      id: uuid(),
      name,
      url,
      type: 'page',
      sortIndex: allPages.reduce((acc, page) => {
        if (page.sortIndex > acc) {
          return page.sortIndex;
        }
        return acc;
      }
      , 0) + 1,
    }
    const newAllPages = [...allPages, newPage]

    setAllPages(newAllPages);
    onClose();
  };

  return (
    <div
      className="page-add-container"
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
          onClick={() => {
            add();
          }}
          disabled={name === '' || url === ''}
          className={
            name === '' || url === ''
            ? 'btn-save-disabled'
            : 'btn-save'
          }
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default PageAddModal;
