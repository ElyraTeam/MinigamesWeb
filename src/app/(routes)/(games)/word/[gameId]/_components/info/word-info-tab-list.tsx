'use client';

import TabItem from '@/components/ui/tab-item';
import TabList from '@/components/ui/tab-list';

import WordLeaderboard from './word-leaderboard';

interface WordInfoTabListProps {}

const WordInfoTabList: React.FC<WordInfoTabListProps> = ({}) => {
  return (
    <TabList
      parentClassName="flex flex-col overflow-y-auto flex-grow scrollbar-thin"
      className="mx-5 mt-10 mb-5 rounded-xl bg-word-side-400/40"
      activeClassName="bg-word-side-200/80 rounded-xl shadow-md"
      tabSwitchClassName="p-3"
    >
      <TabItem label="الحالية" className="overflow-y-auto scrollbar-none">
        <WordLeaderboard lastRound />
      </TabItem>
      <TabItem label="المتصدرون" className="overflow-y-auto scrollbar-none">
        <WordLeaderboard />
      </TabItem>
    </TabList>
  );
};

export default WordInfoTabList;
