import { RefObject, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface DropdownProps {
  actions: { title: string; func: () => void }[];
  isVisible: boolean;
  hideDropdown: () => void;
  positionClasses?: string;
  // 열고 닫는 버튼. 바깥 클릭 감지에서 제외해야 버튼으로 다시 닫을 수 있음
  triggerRef?: RefObject<HTMLElement>;
}

export default function Dropdown({
  actions,
  isVisible,
  hideDropdown,
  positionClasses = 'top-0 right-0',
  triggerRef,
}: DropdownProps) {
  const dropdownRef = useRef<HTMLUListElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !triggerRef?.current?.contains(target)
      ) {
        hideDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [hideDropdown, triggerRef]);

  return (
    <ul
      ref={dropdownRef}
      className={cn(
        'absolute z-10 flex min-w-28 flex-col gap-3 rounded-[20px] border-none bg-white-primary px-3.5 py-4 shadow-md',
        positionClasses,
        !isVisible && 'hidden',
      )}
    >
      {actions.map((action) => (
        <li key={action.title}>
          <button
            type="button"
            onClick={() => {
              action.func();
              hideDropdown();
            }}
            className="flex text-sm font-medium leading-none"
          >
            {action.title}
          </button>
        </li>
      ))}
    </ul>
  );
}
