# plott-fingerprint-score

[![build status](https://secure.travis-ci.org/Plott/plott-fingerprint-score.png)](http://travis-ci.org/Plott/plott-fingerprint-score)

Scores signal based on coverage finger print.


### `plott.fingerprintScore(inSignal, refSignal, Callback)`

Scores signal based on coverage finger print and returns score.


### Parameters

| parameter   | type     | description                |
| ----------- | -------- | -------------------------- |
| `inSignal`  | Array    | Input from wifi scan       |
| `refSignal` | Array    | Reference input signals    |
| `Callback`  | Function | maximum coverage of signal |


### Example

```js
plott.fingerprintScore(inSignals, refSignals, function(fingerprint){
   --Do Something
});

//=fingerprint
```


**Returns** `Object`, fingerprint

## Installation

Requires [nodejs](http://nodejs.org/).

```sh
$ npm install plott-fingerprint-score
```

## Tests

```sh
$ npm test
```


