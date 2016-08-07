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

fscore([22, 34, 55, 52], [34, 55, 22, 33]);
// return xxxx
```

### with tolerance

```javascript
var fscore = require("fscore");

fscore([22, 34, 55, 52], [34.1, 55.3, 22, 33], { tolerance : 0.2 });
// return xxxx
```
### F-Beta score

```javascript
var fscore = require("fscore");

fscore([22, 34, 55, 52], [34, 55, 22, 33], { beta : 0.5 });
// return xxxx
```
