var tP = require("./tPositive.js")

module.exports = function(expected, actual, options, tPositive){
  if(typeof(tPositive) !== "number"){
    tPositive = tP(expected, actual, options);
  }
  if(options && options.format === 'detailed'){
    const tPositiveExpectedItems = tPositive.map(a => a[0]);
    return {
      tPositiveIndexes: tPositive,
      fNegativeIndexes: expected.map((value, index) => ({value, index})).filter(({index}) => !tPositiveExpectedItems.includes(index)).map(({index}) => index),
      recall: tPositive.length / expected.length
    }
  } else {
    return tPositive/expected.length;
  }
};
