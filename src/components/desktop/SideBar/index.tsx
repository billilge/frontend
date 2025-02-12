import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
  title?: string;
  description?: string;
  triggerText?: string;
}

export default function Sidebar({
  children,
  title = 'Sidebar Title',
  description = '',
  triggerText = 'Open',
}: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="rounded-md bg-gray-primary px-3 py-2 text-white-primary">
        {triggerText}
      </SheetTrigger>
      <SheetContent className="max-w-[40rem]! w-full">
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
