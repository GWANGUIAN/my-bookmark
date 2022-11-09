import * as React from "react";
import "./reset.css";
import "./App.css";
import IconSetting from './icons/IconSetting';
import { allPages, frequentPages } from './mocks';
import Page from './items/Page';
import Folder from './items/Folder';

const App = () => {
  return (
    <div className="container">
      <div className='inner-container'>
        <header>
          <button><IconSetting /></button>
        </header>
        <h2>자주 찾는 페이지</h2>
        <div className='content-grid'>
          {frequentPages.map((page, id) => (
            <Page key={id} {...page}/>
          ))}
        </div>
        <div className='all-page-header'>
          <h2>전체 페이지</h2>
          <div className='box-add-button'>
            <button className='button-add-page'>+ 페이지 추가</button>
            <button className='button-add-page'>+ 폴더 추가</button>
          </div>
        </div>
        <div className='content-grid'>
          {allPages.map((page, id) => {
            if (page.type === 'folder') {
              return (
                <Folder key={id} {...page}/>
              )
            }
            return (
              <Page key={id} {...page}/>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default App;
