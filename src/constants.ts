// Returns Notion-compliant date string adjusted for date offset from today
// dateOffset is the number of days in the PAST
// limitations: only works on offsets that span the number of days in a month (0 - ~31)
const computeDate = (dateOffset: number): string => {
  const todayDate = new Date();

  // calculate date, month, and year using offset
  let dateNum = todayDate.getDate();
  let monthNum = todayDate.getMonth();
  let yearNum = todayDate.getFullYear();

  if (dateNum - dateOffset <= 0) {
    // check if previous month is December (year must change too in this case)
    if (monthNum - 1 < 0) {
      yearNum -= 1; // set year to previous year
      // note that months are 0-indexed but since we subtract one to get the previous month, this will account for that
      monthNum = 12; // set month to last month (december)
    }

    // set month to prevous month
    monthNum -= 1;
    // get number of days in previous month
    const daysInPrevMonth = new Date(yearNum, monthNum, 0).getDate();
    dateNum = daysInPrevMonth + (dateNum - dateOffset + 1);
  } else {
    dateNum -= dateOffset;
  }

  // append zero to date string if before 10th
  let date: string = `${dateNum}`;
  if (dateNum < 10) {
    date = 0 + date;
  }

  // append zero to month if before October
  // months are 0-indexed (add 1 to get 1-indexed month as string)
  let month = `${monthNum + 1}`;
  if (monthNum < 10) {
    month = 0 + month;
  }

  return `${yearNum}-${month}-${date}`;
};

// filter for question database
export const QUESTION_FILTER = {
  and: [
    {
      property: "Status",
      status: {
        equals: "Done",
      },
    },
    {
      property: "Date Completed",
      date: {
        before: computeDate(5),
      },
    },
  ],
};

// filter for review database
export const REVIEW_FILTER = {
  property: "Date",
  date: {
    after: computeDate(5),
  },
};

// filter to check for question assigned today
export const TODAY_FILTER = {
  property: "Date",
  date: {
    equals: computeDate(0),
  },
};
