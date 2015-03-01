LibYoJS
=======

## What is this?

This is my JavaScript code that calls Yo API.

## How to use

1. load `libyo.js` or `libyo.min.js`
1. call `LibYo.getInstance`
   ```javascript
   var yo = LibYo.getInstance("<api token>");
   ```
1. then call yo or yoAll
   ```javascript
   yo.yo("HOGE", "http://example.com/sample.jpg"); // yo with ling
   yo.yoAll();
   ```


