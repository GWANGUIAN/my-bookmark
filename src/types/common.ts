export interface PageConfig {
  type: "page";
  name: string;
  url: string;
  icon: string;
}

export interface FolderConfig {
  type: "folder";
  name: string;
  color?: string;
  bookmarks: PageConfig[];
}
