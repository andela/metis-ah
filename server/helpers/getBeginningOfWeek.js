const getBeginningOfWeek = (date) => {
  let currentDate = new Date(date);
  let day = currentDate.getDate().toString();
  let month = (currentDate.getMonth() + 1).toString();
  const year = currentDate.getFullYear().toString();


  month = month.length < 2 ? `0${month}` : month;
  day = day.length < 2 ? `0${day}` : day;

  currentDate = new Date(`${year}-${month}-${day}`);

  const dayOfWeek = currentDate.getDay();
  const dayOfMonth = currentDate.getDate();
  const startDateOfWeek = dayOfMonth - dayOfWeek + (dayOfWeek === 0 ? -6 : 0);
  return new Date(currentDate.setDate(startDateOfWeek));
};

export default getBeginningOfWeek;
