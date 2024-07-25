import Input from '@/components/ui/input';

interface WordCategoryBoxProps {
  label: string;
  letter: string;
  onChange?: (value: string) => void;
}

const WordCategoryBox: React.FC<WordCategoryBoxProps> = ({
  label,
  letter,
  onChange,
}) => {
  return (
    <div className="space-y-2 text-center">
      <label className="text-lg">{label}</label>
      <Input
        className="placeholder:text-white/60 bg-white/[0.275] text-white border-transparent focus:border-word-primary-900 overflow-y-hidden px-4"
        placeholder={`${letter}ـ..`}
        onChange={(e) => onChange?.(e.target.value)}
      />
    </div>
  );
};

export default WordCategoryBox;
