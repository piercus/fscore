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
        tPositiveItems: []
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
        tPositiveItems: []
      }
    }
  }


      //for effectiveness, we calculate tPositive only once
  var tPositive = tP(expected, actual, options),
      rec = recall(actual, expected, options, tPositive),
      prec = precision(actual, expected, options, tPositive);
      
  if(betaSquare*prec + rec === 0){
    if(format === 'basic'){
      return 0;
    } else if(format === 'detailed'){
      return {
        fscore : 0,
        tPositive : 0,
        precision : 0,
        recall : 0,
        tPositiveItems: []
      }
    }
  }


  if(format === 'basic'){
    var fscore = (1+betaSquare)*prec*rec/(betaSquare*prec + rec);

    return fscore
  } else if(format === 'detailed'){
    var fscore = (1+betaSquare)*prec.precision*rec.recall/(betaSquare*prec.precision + rec.recall);
    return {
      fscore : fscore,
      tPositive : tPositive.length,
      tPositiveIndexes: tPositive,
      fPositivesIndexes: prec.fPositivesIndexes,
      fNegativesIndexes: rec.fNegativesIndexes,
      precision : prec.precision,
      recall : rec.recall
    };
  }
};
