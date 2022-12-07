import * as React from "react";
import { useState } from "react";
import { useChromeStorageSync } from 'use-chrome-storage';
import { colorArray } from "../constants/colors";
import { FolderConfig, PageConfig } from "../types/common";
import "./FolderAddModal.css";
import { v4 as uuid } from 'uuid';

interface Props {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const FolderAddModal = (props: Props) => {
  const { isOpen, modalRef, onClose } = props;
  const [allPages, setAllPages] = useChromeStorageSync('all',[]) as unknown as [(PageConfig|FolderConfig)[], (data: (PageConfig|FolderConfig)[]) => void];
  const [name, setName] = useState('');
  const [color, setColor] = useState("#D1D1D1");

  const add = () => {

    const newFolder: FolderConfig = {
      id: uuid(),
      name,
      color,
      type: 'folder',
      children: [],
      sortIndex: allPages.reduce((acc, page) => {
        if (page.sortIndex > acc) {
          return page.sortIndex;
        }
        return acc;
      }
      , 0) + 1,
    }
    const newAllPages = [...allPages, newFolder]

    setAllPages(newAllPages);
    onClose();
  };

  return (
    <div
      className="folder-add-container"
      style={{
        display: isOpen ? "flex" : "none",
      }}
    >
      <div ref={modalRef} className="modal-container">
        <div className="inner-modal-container">
          <label className="label-name">
            <span>폴더명</span>
            <input
              className="input-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </label>
          <div className="color-container">
            <div className="title-color">
              <label className="label-color">색상</label>
              <div
                className="box-selected-color"
                style={{
                  backgroundColor: color,
                }}
              />
            </div>
            <div className="grid-color">
              {colorArray.map((color, key) => (
                <div
                  key={key}
                  className="box-color"
                  style={{
                    backgroundColor: color,
                  }}
                  onClick={() => {
                    setColor(color);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        <button
          onClick={() => {
            add();
          }}
          className={
            name === ''
            ? 'btn-save-disabled'
            : 'btn-save'
          }
          disabled={name === ''}
        >
          추가
        </button>
      </div>
    </div>
  );
};

export default FolderAddModal;
