import * as React from 'react';
import { cn } from '@/lib/utils';
import { Plus } from 'lucide-react'; // 기본 아이콘은 Plus로 설정

interface InputProps extends React.ComponentProps<'input'> {
  Icon?: React.ReactNode; // 아이콘을 전달할 수 있는 props
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = 'text',
      Icon = <Plus className="h-5 w-5 text-muted-foreground" />,
      ...props
    },
    ref,
  ) => {
    return (
      <div className="relative w-full max-w-80">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          {...props}
        />
        <div className="absolute right-3 top-1/2 -translate-y-1/2">
          {Icon} {/* 전달된 아이콘을 렌더링 */}
        </div>
      </div>
    );
  },
);
Input.displayName = 'Input';

export { Input };
