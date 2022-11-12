export interface PageConfig {
  id: number;
  type: "page";
  name: string;
  url: string;
  icon?: string;
  sortIndex: number;
}

export interface FolderConfig {
  id: number;
  type: "folder";
  name: string;
  color?: string;
  bookmarks: PageConfig[];
  sortIndex: number;
}
