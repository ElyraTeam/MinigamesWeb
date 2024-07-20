import { cn } from '@/lib/utils';

interface InputProps extends React.ComponentProps<'input'> {
  parentClassName?: string;
  icon?: React.ReactNode;
  onIconClick?: () => any;
}

const Input: React.FC<InputProps> = ({
  className,
  parentClassName,
  icon,
  onIconClick,
  disabled,
  ...props
}) => {
  return (
    <div className={cn('relative', parentClassName)}>
      <input
        className={cn(
          'rounded-lg bg-transparent outline-none border-2 w-full p-[12px] transition-colors rtl:pe-10 text-sm',
          className
        )}
        disabled={disabled}
        {...props}
      />
      <div
        className={cn(
          'absolute inset-y-0 end-0 pe-3 flex items-center z-10',
          onIconClick && !disabled && 'cursor-pointer',
          disabled && 'cursor-not-allowed'
        )}
        onClick={onIconClick}
      >
        {icon}
      </div>
    </div>
  );
};

export default Input;
