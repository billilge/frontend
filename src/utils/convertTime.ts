const convertTime = (date: string) => {
  const TIME_ZONE = 9 * 60 * 60 * 1000;
  const dateObj = new Date(date);

  const formattedDate = new Date(dateObj.getTime() + TIME_ZONE)
    .toISOString()
    .split('T')[0];

  const formattedTime = dateObj.toTimeString().split(' ')[0];

  return { formattedDate, formattedTime };
};

export default convertTime;
