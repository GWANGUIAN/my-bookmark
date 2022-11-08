import "./Folder.css";
import * as React from "react";
import { FolderConfig } from '../types/common';

const Folder = (props: FolderConfig) => {
  const { name, color } = props;
  return (
    <div className='folder-container'></div>
  );
}

export default Folder