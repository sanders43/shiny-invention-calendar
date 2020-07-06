let workDay = {
  "9 AM": "",
  "10 AM": "",
  "11 AM": "",
  "12 PM": "",
  "1 PM": "",
  "2 PM": "",
  "3 PM": "",
  "4 PM": "",
  "5 PM": "",
};
// Display Current Date and Time in Header

$(document).ready(function(){
    if(!localStorage.getItem('workDay')) {
      updateCalendarTasks(workDay);
    } else {
      updateCalendarTasks(JSON.parse(localStorage.getItem('workDay')));
    }
  })

let getDateAndTime = () => {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
}
getDateAndTime();
// Update time without refreshing page
setInterval(getDateAndTime, 1000);

let i = 1;
for(const property in workDay) {
  let task = "#task" + i;
  $(task).text(workDay[property]);
  let timeVal = "#time" + i;
  let presentHour = moment().hour();
  let timeString = $(timeVal).text();
  let timeInt = getInt(timeString);  
  if(timeInt < presentHour) {
    $(task).addClass("past");
  } else if (timeInt > presentHour) {
    $(task).addClass("future");
  } else {
    $(task).addClass("present");
  }
  i ++;
}
  
  
  
  $("button").click(function() {
    value = $(this).siblings("textarea").val();
    hours = $(this).siblings("div").text();
    
    saveSchedule(hours, value);
  });

  function getInt(hours) {
    switch(hours) {
      case "9 AM": return 9;
      case "10 AM": return 10;
      case "11 AM": return 11;
      case "12 PM": return 12;
      case "1 PM": return 13;
      case "2 PM": return 14;
      case "3 PM": return 15;
      case "4 PM": return 16;
      case "5 PM": return 17;
    }
  }

  function loadTasks() {
    result = localStorage.getItem('workDay')
    return (result ? result : workDay);
  }
  loadTasks();
  
  function initializeLocalStorage() {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  function saveTasks(dayObj) {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }
  
  function saveSchedule(hours, val) {
    if(!localStorage.getItem('workDay')) {
      initializeLocalStorage();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hours] = val
  
    saveTasks(workHours);
  }
  
  function updateCalendarTasks(dayObject) {
    $(".calendar-row").each(function(index) {
      let res = $(this).children("div");
      $(this).children("textarea").text(dayObject[res.text()]);
    })
  }