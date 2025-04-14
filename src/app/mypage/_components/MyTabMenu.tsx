'use client';

import { useEffect, useState } from 'react';
import { TabMenu, TabPanel } from '@/components/TabMenu';
import MyEpigrams from './MyEpigrams';
import MyComments from './MyComments';
import { useMyCommentStore, useMyFeedStore } from '@/stores/pageStores';
import { useSession } from 'next-auth/react';
import { getUserComments } from '@/lib/User';

export default function MyTabMenu() {
  const [currentTab, setCurrentTab] = useState(0);
  const { data: session, status } = useSession();
  const token = session?.user.accessToken;
  const userId = session?.user.id ? Number(session.user.id) : undefined;

  const { totalCount: epigramCount } = useMyFeedStore();
  const { totalCount: commentCount } = useMyCommentStore();

  useEffect(() => {
    const fetchInitialComments = async () => {
      if (status === 'authenticated' && token && userId) {
        const store = useMyCommentStore.getState();

        if (store.items.length === 0) {
          try {
            store.setState({ initialLoading: true });

            const { list, totalCount } = await getUserComments(token, userId, 4, 0);

            store.setState({
              items: list,
              totalCount,
              cursor: list.length > 0 ? list[list.length - 1].id : undefined,
              hasMore: list.length < totalCount,
              initialLoading: false,
            });
          } catch (error) {
            console.log('초기 내 댓글 불러오기 실패', error);
            store.setState({ initialLoading: false });
          }
        }
      }
    };
    fetchInitialComments();
  }, [status, token, userId]);

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
