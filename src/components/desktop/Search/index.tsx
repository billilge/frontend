'use client';

import { SearchInput } from '../../ui/search-input';

interface SearchProps {
  placeholder?: string;
}

export default function Search({
  placeholder = '검색어를 입력하세요.',
}: SearchProps) {
  return (
    <SearchInput
      placeholder={placeholder}
      onSearch={(query) => console.log(query)}
    />
  );
}
