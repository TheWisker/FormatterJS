import {DateFormatter} from "../out/ES6/module/Formatter.js";
var Formatter = new DateFormatter("%Y_%B"); //Formats the year and month.
console.log(Formatter.format(new Date("December 17, 1995 03:24:00"))); //Prints to console the format for the passed Date() object.