import "./Folder.css";
import * as React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { FolderConfig } from '../types/common';
import IconEdit from '../icons/IconEdit';

const Folder = (props: FolderConfig) => {
  const { name, color, sortIndex } = props;
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
    boxShadow: isDragging ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' : 'none',
  };

  return (
    <div
      className='folder-container'
      style={
        color ? (
          { 
            ...style,
            background: color,
            border: `1px solid ${color}`
          }
        ) : (
          style
        )
      }
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div className='folder-header'>
        <button>
          <IconEdit color={'#ffffff'}/>
        </button>
      </div>
      <div
        className='folder-name'
        style={{
          color: color ? '#ffffff' : '#686868'
        }}
      >
        {name}
      </div>
    </div>
  );
}

export default Folder