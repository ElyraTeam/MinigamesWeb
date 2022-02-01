import { useEffect, useRef } from 'react';
import { useAppSelector } from '../../state/hooks';
import WordChat from './WordChat';
import WordVotingCard from './WordVotingCard';

interface WordVotingProps {
  allVotes: AllPlayersVotes;
  localVotes: Votes;
  categoryVoteData: CategoryVoteData;
  onVoteChange: (nickname: string, vote: number) => void;
  disableVotes?: boolean;
}

const WordVoting: React.FC<WordVotingProps> = ({
  localVotes,
  allVotes,
  onVoteChange,
  categoryVoteData,
  disableVotes,
}) => {
  const catLength = useAppSelector(
    (state) => state.roomSlice.options?.categories.length
  );
  const playerNickname = useAppSelector((state) => state.localSlice.nickname);
  const votingCardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (votingCardsRef.current)
      votingCardsRef.current?.scrollTo({ behavior: 'smooth', top: 0 });
  }, [votingCardsRef]);

  const getTotalVotes = () => {
    const totalVotes: { [votedTo: string]: { [vote: number]: string[] } } = {};
    for (const voter in allVotes) {
      const userVotes = allVotes[voter]; // {"kemo": 5, "just":  5}
      for (const votedTo in userVotes) {
        const vote = userVotes[votedTo];
        if (!totalVotes[votedTo]) {
          totalVotes[votedTo] = {};
        }
        if (!totalVotes[votedTo][vote]) {
          totalVotes[votedTo][vote] = [];
        }
        totalVotes[votedTo][vote].push(voter);
      }
    }
    return totalVotes;
  };

  return (
    <div className="grid grid-cols-[auto_1fr] h-full w-full sm:overflow-hidden">
      <div className="chat-section">
        <WordChat />
      </div>
      <div className="py-8 px-12 scrollbar-thin overflow-y-scroll" dir="ltr">
        <h1 className="font-semibold text-2xl text-right mb-12" dir="rtl">
          صوت للاجابة الصحيحة:{' '}
          <span className="mr-2 font-bold">
            {categoryVoteData.category}
            <span className="mx-4 font-medium">
              (
              <span className="font-bold">
                {`${catLength}/`}
                <span className="text-secondary">
                  {(categoryVoteData.categoryIndex ?? 0) + 1}
                </span>
              </span>
              )
            </span>
          </span>
        </h1>
        <div
          className="grid md:grid-cols-2 justify-items-center gap-y-8 sm:grid-cols-1"
          dir="rtl"
          ref={votingCardsRef}
        >
          {Object.entries(categoryVoteData.values).map(([nickname, value]) => {
            const isValueEmpty = value == undefined || value == '';
            const totalVotes = getTotalVotes();
            console.log('allVotes', allVotes);
            console.log('localVotes', localVotes);
            console.log('totalVotes', totalVotes);
            return (
              <WordVotingCard
                key={nickname}
                nickname={nickname}
                value={value}
                onVoteChange={onVoteChange}
                activeVote={isValueEmpty ? 0 : localVotes[nickname]}
                disableVotes={disableVotes || nickname == playerNickname}
                locked={isValueEmpty}
                votes={totalVotes[nickname]}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WordVoting;
