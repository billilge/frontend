'use client';

import { useState } from 'react';

const useDropdown = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const showDropdown = () => setIsDropdownVisible(true);
  const hideDropdown = () => setIsDropdownVisible(false);

  return { showDropdown, hideDropdown, isDropdownVisible };
};

export default useDropdown;
