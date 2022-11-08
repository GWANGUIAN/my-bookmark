import { BookmarkConfig, FolderConfig } from '../types/common';

export const frequentPages: BookmarkConfig[] = [
  {
    name: '구글',
    url: 'https://www.google.com',
    icon: '/images/icon-google.svg',
  },
  {
    name: '깃헙',
    url: 'https://github.com',
    icon: '/images/icon-github.svg',
  },
  {
    name: '레딧',
    url: 'https://www.reddit.com',
    icon: '/images/icon-reddit.svg',
  },
  {
    name: '인프런',
    url: 'https://www.inflearn.com',
    icon: '/images/icon-inflearn.svg',
  },
];

export const allPages: Array<BookmarkConfig | FolderConfig> = [
  {
    name: '유튜브',
    color: '#D1D1D1',
    bookmarks: [
      {
        name: '유튜브 | 노동요',
        icon: '/images/icon-youtube.svg',
        url: 'https://www.youtube.com/playlist?list=PLcoIrrFlWMp99aFWgTGD9-d8fT4jNnYQ3',
      }
    ],
  },
  {
    name: '구글',
    url: 'https://www.google.com',
    icon: '/images/icon-google.svg',
  },
  {
    name: '깃헙',
    url: 'https://github.com',
    icon: '/images/icon-github.svg',
  },
  {
    name: '레딧',
    url: 'https://www.reddit.com',
    icon: '/images/icon-reddit.svg',
  },
  {
    name: '인프런',
    url: 'https://www.inflearn.com',
    icon: '/images/icon-inflearn.svg',
  },
];