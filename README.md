# node-julius-net

[![Build Status](https://travis-ci.org/selaux/node-julius-net.png)](https://travis-ci.org/selaux/node-julius-net)
[![Build Status](https://david-dm.org/selaux/node-julius-net.png)](https://david-dm.org/selaux/node-julius-net)

Use the julius speech recognition engine in node through the julius module interface.

## Installation

```bash
npm install node-julius-net
```

## Usage

Start julius with the module parameter: `julius -C julius.jconf -module` 

```javascript
var Julius = require('julius-net');
julius = new Julius({
    host: 'some.host', // default: 127.0.0.1
    port: 1234 // default: 10500
});
julius.on('recognitionSuccess', function (recognition) {
    console.log(recognition);
});
```

## Events

`startProcessing`: Triggered when julius is ready to process data

`startRecognition`: Triggered when speech is detected

`endRecognition`: Triggered when speech ended

`recognitionSuccess`: A match was found

`recognitionFail`: No match was found

## Changelog

#### 0.0.1: 2013-12-29

* Initial release

## License

(The MIT License)

Copyright (c) 2013 Stefan Lau <github@stefanlau.com>

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the 'Software'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
