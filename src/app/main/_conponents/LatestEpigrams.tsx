import FeedList from '@/components/FeedList';

export default function LatestEpigrams() {
  return (
    <>
      <h2 className="pc:mb-[40px] text-pre-lg font-weight-semibold txt-color-black-900 pc:text-iro-2xl mb-[24px]">
        최신 에피그램
      </h2>
      <FeedList />
    </>
  );
}
