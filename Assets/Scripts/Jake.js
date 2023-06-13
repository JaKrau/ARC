/*
Seven containers with the M/D and day of the week displayed at the top
*/

var date = dayjs().format("M/D");
console.log(date);



var daysContainer = document.getElementById('calendarContainer');

var day1 = document.getElementById('day1');
var day2 = document.getElementById('day2');
var day3 = document.getElementById('day3');
var day4 = document.getElementById('day4');
var day5 = document.getElementById('day5');
var day6 = document.getElementById('day6');
var day7 = document.getElementById('day7');

day3.innerHTML = date;

