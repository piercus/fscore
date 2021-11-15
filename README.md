[!Travis build status](https://travis-ci.org/piercus/fscore.svg?branch=master)
# fscore
Nodejs F1 score (also called F-score or F-measure) or any other Fbeta-score

See [more informations about F1 Score](https://en.wikipedia.org/wiki/F1_score)

## install

```bash
npm install fscore
```

## usage

```javascript
fscore(actual, expected, options);
```

### basic

```javascript
var fscore = require("fscore");

fscore([22, 34, 55, 52, 56, 79, 123, 678, 89, 567], [34, 55, 22, 33, 45]);
// -> 0.4
```

### with strings

```javascript
var fscore = require("fscore");

fscore(['foo', 'bar', '55', '52', '56', '79', '123', '678', '89', '567'], ['bar', '55', 'foo', '33', '45']);
// returns 0.4
```

### with tolerance

```javascript
var fscore = require("fscore");

fscore([22, 34, 55, 52, 56, 79, 123, 678, 89, 567], [34.2, 55.1, 21.9, 32.8, 45.1], { tolerance : 0.2 });
// returns 0.4
```
### F-Beta score

```javascript
var fscore = require("fscore");

fscore([22, 34, 55, 52, 56], [34, 55, 22, 33, 45], { beta : 0.5 });
// return 0.6
```
### Detailed result

```javascript
var fscore = require("fscore");

fscore([22, 34, 55, 52, 56], [34, 55, 22, 33, 45], { beta : 0.5, format : 'detailed' });
// return 0.6
```

## Options

* `tolerance` : Define a tolerance for the matching between actual and expected, default is `null`, will raise an error when using strings
* `beta` : Beta parameter of the formula (See [Fscore on wikipedia](https://en.wikipedia.org/wiki/F1_score)), default is `1`
* `format` : output format available possible values are `basic`, `detailed`, default is `basic`
  * `basic` only outputs the fscore
  * `detailed` outputs
    ```javascript
    {
      fscore : 0.4, //the fscore
      tPositive : 2, //number of true positives
      precision : 0.4, //precision
      recall : 0.4, //recall
      tPositiveIndexes: [[0, 0], [1, 1]], // indexes of true positives matches
      fNegativeIndexes: [2, 3],// indexes of false negatives
      fPositiveIndexes: [2, 3] // indexes of false positives
    }
    ```
