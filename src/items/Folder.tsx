import "./Folder.css";
import * as React from "react";
import { FolderConfig } from '../types/common';
import IconEdit from '../icons/IconEdit';

const Folder = (props: FolderConfig) => {
  const { name, color } = props;
  return (
    <div
      className='folder-container'
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
  );
}

export default Folder