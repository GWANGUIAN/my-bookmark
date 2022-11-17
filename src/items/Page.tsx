import "./Page.css"
import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { PageConfig } from '../types/common';
import IconEdit from '../icons/IconEdit';
import { getFaviconFromUrl } from '../utils/common';

const Folder = (props: PageConfig) => {
  const { name, url, icon, sortIndex } = props;

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({id: sortIndex});

  const style = {
    transform: isDragging
      ? `${CSS.Transform.toString(transform)} scale(1.05)` 
      : CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging
    ? 10 
    : 0,
  };

  return (
    <div
      className='page-container'
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className='page-header'>
        <button>
          <IconEdit/>
        </button>
      </div>
      <img className='page-icon' src={icon || getFaviconFromUrl(url)}/>
      <div className='page-name'>
        {name}
      </div>
      <div className='page-url'>
        {url}
      </div>
      <div
        className='box-shadow'
        style={{
          boxShadow: isDragging 
            ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' 
            : 'none' 
        }}
      />
    </div>
  );
}

export default Folder