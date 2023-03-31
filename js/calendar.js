
const calendarGrid = document.querySelector(".calendar-grid");

const holidays = [
  {
    name: "New Year's Day",
    date: new Date(new Date().getFullYear(), 0, 1), // January 1st
  },
  {
    name: "Seollal",
    date: null, // Will be calculated using the Korean Lunar Calendar
  },
  {
    name: "Independence Movement Day",
    date: new Date(new Date().getFullYear(), 2, 1), // March 1st
  },
  {
    name: "Buddha's Birthday",
    date: null, // Will be calculated using the Korean Lunar Calendar
  },
  {
    name: "Children's Day",
    date: new Date(new Date().getFullYear(), 4, 5), // May 5th
  },
  {
    name: "Memorial Day",
    date: new Date(new Date().getFullYear(), 5, 6), // June 6th
  },
  {
    name: "Liberation Day",
    date: new Date(new Date().getFullYear(), 7, 15), // August 15th
  },
  {
    name: "Chuseok",
    date: null, // Will be calculated using the Korean Lunar Calendar
  },
  {
    name: "National Foundation Day",
    date: new Date(new Date().getFullYear(), 9, 3), // October 3rd
  },
  {
    name: "Hangul Proclamation Day",
    date: new Date(new Date().getFullYear(), 9, 9), // October 9th
  },
  {
    name: "Christmas Day",
    date: new Date(new Date().getFullYear(), 11, 25), // December 25th
  },
];

// Import Korean holidays package
const holidayKr = window.holidayKr;

// Set Seollal date
holidays.find((holiday) => holiday.name === "Seollal").date = new Date(
  holidayKr.getSeollal(new Date().getFullYear())
);
// Set Buddha's Birthday date
holidays.find((holiday) => holiday.name === "Buddha's Birthday").date =
  new Date(holidayKr.getBuddhasBirthday(new Date().getFullYear()));
// Set Chuseok date
holidays.find((holiday) => holiday.name === "Chuseok").date = new Date(
  holidayKr.getChuseok(new Date().getFullYear())
);


function isHoliday(date) {
  for (let holiday of holidays) {
    if (
      date.getFullYear() === holiday.date.getFullYear() &&
      date.getMonth() === holiday.date.getMonth() &&
      date.getDate() === holiday.date.getDate()
    ) {
      return holiday.name;
    }
  }
  return false;
}

let currentDate = new Date();

function createCalendar() {
  // get current date
  calendarGrid.innerHTML = "";
  // set title to current month
  const title = document.querySelector(".calendar-heading");
  title.textContent = `${currentDate.toLocaleString("default", {
    month: "long",
  })} ${currentDate.getFullYear()}`;

  // set date to the first day of the current month
  currentDate.setDate(1);

  // get the day of the week of the first day of the month
  const firstDayIndex = currentDate.getDay();

  // get the last day of the current month
  const lastDay = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  // get today's date
  const today = new Date();

  // create grid cells for each day of the month
  for (let i = 1; i <= lastDay; i++) {
    const cellDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      i
    );
    const cell = document.createElement("div");
    cell.textContent = i;
    if (i === 1) {
      cell.style.gridColumnStart = firstDayIndex + 1;
    }
    // Check if the cell represents today's date
    if (
      currentDate.getFullYear() === today.getFullYear() &&
      currentDate.getMonth() === today.getMonth() &&
      i === today.getDate()
    ) {
      cell.classList.add("today");
      cell.textContent = `${i} (Today)`; // Add the word "Today" to the cell
    }
   // Check if the cell represents a holiday
   const holidayName = isHoliday(cellDate);
   if (holidayName) {
     cell.classList.add("holiday");
     cell.textContent = `${i} (${holidayName})`; // Add the holiday name to the cell
   }

   calendarGrid.appendChild(cell);
 }
}

const prevButton = document.querySelector("#prev-button");
const nextButton = document.querySelector("#next-button");
const todayButton = document.querySelector("#today-button");

// Add event listener to the "prev" button
prevButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1); // Move back one month
  createCalendar(); // Recreate the calendar with the updated month
});

// Add event listener to the "next" button
nextButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1); // Move forward one month
  createCalendar(); // Recreate the calendar with the updated month
});

// Add event listener to the "today" button
todayButton.addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth()); // Reset to the current month
  createCalendar(); // Recreate the calendar with the updated month
});

// Create initial calendar on page load
createCalendar();