import {TimeFormatter} from "../out/ES6/module/Formatter.js";
var Formatter = new TimeFormatter("(%H-%S)"); //Formats the hour and second.
console.log(Formatter.format(new Date("November 20, 1998 03:25:00"))); //Prints to console the format for the passed Date() object.