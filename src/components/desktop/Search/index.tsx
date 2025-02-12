'use client';

import { SearchInput } from '../../ui/search-input';

export default function Search() {
  return (
    <SearchInput
      placeholder="검색어 입력..."
      onSearch={(query) => console.log(query)}
    />
  );
}
