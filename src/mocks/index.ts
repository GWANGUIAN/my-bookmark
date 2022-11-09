import { PageConfig, FolderConfig } from "../types/common";

export const frequentPages: PageConfig[] = [
  { 
    type: "page",
    name: "구글",
    url: "https://www.google.com",
    icon: "/images/icon-google.svg",
  },
  {
    type: "page",
    name: "깃헙",
    url: "https://github.com",
    icon: "/images/icon-github.svg",
  },
  {
    type: "page",
    name: "레딧",
    url: "https://www.reddit.com",
    icon: "/images/icon-reddit.svg",
  },
  {
    type: "page",
    name: "인프런",
    url: "https://www.inflearn.com",
    icon: "/images/icon-inflearn.svg",
  },
];

export const allPages: Array<PageConfig | FolderConfig> = [
  {
    type: "folder",
    name: "유튜브",
    bookmarks: [
      {
        type: "page",
        name: "유튜브 | 노동요",
        icon: "/images/icon-youtube.svg",
        url: "https://www.youtube.com/playlist?list=PLcoIrrFlWMp99aFWgTGD9-d8fT4jNnYQ3",
      },
    ],
  },
  {
    type: "page",
    name: "구글",
    url: "https://www.google.com",
    icon: "/images/icon-google.svg",
  },
  {
    type: "page",
    name: "깃헙",
    url: "https://github.com",
    icon: "/images/icon-github.svg",
  },
  {
    type: "page",
    name: "레딧",
    url: "https://www.reddit.com",
    icon: "/images/icon-reddit.svg",
  },
  {
    type: "page",
    name: "인프런",
    url: "https://www.inflearn.com",
    icon: "/images/icon-inflearn.svg",
  },
  {
    type: "page",
    name: "인프런",
    url: "https://www.inflearn.com",
    icon: "/images/icon-inflearn.svg",
  },
  {
    type: "page",
    name: "인프런",
    url: "https://www.inflearn.com",
    icon: "/images/icon-inflearn.svg",
  },
  {
    type: "page",
    name: "인프런",
    url: "https://www.inflearn.com",
    icon: "/images/icon-inflearn.svg",
  },
  {
    type: "page",
    name: "인프런",
    url: "https://www.inflearn.com",
    icon: "/images/icon-inflearn.svg",
  },
];
