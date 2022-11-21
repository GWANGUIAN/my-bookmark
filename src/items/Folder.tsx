import "./Folder.css";
import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FolderConfig } from "../types/common";
import IconEdit from "../icons/IconEdit";
import { useCallback, useRef, useState, useEffect } from "react";
import FolderEditModal from "../components/FolderEditModal";

const Folder = (props: FolderConfig) => {
  const { name, color, sortIndex } = props;
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: sortIndex });
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const editModalRef = useRef<HTMLDivElement>(null);
  const editButtonRef = useRef<HTMLButtonElement>(null);

  const style = {
    transform: isDragging
      ? `${CSS.Transform.toString(transform)} scale(1.05)`
      : CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 0,
  };

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (
        !editModalRef.current!.contains(target as Node) &&
        !editButtonRef.current!.contains(target as Node)
      ) {
        setIsEditModalOpen(false);
      }
    },
    [setIsEditModalOpen]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <>
      <FolderEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        modalRef={editModalRef}
        {...props}
      />
      <div
        className="folder-container"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
      >
        <div
          className="folder-inner-container"
          style={
            color
              ? {
                  background: color,
                  border: `1px solid ${color}`,
                }
              : {}
          }
        >
          <div className="folder-header">
            <button
              onClick={() => {
                setIsEditModalOpen(true);
              }}
              ref={editButtonRef}
            >
              <IconEdit color={"#ffffff"} />
            </button>
          </div>
          <div
            className="folder-name"
            style={{
              color: color ? "#ffffff" : "#686868",
            }}
          >
            {name}
          </div>
        </div>
        <div
          className="folder-polygon"
          style={
            color
              ? {
                  background: color,
                  border: `1px solid ${color}`,
                  boxShadow: isDragging
                    ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                    : "0px 0px 0px 0px",
                }
              : {
                  boxShadow: isDragging
                    ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
                    : "0px 0px 0px 0px",
                }
          }
        />

        <div
          className="box-shadow"
          style={{
            boxShadow: isDragging
              ? "rgba(0, 0, 0, 0.35) 0px 5px 15px"
              : "0px 0px 0px 0px",
          }}
        />
      </div>
    </>
  );
};

export default Folder;