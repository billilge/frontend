import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  // SheetDescription,
  SheetTrigger,
} from '@/components/ui/sheet';
import { ReactNode } from 'react';

interface SidebarProps {
  children: ReactNode;
  title?: string;
  // description?: string;
  triggerText?: string;
}

export default function Sidebar({
  children,
  title = 'Sidebar Title',
  // description = '',
  triggerText = 'Open',
}: SidebarProps) {
  return (
    <Sheet>
      <SheetTrigger className="whitespace-nowrap bg-transparent text-sm text-black-primary">
        {triggerText}
      </SheetTrigger>
      <SheetContent className="max-w-[40rem]! w-full">
        <SheetHeader>
          <SheetTitle className="flex justify-center text-2xl font-medium">
            {title}
          </SheetTitle>
          {/* {description && <SheetDescription>{description}</SheetDescription>} */}
        </SheetHeader>
        <div className="mt-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
