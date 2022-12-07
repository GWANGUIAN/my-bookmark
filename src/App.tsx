import * as React from "react";
import "./reset.css";
import "./App.css";
import { useCallback, useEffect, useRef, useState } from "react";
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
import SettingModal from "./components/SettingModal";
import ImportBookmarkModal from "./components/ImportBookmarkModal";
import { useChromeStorageSync } from 'use-chrome-storage';
import PageAddModal from './components/PageAddModal';
import FolderAddModal from './components/FolderAddModal';

const App = () => {
  const [allPages, setAllPages] = useChromeStorageSync('all',[]) as unknown as [(PageConfig|FolderConfig)[], (data: (PageConfig|FolderConfig)[]) => void];
  const [frequentPages, setFrequentPages] = useChromeStorageSync('frequent',[]) as unknown as [PageConfig[], (data: PageConfig[]) => void];
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const settingModalRef = useRef<HTMLDivElement>(null);
  const settingButtonRef = useRef<HTMLButtonElement>(null);
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false);
  const importButtonRef = useRef<HTMLButtonElement>(null);
  const importModalRef = useRef<HTMLDivElement>(null);
  const [isPageAddModalOpen, setIsPageAddModalOpen] = useState(false);
  const addPageButtonRef = useRef<HTMLButtonElement>(null);
  const addPageModalRef = useRef<HTMLDivElement>(null);
  const [isFolderAddModalOpen, setIsFolderAddModalOpen] = useState(false);
  const addFolderButtonRef = useRef<HTMLButtonElement>(null);
  const addFolderModalRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback(
    ({ target }: MouseEvent) => {
      if (
        !settingModalRef.current!.contains(target as Node) &&
        !settingButtonRef.current!.contains(target as Node)
      ) {
        setIsSettingModalOpen(false);
      }

      if (
        !importModalRef.current!.contains(target as Node) &&
        !importButtonRef.current!.contains(target as Node)
      ) {
        setIsImportModalOpen(false);
      }

      if (
        !addPageModalRef.current!.contains(target as Node) &&
        !addPageButtonRef.current!.contains(target as Node)
      ) {
        setIsPageAddModalOpen(false);
      }

      if (
        !addFolderModalRef.current!.contains(target as Node) &&
        !addFolderButtonRef.current!.contains(target as Node)
      ) {
        setIsFolderAddModalOpen(false);
      }
    },
    [setIsSettingModalOpen]
  );

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [handleClickOutside]);

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
      const oldIndex = frequentPages.findIndex(
        ({ sortIndex }) => sortIndex === active.id
      );
      const newIndex = frequentPages.findIndex(
        ({ sortIndex }) => sortIndex === over.id
      );
      const newItems = [...frequentPages];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, frequentPages[oldIndex]);
      setFrequentPages(newItems as PageConfig[]);
    }
  };

  const handleDragEndAllPages = (event: { active: any; over: any }) => {
    const { active, over } = event;

    if (active.id !== over.id) {
      const oldIndex = allPages.findIndex(
        ({ sortIndex }) => sortIndex === active.id
      );
      const newIndex = allPages.findIndex(
        ({ sortIndex }) => sortIndex === over.id
      );
      const newItems = [...allPages];
      newItems.splice(oldIndex, 1);
      newItems.splice(newIndex, 0, allPages[oldIndex]);
      setAllPages(newItems);
    }
  };

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].url !== "chrome://newtab/") {
        chrome.tabs.create({ url: "chrome://newtab/" });
      }
    });
  }, [allPages]);

  return (
    <>
      <div className="container">
        <div className="inner-container">
          <header>
            <button
              className="button-setting"
              ref={settingButtonRef}
              onClick={() => {
                setIsSettingModalOpen(true);
              }}
              style={{
                backgroundColor: isSettingModalOpen ? "#c0c0c0" : "transparent",
              }}
            >
              <IconSetting />
              <SettingModal
                isOpen={isSettingModalOpen}
                modalRef={settingModalRef}
                importButtonRef={importButtonRef}
                onOpenImportModal={() => {
                  setIsImportModalOpen(true);
                }}
              />
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
              <button
                className="button-add-page"
                ref={addPageButtonRef}
                onClick={()=>{
                  setIsPageAddModalOpen(true);
                }}>
                  + 페이지 추가
              </button>
              <button
                className="button-add-page"
                ref={addFolderButtonRef}
                onClick={()=>{
                  setIsFolderAddModalOpen(true);
                }}
              >
                + 폴더 추가
              </button>
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
      <ImportBookmarkModal
        isOpen={isImportModalOpen}
        modalRef={importModalRef}
      />
      <PageAddModal
        isOpen={isPageAddModalOpen}
        modalRef={addPageModalRef}
        onClose={() => {
          setIsPageAddModalOpen(false);
        }}
      />
      <FolderAddModal
        isOpen={isFolderAddModalOpen}
        modalRef={addFolderModalRef}
        onClose={() => {
          setIsFolderAddModalOpen(false);
        }}
      />
    </>
  );
};

export default App;
