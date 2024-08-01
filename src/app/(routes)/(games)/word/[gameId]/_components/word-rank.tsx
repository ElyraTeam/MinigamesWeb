import { cn } from '@/lib/utils';

interface WordRankProps {
  rank: number;
}

const WordRank: React.FC<WordRankProps> = ({ rank }) => {
  return (
    <p
      className={cn(
        'w-6 h-6 rounded-full text-center text-white/80',
        rank === 1 &&
          'bg-gradient-to-r from-yellow-600 to-white to-[200%] text-white',
        rank === 2 &&
          'bg-gradient-to-r from-gray-500 to-white to-[200%] text-white',
        rank === 3 &&
          'bg-gradient-to-r from-yellow-800 to-white to-[200%] text-white'
      )}
    >
      {rank}
    </p>
  );
};

export default WordRank;
