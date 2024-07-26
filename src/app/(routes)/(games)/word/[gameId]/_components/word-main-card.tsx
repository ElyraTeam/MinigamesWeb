'use client';

import { State } from '@/types/word';
import useGameStore from '@/state/game';
import { getPlayerById } from '@/lib/word';
import usePlayersStore from '@/state/players';
import useCurrentGame from '@/hooks/use-current-game';

import WordCard from './word-card';
import WordGame from './game/word-game';
import WordVoting from './game/word-voting';
import WordCountdown from './word-countdown';
import WordGameHeader from './word-game-header';
import WordGameContent from './word-game-content';
import WordDoneButton from './game/word-done-button';
import WordReadyButton from './lobby/word-ready-button';
import WordGameSettings from './lobby/word-game-settings';

interface WordMainCardProps {
  roomId: string;
}

const WordMainCard: React.FC<WordMainCardProps> = ({ roomId }) => {
  const game = useGameStore((state) => state.game);
  const players = usePlayersStore((state) => state.players?.players) || [];
  const { countdown } = useCurrentGame(roomId);

  const renderContentFromState = () => {
    if (game && countdown) {
      if (game.state === State.VOTING) {
        return (
          <WordCountdown
            title={
              <>
                انتهي{' '}
                <span className="text-word-secondary-500/40">
                  {(game.stopClicker &&
                    getPlayerById(players, game.stopClicker)?.nickname) ||
                    'شخص'}
                </span>{' '}
                من الكتابة!
              </>
            }
            subtitle="سيبدأ التصويت بعد:"
            countdown={countdown}
          />
        );
      }
      return (
        <WordCountdown
          title="استعد للكتابة!"
          subtitle="ستبدأ الجولة بعد:"
          countdown={countdown}
        />
      );
    }
    if (!game || game.state === State.LOBBY) return <WordGameSettings />;
    if (game.state === State.INGAME) return <WordGame />;
    if (game.state === State.VOTING) return <WordVoting />;
  };

  const renderButtonFromState = () => {
    if (countdown) return null;
    if (!game || game.state === State.LOBBY) return <WordReadyButton />;
    if (game.state === State.VOTING || game.state === State.INGAME)
      return <WordDoneButton state={game.state} />;
    return null;
  };

  return (
    <WordCard className="flex flex-col bg-word-game py-3 px-6 gap-3 overflow-y-auto scrollbar-thin">
      <WordGameHeader />
      <WordGameContent>{renderContentFromState()}</WordGameContent>
      {renderButtonFromState()}
    </WordCard>
  );
};

export default WordMainCard;
