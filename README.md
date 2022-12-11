<div align="center">
    <img width="200" height="200" src="assets/icon.svg">

    <h1>Javascript Date Formatter</h1>
    <p>File that simplifies formatting of dates</p>
</div>

<h2 align="center">Install</h2>

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

<h2 align="center">Import</h2>

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

<h2 align="center">Usage</h2>
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

<h2 align="center">Examples</h2>

```js
    var Formatter = new UniversalFormatter("%Y %H"); //Formats the year and hour.
    console.log(Formatter.format()); //Prints to console the format for the current Date() object.
```
`Output: 2020 12`
```js
    var Formatter = new DateFormatter("%Y %M"); //Formats the year and month.
    console.log(Formatter.format(new Date("December 17, 1995 03:24:00"))); //Prints to console the format for the passed Date() object.
```
`Output: 2020 December`
```js
    var Formatter = new TimeFormatter("%H %S"); //Formats the hour and second.
    console.log(Formatter.format(new Date("November 20, 1998 03:25:00"))); //Prints to console the format for the passed Date() object.
```
`Output: 12 34`

<h2 align="center">Author</h2>
<div align="center">
    <img width="200" height="200" src="assets/profile.jpg"></img>
</div>
<h1 align="center">Independent Programmer</h1>