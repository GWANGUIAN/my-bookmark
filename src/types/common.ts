export interface BookmarkConfig {
  name: string;
  url: string;
  icon: string;
}

export interface FolderConfig {
  name: string;
  color: string;
  bookmarks: BookmarkConfig[];
}