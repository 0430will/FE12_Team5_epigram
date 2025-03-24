'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { getEpigramsList } from '@/lib/Epigram';
import { Epigram } from '@/types/Epigram';

export default function useFetchEpigrams(limit: number, writerId?: number) {
  const { data: session } = useSession();
  const token = session?.accessToken;

  const [epigramData, setEpigramData] = useState<{
    isLoading: boolean;
    epigrams: Epigram[];
    totalCount: number;
  }>({
    isLoading: true,
    epigrams: [],
    totalCount: 0,
  });

  useEffect(() => {
    const fetchEpigrams = async () => {
      setEpigramData((prev) => ({ ...prev, isLoading: true }));

      const data = await getEpigramsList(token, limit, undefined, undefined, writerId);

      if (data) {
        setEpigramData({
          isLoading: false,
          epigrams: data.list,
          totalCount: data.totalCount,
        });
      } else {
        setEpigramData((prev) => ({ ...prev, isLoading: false }));
      }
    };
    fetchEpigrams();
  }, [limit, token, writerId]);
  return epigramData;
}
