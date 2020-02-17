// Function returns last business day. Can work with or without input. If input is supplied it uses that as today's date. Return type is javascript day-date.

function getPrevBusinessDate(todayDate) {
  let today = todayDate ? new Date(todayDate) : new Date();
  let dayOfWeek = today.getDay();
  let dayOfMonth = today.getDate();

  let subtract = 1; // we subtract 1, unless today is either Sunday or Monday.
  // we subtract 2 days if it is Sunday, 3 if Monday
  if (dayOfWeek === 0) {
    subtract = 2;
  }
  if (dayOfWeek === 1) {
    subtract = 3;
  }
  // subtract from day of month and return day date
  today.setDate(dayOfMonth - subtract);
  return today.toDateString();
}

// ************************************
// *** output and some test cases ****
console.log(getPrevBusinessDate());
console.log(
  `Today is ${new Date().toDateString()}. Previous Business Day is ${getPrevBusinessDate()}.`
);

/// *** With input MM/DD/YYYY
console.log(getPrevBusinessDate('1/1/2020'));
console.log(getPrevBusinessDate('2/1/2020'));
console.log(getPrevBusinessDate('12/10/1990'));
