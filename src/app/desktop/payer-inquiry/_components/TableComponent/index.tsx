import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface Invoice {
  name: string;
  student_id: string;
  admin: boolean;
}

interface TableComponentProps {
  data: Invoice[];
}

export default function TableComponent({ data }: TableComponentProps) {
  return (
    <div className="flex justify-between p-10">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-30 text-center">이름</TableHead>
            <TableHead className="w-30 text-center">학번</TableHead>
            <TableHead className="w-30 text-center">관리자 여부</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item, index) => (
            <TableRow key={index}>
              <TableCell className="w-30 text-center">{item.name}</TableCell>
              <TableCell className="w-30 text-center">
                {item.student_id}
              </TableCell>
              <TableCell className="w-30 text-center">
                {item.admin ? '⭕' : '❌'}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
