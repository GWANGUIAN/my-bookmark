export interface PageConfig {
  id: string;
  type: "page";
  name: string;
  url: string;
  icon?: string;
  sortIndex: number;
}

export interface FolderConfig {
  id: string;
  type: "folder";
  name: string;
  color?: string;
  children: PageConfig[];
  sortIndex: number;
}
