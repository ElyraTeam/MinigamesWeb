import Image from 'next/image';
import { useEffect } from 'react';
import useCountdown from '../../helpers/hooks/useCountdown';
import WordTimer from './WordTimer';

interface WordWaitingProps {
  stopperNickname: string;
  isWaitingDone: boolean;
  onWaitingStart: () => void;
  onWaitingDone: () => void;
}

const WordWaiting: React.FC<WordWaitingProps> = ({
  stopperNickname,
  onWaitingStart,
  onWaitingDone,
}) => {
  const { countdown } = useCountdown(3, onWaitingDone);

  useEffect(() => {
    onWaitingStart();
  }, []);

  return (
    <div dir="rtl" className="flex flex-col text-center w-full justify-center">
      <Image src="/assets/svg/stopwatch.svg" height="40" width="40" />
      <p className="text-2xl font-bold mt-5">
        انتهي <span className="text-secondary">{stopperNickname}</span> من
        الكتابة!
      </p>
      <p className="my-5">سيبدأ التصويت خلال</p>
      <WordTimer countdown={countdown} className="w-20 h-20 text-[2.6rem]" />
    </div>
  );
};

export default WordWaiting;