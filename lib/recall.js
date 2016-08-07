var tP = require("./tPositive.js")

module.exports = function(expected, actual, options, tPositive){
  if(!tPositive){
    tPositive = tP(expected, actual, options);
  }
  return tPositive/expected.length;
};
