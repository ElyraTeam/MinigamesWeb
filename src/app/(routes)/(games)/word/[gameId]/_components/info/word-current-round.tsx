'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { MdRefresh } from 'react-icons/md';

import localPlayer from '@/api/socket';
import useGameStore from '@/state/game';
import useRoomStore from '@/state/room';
import useOwner from '@/hooks/use-owner';
import IconButton from '@/components/ui/icon-button';
import ConfirmModal from '@/components/modals/confirm-modal';

import WordSideCardHeader from '../word-side-card-header';

interface WordCurrentRoundProps {}

const WordCurrentRound: React.FC<WordCurrentRoundProps> = ({}) => {
  const gameState = useGameStore((state) => state.game);
  const roomOptions = useRoomStore((state) => state.options);
  const [resetModalShow, setResetModalShow] = useState(false);
  const isOwner = useOwner();

  const handleReset = () => {
    localPlayer.resetGame();
    toast.success('تم اعادة اللعبة.', { id: 'word-reset-game' });
    setResetModalShow(false);
  };

  return (
    <>
      <ConfirmModal
        subtitle="هل انت متأكد من رغبتك في اعادة اللعبة؟"
        isOpen={resetModalShow}
        onClose={() => setResetModalShow(false)}
        onConfirm={handleReset}
        confirmVariant="warning"
      />
      <WordSideCardHeader className="flex items-center justify-center space-x-3 rtl:space-x-reverse">
        <span>الجولة</span>
        <span>
          <span className="font-light">
            {roomOptions?.options?.rounds || '?'}/
          </span>
          {gameState?.currentRound || '?'}
        </span>
        {isOwner && (
          <IconButton
            tooltip="اعادة اللعبة"
            onClick={() => setResetModalShow(true)}
          >
            <MdRefresh className="inline text-2xl" />
          </IconButton>
        )}
      </WordSideCardHeader>
    </>
  );
};

export default WordCurrentRound;
