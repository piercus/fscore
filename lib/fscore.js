var tP = require("./tPositive.js")
var recall = require("./recall.js")
var precision = require("./precision.js")

module.exports = function(expected, actual, options){
  if( !Array.isArray(expected) || !Array.isArray(actual)){
    throw(new Error("fscore function must have numerical arrays as first arguments"));
  }
  var beta = (options && options.beta) || 1,
      betaSquare = beta*beta,
      format = (options && options.format) || 'basic';
  
  if(expected.length == 0){
    if(format === 'basic'){
      return 0;
    } else if(format === 'detailed'){
      return {
        fscore : 0,
        tPositive : 0,
        precision : 0,
        recall : 0,
        tPositiveIndexes: [],
        fPositiveIndexes: actual.map((_, index) => index),
        fNegativeIndexes: expected.map((_, index) => index)
      }
    }
  }

  if(actual.length == 0){
    if(format === 'basic'){
      return 0;
    } else if(format === 'detailed'){
      return {
        fscore : 0,
        tPositive : 0,
        precision : 0,
        recall : 0,
        tPositiveIndexes: [],
        fPositiveIndexes: actual.map((_, index) => index),
        fNegativeIndexes: expected.map((_, index) => index)
      }
    }
  }


      //for effectiveness, we calculate tPositive only once
  var tPositive = tP(expected, actual, options),
      rec = recall(expected, actual, options, tPositive),
      prec = precision(expected, actual, options, tPositive);
      
  if(betaSquare*prec + rec === 0){
    if(format === 'basic'){
      return 0;
    } else if(format === 'detailed'){
      return {
        fscore : 0,
        tPositive : 0,
        precision : 0,
        recall : 0,
        tPositiveIndexes: [],
        fPositiveIndexes: actual.map((_, index) => index),
        fNegativeIndexes: expected.map((_, index) => index)
      }
    }
  }


  if(format === 'basic'){
    const denom = (betaSquare*prec + rec);
    if(denom === 0){
      return 0
    }
    var fscore = (1+betaSquare)*prec*rec/denom;

    return fscore
  } else if(format === 'detailed'){
    const denom = (betaSquare*prec.precision + rec.recall);
    let fscore;
    if(denom === 0){
      fscore = 0;
    } else {
      fscore = (1+betaSquare)*prec.precision*rec.recall/denom;
    }
    return {
      fscore : fscore,
      tPositive : tPositive.length,
      tPositiveIndexes: tPositive,
      fPositiveIndexes: prec.fPositiveIndexes,
      fNegativeIndexes: rec.fNegativeIndexes,
      precision : prec.precision,
      recall : rec.recall
    };
  }
};
