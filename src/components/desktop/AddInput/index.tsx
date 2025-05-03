import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';

interface AddInputProps {
  value: string;
  onClick: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyInput: (event: React.KeyboardEvent<HTMLInputElement>) => void;
}

export default function AddInput({
  onClick,
  value,
  onChange,
  onKeyInput,
}: AddInputProps) {
  return (
    <Input
      Icon={
        <Plus
          className="h-5 w-5 cursor-pointer text-muted-foreground"
          onClick={onClick}
        />
      }
      value={value}
      onChange={onChange}
      onKeyDown={onKeyInput}
      placeholder="이름을 입력해주세요."
    />
  );
}
