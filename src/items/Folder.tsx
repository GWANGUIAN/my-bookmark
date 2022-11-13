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
    zIndex: isDragging
    ? 10 
    : 0,
  };

  return (
    <div
      className='folder-container'
      style={style}
      ref={setNodeRef}
      {...attributes}
      {...listeners}
    >
      <div
        className='folder-inner-container'
        style={
          color ? (
            { 
              background: color,
              border: `1px solid ${color}`
            }
          ) : (
            {}
          )
        }
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
      <div
        className='folder-polygon'
        style={
          color 
          ? {
            background: color,
            border: `1px solid ${color}`,
            boxShadow: isDragging 
            ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' 
            : '0px 0px 0px 0px' 
          }
          : {
            boxShadow: isDragging 
            ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' 
            : '0px 0px 0px 0px' 
          }
        }
      />

      <div
        className='box-shadow'
        style={{
          boxShadow: isDragging 
            ? 'rgba(0, 0, 0, 0.35) 0px 5px 15px' 
            : '0px 0px 0px 0px' 
        }}
      />
    </div>
  );
}

export default Folder