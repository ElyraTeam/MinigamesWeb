'use client';

import toast from 'react-hot-toast';
import { IoPerson } from 'react-icons/io5';
import { useEffect, useState } from 'react';

import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from '@/components/ui/popover';
import Input from '@/components/ui/input';
import useLocalStore from '@/state/local';
import Button from '@/components/ui/button';
import { MAX_NICKNAME_LENGTH, MIN_NICKNAME_LENGTH } from '@/config/constants';

import WordNickname from './word-nickname';

interface WordAppbarNicknameProps {}

const WordAppbarNickname: React.FC<WordAppbarNicknameProps> = ({}) => {
  const nickname = useLocalStore((state) => state.nickname);
  const setNickname = useLocalStore((state) => state.setNickname);
  const [newNickname, setNewNickname] = useState('');

  useEffect(() => {
    if (!nickname) return;
    setNewNickname(nickname);
  }, [nickname]);

  const handleSaveNickname = () => {
    if (
      !newNickname ||
      newNickname.trim().length <= MIN_NICKNAME_LENGTH ||
      newNickname.trim().length >= MAX_NICKNAME_LENGTH
    )
      return;
    setNickname(newNickname);
    toast.success('تم تعديل الاسم.');
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full rounded-xl py-2 bg-word-game-800 hover:bg-word-game-800/80 border-none space-x-1 rtl:space-x-reverse flex items-center justify-center shadow-[inset_0_0_10px_rgba(0,0,0,0.5)] transition-colors">
        <IoPerson className="inline text-lg" />
        <WordNickname />
      </PopoverTrigger>
      <PopoverContent
        sideOffset={16}
        className="flex flex-col gap-3 justify-center text-center bg-white w-56 z-[99999] rounded-2xl border-none"
      >
        <p>تعديل الاسم</p>
        <Input
          placeholder="اكتب اسمك"
          className="w-full rounded-2xl focus:border-word-game"
          value={newNickname}
          maxLength={MAX_NICKNAME_LENGTH}
          onChange={(e) => setNewNickname(e.target.value)}
        />
        <Button
          className="w-[70%] self-center bg-word-game-700 hover:bg-word-game-700/90"
          onClick={handleSaveNickname}
        >
          حفظ
        </Button>
      </PopoverContent>
    </Popover>
  );
};

export default WordAppbarNickname;
