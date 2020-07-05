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
}
// Display Current Date and Time in Header

let getDateAndTime = () => {
    $("#currentDay").text(moment().format("dddd, MMMM Do YYYY, h:mm:ss a"))
}
getDateAndTime();
// Update time without refreshing page
setInterval(getDateAndTime, 1000);