'use client';

import { useState } from 'react';
import { TabMenu, TabPanel } from '@/components/TabMenu';

export default function MyTabMenu() {
  const [currentTab, setCurrentTab] = useState(0);

  const menuArr = [
    { name: '내 에피그램', content: 'Content for Tab 1 on Page 1' },
    { name: '내 댓글', content: 'Content for Tab 2 on Page 1' },
  ];

  return (
    <div>
      <TabMenu menuArr={menuArr} currentTab={currentTab} selectMenuHandler={setCurrentTab} />
      <TabPanel content={menuArr[currentTab].content} />
    </div>
  );
}
