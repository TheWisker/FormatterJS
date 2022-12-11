<div align="center">
    <img width="200" height="200" src="assets/icon.svg">
</div>
<h1 align="center">Javascript Date Formatter</h1>
<p align="center">Module that simplifies the formatting of dates</p>

<h2 align="center">Installation</h2>

<h3>ES5</h3>

```bash
git clone https://github.com/TheWisker/FormatterJS
cd FormatterJS
cp -a ./out/ES5/classes/. ../destination/
cd ..
rm -fr FormatterJS
```

<h3>ES6</h3>

```bash
git clone https://github.com/TheWisker/FormatterJS
cd FormatterJS
cp -a ./out/ES6/module/. ../destination/
cd ..
rm -fr FormatterJS
```

This series of commands install the module to the destination folder. Use one or another depending on the ES version (5 or 6) with wich it will be executed.

`Note: The ES6 version is up to 2 times faster.`

<h2 align="center">Importing</h2>

<h3>ES5</h3>

Just add a script tag refering to the `Formatter` file **before** any script tag that depends on it.

```html
<script type="text/javascript" src="/destination/Formatter.js"></script>
<script type="text/javascript" src="/YourScript.js"></script>
```

<h3>ES6</h3>

Just add a import statement targeting the `Formatter` file with the classes to import between the brackets.

```js
import {UniversalFormatter, DateFormatter, TimeFormatter} from "/destination/Formatter.js";
```

<h2 align="center">Module Usage</h2>
Create a new instance of the desired formatter:

|Formatter|Constructor|Description|
|:-------:|:---------:|:----------|
|**`UniversalFormatter`**|`(Format: string, UTC: boolean)`|Formats date and time altogether|
|**`DateFormatter`**|`(Format: string, UTC: boolean)`|Formats only date|
|**`TimeFormatter`**|`(Format: string, UTC: boolean)`|Formats only time|

Then call the format function on the object and pass an optional date parameter.

|Function|Parameters|Default|Description|
|:------:|:--------:|:------|:----------|
|**`format`**|`(date: Date())`|`new Date()`|Formats the date object|

<h2 align="center">Formats</h2>
All the avaible formats equivalencies.

<h3>Misc</h3>

|Format|Type|Description|Example|
|:----:|:--:|:----------:|:----:|
|**`%%`**|`Escape Sequence`|Escapes the % character|%|

<h3>Date</h3>

|Format|Type|Description|Example|
|:----:|:--:|:----------:|:----:|
|**`%Y`**|`Year`|The year|2022|
|**`%y`**|`Year`|The short year|22 or 022|
|**`%J`**|`Year`|The day of the year|364|
|**`%M`**|`Month`|The month number|02|
|**`%m`**|`Month`|The month number|2|
|**`%B`**|`Month`|The month name|February|
|**`%b`**|`Month`|The month short name|Feb|
|**`%D`**|`Day`|The day of the month|08|
|**`%d`**|`Day`|The day of the month|8|
|**`%A`**|`Weekday`|The name of the day|Monday|
|**`%a`**|`Weekday`|The name of the day|Mon|
|**`%W`**|`Weekday`|The day of the week|1|

<h3>Time</h3>

|Format|Type|Description|Example|
|:----:|:--:|:----------:|:----:|
|**`%H`**|`Hour`|The hour in 24 format|20|
|**`%h`**|`Hour`|The hour in 24 format|20|
|**`%I`**|`Hour`|The hour in 12 format|08|
|**`%i`**|`Hour`|The hour in 12 format|08|
|**`%K`**|`Minutes`|The minutes|06|
|**`%k`**|`Minutes`|The minutes|6|
|**`%S`**|`Seconds`|The seconds|04|
|**`%s`**|`Seconds`|The seconds|4|
|**`%L`**|`Decisecond`|The decisecond|2|
|**`%Q`**|`Centisecond`|The centiseconds|02|
|**`%q`**|`Centisecond`|The centiseconds|2|
|**`%F`**|`Milisecond`|The miliszeconds|06|
|**`%f`**|`Milisecond`|The miliszeconds|6|
|**`%P`**|`Timestamp`|The timestamp|AM|
|**`%p`**|`Timestamp`|The timestamp|am|
|**`%f`**|`Timezone Offset`|The timezone offset|+02|
|**`%f`**|`Timezone Offset`|The timezone offset|+2|

<h2 align="center">Examples</h2>

```js
var Formatter = new UniversalFormatter("%Y %H"); //Formats the year and hour.
console.log(Formatter.format()); //Prints to console the format for the current Date() object.
```
`Output: 2020 12`
```js
var Formatter = new DateFormatter("%Y_%B"); //Formats the year and month.
console.log(Formatter.format(new Date("December 17, 1995 03:24:00"))); //Prints to console the format for the passed Date() object.
```
`Output: 1995_December`
```js
var Formatter = new TimeFormatter("(%H-%S)"); //Formats the hour and second.
console.log(Formatter.format(new Date("November 20, 1998 03:25:00"))); //Prints to console the format for the passed Date() object.
```
`Output: (03-25)`

<h2 align="center">Author</h2>
<div align="center">
    <img width="200" height="200" src="assets/profile.png"></img>
</div>
<h4 align="center">TheWisker</h4>