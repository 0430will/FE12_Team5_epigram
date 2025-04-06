'use client';

import { useEffect, useState } from 'react';
import { TabMenu, TabPanel } from '@/components/TabMenu';
import MyEpigrams from './MyEpigrams';
import MyComments from './MyComments';
import { useMyCommentStore, useMyFeedStore } from '@/stores/pageStores';
import { useSession } from 'next-auth/react';
import { getEpigramsList } from '@/lib/Epigram';
import { getUserComments } from '@/lib/User';

export default function MyTabMenu() {
  const [currentTab, setCurrentTab] = useState(0);
  const { data: session, status } = useSession();
  const token = session?.user.accessToken;
  const userId = session?.user.id ? Number(session.user.id) : undefined;

  const { totalCount: epigramCount, setState: setFeedState } = useMyFeedStore();
  const { totalCount: commentCount, setState: setCommentState } = useMyCommentStore();

  const menuArr = [
    { name: `내 에피그램(${epigramCount ?? 0})`, content: <MyEpigrams /> },
    { name: `내 댓글(${commentCount ?? 0})`, content: <MyComments /> },
  ];

  useEffect(() => {
    if (status === 'authenticated' && token && userId) {
      (async () => {
        const epigramData = await getEpigramsList(token, 3, 0, undefined, userId);
        const commentData = await getUserComments(token, userId, 4, 0);

        setFeedState({
          items: epigramData.list,
          hasMore: epigramData.list.length > 0,
          cursor: epigramData.list.length > 0 ? epigramData.list[epigramData.list.length - 1].id : undefined,
          totalCount: epigramData.totalCount,
        });

        setCommentState({
          items: commentData.list,
          hasMore: commentData.list.length > 0,
          cursor: commentData.list.length > 0 ? commentData.list[commentData.list.length - 1].id : undefined,
          totalCount: commentData.totalCount,
        });
      })(); // () 즉시실행
    }
  }, [status, token, userId]);

  return (
    <div>
      <TabMenu menuArr={menuArr} currentTab={currentTab} selectMenuHandler={setCurrentTab} />
      <TabPanel content={menuArr[currentTab].content} />
    </div>
  );
}
