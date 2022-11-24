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

const App = () => {
  const [frequentPages, setFrequentPages] =
    useState<PageConfig[]>(frequentMockPages);
  const [allPages, setAllPages] =
    useState<Array<PageConfig | FolderConfig>>(allMockPages);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const settingModalRef = useRef<HTMLDivElement>(null);
  const settingButtonRef = useRef<HTMLButtonElement>(null);
  const [isImportModalOpen, setIsImportModalOpen] = React.useState(false);
  const importButtonRef = useRef<HTMLButtonElement>(null);
  const importModalRef = useRef<HTMLDivElement>(null);

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
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      if (tabs[0].url !== "chrome://newtab/") {
        chrome.tabs.create({ url: "chrome://newtab/" });
      }
    });
  }, []);

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
      <ImportBookmarkModal
        isOpen={isImportModalOpen}
        modalRef={importModalRef}
      />
    </>
  );
};

export default App;
