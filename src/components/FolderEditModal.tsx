import * as React from "react";
import { useRef, useState } from "react";
import { useChromeStorageSync } from 'use-chrome-storage';
import { colorArray } from "../constants/colors";
import { FolderConfig, PageConfig } from "../types/common";
import "./FolderEditModal.css";

interface Props extends FolderConfig {
  isOpen: boolean;
  modalRef: React.RefObject<HTMLDivElement>;
  onClose: () => void;
}

const FolderEditModal = (props: Props) => {
  const { isOpen, modalRef, onClose } = props;
  const [allPages, setAllPages] = useChromeStorageSync('all',[]) as unknown as [(PageConfig|FolderConfig)[], (data: (PageConfig|FolderConfig)[]) => void];
  const [name, setName] = useState(props.name);
  const [color, setColor] = useState(props.color || "#D1D1D1");

  const save = () => {
    const newAllPages = allPages.map((page) => {
      if (page.id === props.id) {
        return {
          ...page,
          name,
          color,
        };
      }
      return page;
    });

    setAllPages(newAllPages);
    onClose();
  };

  return (
    <div
      className="folder-edit-container"
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
            save();
          }}
          disabled={name === props.name && (color === props.color || (!props.color && color === "#D1D1D1"))}
          className={
            name === props.name && (color === props.color || (!props.color && color === "#D1D1D1"))
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

export default FolderEditModal;
