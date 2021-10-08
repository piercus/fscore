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
        recall : 0
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
        recall : 0
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
        recall : 0
      }
    }
  }
  var fscore = (1+betaSquare)*prec*rec/(betaSquare*prec + rec);

  if(format === 'basic'){
    return fscore
  } else if(format === 'detailed'){
    return {
      fscore : fscore,
      tPositive : tPositive,
      precision : prec,
      recall : rec
    };
  }
};
