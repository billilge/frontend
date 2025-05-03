import { cn } from '@/lib/utils';

interface SpacingProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | number;
}

export default function Spacing({ size }: SpacingProps) {
  const marginClasses = {
    sm: 'my-2',
    md: 'my-4',
    lg: 'my-6',
    xl: 'my-8',
  };

  const marginSize = typeof size === 'number' && size / 2;

  return (
    <div
      className={cn(
        'block h-0 w-full',
        typeof size === 'string' ? marginClasses[size] : `p-${marginSize}`,
      )}
    />
  );
}
