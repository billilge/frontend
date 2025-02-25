import { Input } from '../../ui/input';

interface AddStudentIdProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function AddStudentId({ value, onChange }: AddStudentIdProps) {
  return (
    <div className="grid w-60 max-w-sm items-center gap-1.5">
      {/* <Label htmlFor="studentId">학번</Label> */}
      <Input
        type="text"
        id="studentId"
        placeholder="학번"
        value={value}
        onChange={onChange}
        Icon=" "
      />
    </div>
  );
}
