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

  const marginStyle = typeof size === 'number' ? { margin: size } : {};

  return (
    <div
      className={cn(typeof size === 'string' ? marginClasses[size] : '')}
      style={marginStyle}
    />
  );
}
