import { Metadata } from 'next';

import { HOST } from '@/config/constants';
import checkRoomId from '@/actions/check-room';

import WordMainCard from './_components/word-main-card';

interface WordRoomPageProps {
  params: {
    gameId: string;
  };
}

export async function generateMetadata({
  params: { gameId },
}: WordRoomPageProps): Promise<Metadata> {
  try {
    const { owner } = await checkRoomId(gameId);
    return {
      description: `Join this game of Word by ${owner}`,
      openGraph: {
        title: `Join Word Game by ${owner}`,
        description: "You're invited to join this Word game!",
        url: `/word/${gameId}`,
      },
    };
  } catch (err) {
    return {
      description: "Room doesn't exist",
      openGraph: {
        title: 'Room not found',
        description: "Room doesn't exist",
        url: `/word`,
      },
    };
  }
}

const WordRoomPage: React.FC<WordRoomPageProps> = async ({
  params: { gameId },
}) => {
  return <WordMainCard roomId={gameId} />;
};

export default WordRoomPage;
