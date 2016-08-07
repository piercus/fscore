var tP = require("./tPositive.js")
var recall = require("./recall.js")
var precision = require("./precision.js")

module.exports = function(expected, actual, options){
  if( !Array.isArray(expected) || !Array.isArray(actual)){
    throw(new Error("fscore function must have numerical arrays as first arguments"));
  }

  if(expected.length == 0){
    return 0;
  }

  if(actual.length == 0){
    return 0;
  }

  var beta = (options && options.beta) || 1,
      betaSquare = beta*beta,
      //for effectiveness, we calculate tPositive only once
      tPositive = tP(expected, actual, options),
      rec = recall(actual, expected, options, tPositive),
      prec = precision(actual, expected, options, tPositive);

  if(betaSquare*prec + rec === 0){
    return 0;
  }
  return (1+betaSquare)*prec*rec/(betaSquare*prec + rec);
};
