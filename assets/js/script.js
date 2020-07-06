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

const getDateAndTime = () => {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
}
getDateAndTime();
// Update time without refreshing page
setInterval(getDateAndTime, 1000);

const getInt = (hours) => {
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

let i = 1;
for(const property in workDay) {
  let task = "#task" + i;
  console.log(task)
  $(task).text(workDay[property]);
  let timeVal = "#time" + i;
  console.log(timeVal)
  let presentHour = moment().hour();
  console.log(presentHour)
  let timeString = $(timeVal).text();
  console.log(timeString)
  let timeInt = getInt(timeString);
  console.log(timeInt)  
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

  const initLocal = () => {
    localStorage.setItem('workDay', JSON.stringify(workDay));
  };
  
  const saveLocal = (dayObj) => {
    localStorage.setItem('workDay', JSON.stringify(dayObj));
  }
  
  const saveSchedule = (hours, val) => {
    if(!localStorage.getItem('workDay')) {
      initLocal();
    }
  
    let workHours = JSON.parse(localStorage.getItem('workDay'));
    workHours[hours] = val
    saveLocal(workHours);
  }
  
  const updateCalendarTasks = (dayObject) => {
    $(".calendar-row").each(function(index) {
      let response = $(this).children("div");
      $(this).children("textarea").text(dayObject[response.text()]);
    })
  }