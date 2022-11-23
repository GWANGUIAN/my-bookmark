import "./Page.css";
import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageConfig } from "../types/common";
import IconEdit from "../icons/IconEdit";
import { getFaviconFromUrl } from "../utils/common";
import { useCallback, useEffect, useRef, useState } from "react";
import PageEditModal from "../components/PageEditModal";

const Folder = (props: PageConfig) => {
  const { name, url, icon, sortIndex } = props;

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
      <PageEditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        modalRef={editModalRef}
        {...props}
      />
      <div
        className="page-container"
        style={style}
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        onClick={()=>{
          window.location.href = url;
        }}
      >
        <div className="page-header">
          <button
            onClick={(e) => {
              setIsEditModalOpen(true);
              e.stopPropagation();
            }}
            ref={editButtonRef}
          >
            <IconEdit />
          </button>
        </div>
        <img className="page-icon" src={icon || getFaviconFromUrl(url)} />
        <div className="page-name">{name}</div>
        <div className="page-url">{url}</div>
        <div
          className="box-shadow"
          style={{
            boxShadow: isDragging ? "rgba(0, 0, 0, 0.35) 0px 5px 15px" : "none",
          }}
        />
      </div>
    </>
  );
};

export default Folder;
