'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchInputProps extends React.ComponentProps<'input'> {
  onSearch: () => void; // 검색 실행 시 호출될 함수
}

const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, type = 'text', onSearch, ...props }, ref) => {
    const [query, setQuery] = React.useState('');

    const handleSearch = () => {
      if (onSearch) {
        onSearch();
      }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
      if (event.key === 'Enter') {
        handleSearch();
      }
    };

    return (
      <div className="relative w-full max-w-80">
        <input
          type={type}
          className={cn(
            'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 pr-10 text-base shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            className,
          )}
          ref={ref}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          {...props}
        />
        <button
          type="button"
          onClick={handleSearch}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    );
  },
);
SearchInput.displayName = 'SearchInput';

export { SearchInput };
