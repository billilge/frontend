const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
  e.currentTarget.style.transform = 'scale(0.95)';
};

const handleTouchEnd = (e: React.TouchEvent<HTMLButtonElement>) => {
  e.currentTarget.style.transform = 'scale(1)';
};

export { handleTouchStart, handleTouchEnd };
