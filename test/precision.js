var precision = require("../lib/precision.js");
var vows = require("vows");
var assert = require("assert");

//f1_score(y_true, y_pred, labels=None, pos_label=1, average='binary', sample_weight=None)
vows.describe('precision testing').addBatch({
  "3 elements arrays is found in output" : {
    topic : function(){
      return precision([22, 34, 55, 43, 56], [22, 34, 55]);
    },
    "when all expected items are present, precision is 1" : function(res){
      assert.isTrue(res == 1);
    }
  },
  "50% of output was expected" : {
    topic : function(){
      return precision([22, 34, 55], [22, 34, 55, 35, 67, 12]);
    },
    "when all 50% expected items are present, precision is 0.5" : function(res){
      assert.isTrue(res == 0.5);
    }
  },
  "3 elements arrays is found in output with tolerance" : {
    topic : function(){
      return precision([22, 34, 55, 43, 56], [22.1, 34.1, 55.1], {tolerance : 0.2});
    },
    "when all expected items are present, precision is 1" : function(res){
      assert.isTrue(res == 1);
    }
  },
  "50% of output was expected with tolerance" : {
    topic : function(){
      return precision([22, 34, 55, 67, 12], [22.1, 34.2, 55.1, 67.3, 12.4, 69], {tolerance : 0.2});
    },
    "when all 50% expected items are present, precision is 0.5" : function(res){
      assert.isTrue(res == 0.5, "output should be 0.5 and is "+res);
    }
  }
}).export(module);
