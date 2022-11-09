import "./Page.css"
import * as React from "react";
import { PageConfig } from '../types/common';
import IconEdit from '../icons/IconEdit';

const Folder = (props: PageConfig) => {
  const { name, url, icon } = props;
  return (
    <div className='page-container'>
      <div className='page-header'>
        <button>
          <IconEdit/>
        </button>
      </div>
      <img src={icon}/>
      <div className='page-name'>
        {name}
      </div>
      <div className='page-url'>
        {url}
      </div>
    </div>
  );
}

export default Folder