'use client';

import { useState } from 'react';
import { TabMenu, TabPanel } from '@/components/TabMenu';
import MyEpigrams from './MyEpigrams';
import MyComments from './MyComments';
import { useMyCommentStore, useMyFeedStore } from '@/stores/pageStores';

export default function MyTabMenu() {
  const [currentTab, setCurrentTab] = useState(0);

  const { totalCount: epigramCount } = useMyFeedStore();
  const { totalCount: commentCount } = useMyCommentStore();

  const menuArr = [
    { name: `내 에피그램(${epigramCount ?? 0})`, content: <MyEpigrams /> },
    { name: `내 댓글(${commentCount ?? 0})`, content: <MyComments /> },
  ];

  return (
    <div>
      <TabMenu menuArr={menuArr} currentTab={currentTab} selectMenuHandler={setCurrentTab} />
      <TabPanel content={menuArr[currentTab].content} />
    </div>
  );
}
