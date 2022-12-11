<div align="center">
    <img width="200" height="200" src="assets/icon.svg">

    <h1>Javascript Date Formatter</h1>
    <p>File that simplifies formatting of dates</p>
</div>
<hr></hr>

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

This series of commands install the module to the destination folder. Use one or another depending on the EcmaScript (5 or 6) with wich it will be executed.

`Note:` The ES6 version is up to 2 times faster.
<hr></hr>

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
<hr></hr>

<h2 align="center">Usage</h2>
<div align="center">
    <img width="200" height="200" src="assets/profile.jpeg">

    <h1>Independent Programmer</h1>
</div>