'use client';

import { useState } from 'react';
import { TabMenu, TabPanel } from '@/components/TabMenu';
import MyEpigrams from './MyEpigrams';

export default function MyTabMenu() {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '내 에피그램', content: <MyEpigrams /> },
    { name: '내 댓글', content: '내 댓글 컴포넌트' },
  ];

  return (
    <div>
      <TabMenu menuArr={menuArr} currentTab={currentTab} selectMenuHandler={setCurrentTab} />
      <TabPanel content={menuArr[currentTab].content} />
    </div>
  );
}
