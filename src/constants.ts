// ! switch this from today's date to 3 days ago
const TODAY = new Date().toISOString();

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
        before: TODAY,
      },
    },
  ],
};

// filter for review database
export const REVIEW_FILTER = {
  property: "Date",
  date: {
    before: TODAY,
  },
};

// filter to check for question assigned today
export const TODAY_FILTER = {
  property: "Date",
  date: {
    equals: TODAY,
  },
};
