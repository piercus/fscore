# fscore
Nodejs F1 score (also called F-score or F-measure) or any other Fbeta-score

See [more informations about F1 Score](https://en.wikipedia.org/wiki/F1_score)

## install

```bash
npm install fscore
```

## usage

### basic

```javascript
var fscore = require("fscore");

fscore([22, 34, 55, 52, 56, 79, 123, 678, 89, 567], [34, 55, 22, 33, 45]);
// -> 0.4
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
