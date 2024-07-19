import { useEffect, useState } from 'react';

import useLocalStore from '@/state/local';
import usePlayersStore from '@/state/players';

import WordPlayerRank from './word-player-rank';

interface WordLeaderboardProps {
  lastRound?: boolean;
}

const WordLeaderboard: React.FC<WordLeaderboardProps> = ({ lastRound }) => {
  const gamePlayers = usePlayersStore((state) => state.players);
  const currentPlayer = useLocalStore((state) => state.nickname);
  const [sortedPlayers, setSortedPlayers] = useState<Player[]>([]);

  useEffect(() => {
    if (!gamePlayers || !gamePlayers.players) return;
    setSortedPlayers(
      [...gamePlayers.players].sort((a, b) =>
        lastRound
          ? b.lastRoundScore - a.lastRoundScore
          : b.totalScore - a.totalScore
      )
    );
  }, [gamePlayers, lastRound]);

  return (
    <>
      {sortedPlayers.map((plr, index) => (
        <WordPlayerRank
          key={plr.nickname}
          rank={index + 1}
          name={plr.nickname}
          score={lastRound ? plr.lastRoundScore : plr.totalScore}
          isOwner={plr.owner}
          isLocalPlayer={plr.nickname === currentPlayer}
          isOnline={plr.online}
        />
      ))}
    </>
  );
};

export default WordLeaderboard;