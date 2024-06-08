const monthEl = document.getElementsByClassName("month")[0].getElementsByTagName("h1")[0];
const daysEl = document.getElementsByClassName("days")[0];
const weekEl = document.getElementsByClassName("weekdays")[0];
const prevMonthBtn = document.getElementById("prevMonthBtn");
const nextMonthBtn = document.getElementById("nextMonthBtn");
todayBtn = document.getElementById("todayBtn");

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];
const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function generateWeekdaysHtml() {
    let weekdaysHtml = "";
    for (let day of daysOfWeek) {
        weekdaysHtml += `<div>${day}</div>`;
    }
    return weekdaysHtml;
}

weekEl.innerHTML =  generateWeekdaysHtml();

let currentMonthIdx = new Date().getMonth();
currentYear = new Date().getFullYear();

function generateEventWindow(day, formattedDate) {


    const eventWindow = window.open("", "_blank", "width=600,height=600,left=500,right=500");
    eventWindow.document.write(`
        <html>
        <head>
            <title>Add Event</title>
            <link rel="stylesheet" type="text/css" href="styles.css">
        </head>
        <body class="event-window">
            <h2>Add Event at ${formattedDate}</h2>
            <label for="startTime">Start Time:</label>
            <input type="text" id="startTime" name="startTime"><br><br>
            <label for="endTime">End Time:</label>
            <input type="text" id="endTime" name="endTime"><br><br>
            <label for="description">Description:</label><br>
            <textarea id="description" name="description" rows="4" cols="50"></textarea><br><br>
            <button id="okBtn">OK</button>
        </body>
        </html>
    `);

    eventWindow.document.getElementById("okBtn").addEventListener("click", function() {
        eventWindow.close();
    });
}
function updateCalendar() {
    const lastDay = new Date(currentYear, currentMonthIdx + 1, 0).getDate();
    const firstDay = new Date(currentYear, currentMonthIdx, 1).getDay();
    console.log(currentYear)
    
    monthEl.innerText = `${currentYear.toString()} ${months[currentMonthIdx].padStart(10)}`;

    let days = "";
    let prevMonthLastDay = new Date(currentYear, currentMonthIdx, 0).getDate();

    for (let i = firstDay; i > 0; i--) {
        days += `<div class="other-month">${prevMonthLastDay - i + 1}</div>`;
    }

    for (let i = 1; i <= lastDay; i++) {
        if(i=== new Date().getDate() && currentMonthIdx=== new Date().getMonth()){
            days +=`<div class="today">${i}</div>`;
        }
        else{
            days +=`<div>${i}</div>`;
        }
    } 
    let totalDays = firstDay + lastDay;
    let remainingDays = 42 - totalDays;
    for (let i = 1; i <= remainingDays; i++) {
        days += `<div class="other-month">${i}</div>`;

    }
    daysEl.innerHTML = days;
    const dayElements = document.getElementsByClassName("days")[0].children;
    for (let i = 0; i < dayElements.length; i++) {
        dayElements[i].addEventListener("click", function() {
            const day = parseInt(this.innerText);
            const date = new Date(currentYear, currentMonthIdx, day);
            const formattedDate = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

            generateEventWindow(day, formattedDate);
        });
    }

}

function prevMonth() {
    currentMonthIdx = (currentMonthIdx - 1 + 12) % 12;
    if (currentMonthIdx === 11) {
        currentYear--;
    }
    updateCalendar();
}

function nextMonth() {
    currentMonthIdx = (currentMonthIdx + 1) % 12;
    if (currentMonthIdx === 0) {
        currentYear++;
    }
    updateCalendar();
}
function today() {
    currentMonthIdx = new Date().getMonth();
    currentYear=new Date().getFullYear();
    updateCalendar();
}

todayBtn.addEventListener("click", today)
prevMonthBtn.addEventListener("click", prevMonth);
nextMonthBtn.addEventListener("click", nextMonth);
updateCalendar();