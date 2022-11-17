import * as React from "react";
import "./reset.css";
import "./App.css";
import { useEffect, useState } from "react";
import IconSetting from "./icons/IconSetting";
import {
  allPages as allMockPages,
  frequentPages as frequentMockPages,
} from "./mocks";
import Page from "./items/Page";
import Folder from "./items/Folder";
import {
  closestCenter,
  DndContext,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  rectSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import { FolderConfig, PageConfig } from "./types/common";

const App = () => {
  const [frequentPages, setFrequentPages] =
    useState<PageConfig[]>(frequentMockPages);
  const [allPages, setAllPages] =
    useState<Array<PageConfig | FolderConfig>>(allMockPages);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        tolerance: 5,
        delay: 250,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragEndFrequentPages = (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setFrequentPages((items) => {
        const oldIndex = items.findIndex(
          ({ sortIndex }) => sortIndex === active.id
        );
        const newIndex = items.findIndex(
          ({ sortIndex }) => sortIndex === over.id
        );
        const newItems = [...items];
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, items[oldIndex]);
        return newItems;
      });
    }
  };

  const handleDragEndAllPages = (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      setAllPages((items) => {
        const oldIndex = items.findIndex(
          ({ sortIndex }) => sortIndex === active.id
        );
        const newIndex = items.findIndex(
          ({ sortIndex }) => sortIndex === over.id
        );
        const newItems = [...items];
        newItems.splice(oldIndex, 1);
        newItems.splice(newIndex, 0, items[oldIndex]);
        return newItems;
      });
    }
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
      if(tabs[0].url !== 'chrome://newtab/') {
        chrome.tabs.create({ url:'chrome://newtab/' });
      }
    });
    chrome.bookmarks.getTree(
      (results) => {
        console.log(JSON.stringify(results)); 
      }
    )
  },[])

  return (
    <div className="container">
      <div className="inner-container">
        <header>
          <button>
            <IconSetting />
          </button>
        </header>
        <h2>자주 찾는 페이지</h2>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEndFrequentPages}
        >
          <SortableContext
            items={allPages.map(({ sortIndex }) => sortIndex)}
            strategy={rectSortingStrategy}
          >
            <div className="content-grid">
              {frequentPages.map((page, id) => (
                <Page key={id} {...page} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        <div className="all-page-header">
          <h2>전체 페이지</h2>
          <div className="box-add-button">
            <button className="button-add-page">+ 페이지 추가</button>
            <button className="button-add-page">+ 폴더 추가</button>
          </div>
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEndAllPages}
        >
          <SortableContext
            items={allPages.map(({ sortIndex }) => sortIndex)}
            strategy={rectSortingStrategy}
          >
            <div className="content-grid">
              {allPages.map((page, id) => {
                if (page.type === "folder") {
                  return <Folder key={id} {...page} />;
                }
                return <Page key={id} {...page} />;
              })}
            </div>
          </SortableContext>
        </DndContext>
      </div>
    </div>
  );
};

export default App;
