var recall = require("../lib/recall.js");
var vows = require("vows");
var assert = require("assert");

//f1_score(y_true, y_pred, labels=None, pos_label=1, average='binary', sample_weight=None)
vows.describe('recall testing').addBatch({
  "3 elements arrays is found in output" : {
    topic : function(){
      return recall([22, 34, 55], [22, 34, 55, 43, 56]);
    },
    "when all expected items are present, recall is 1" : function(res){
      assert.isTrue(res == 1);
    }
  },
  "6 elements array is 50% present in output" : {
    topic : function(){
      return recall([22, 34, 55, 35, 67, 12], [22, 34, 55]);
    },
    "when all 50% expected items are present, recall is 0.5" : function(res){
      assert.isTrue(res == 0.5, "output should be 0.5 and is "+res);
    }
  },
  "3 elements arrays is found in output with tolerance" : {
    topic : function(){
      return recall([22, 34, 55], [22.1, 34.1, 55.1, 43.1, 56.1], {tolerance : 0.2});
    },
    "when all expected items are present, recall is 1" : function(res){
      assert.isTrue(res == 1);
    }
  },
  "6 elements array is 50% present in output with tolerance" : {
    topic : function(){
      return recall([22, 34, 55, 35, 67, 12], [22.12, 33.9, 55.13, 67.3, 12.4], {tolerance : 0.2});
    },
    "when all 50% expected items are present, recall is 0.5" : function(res){
      assert.isTrue(res == 0.5);
    }
  }
}).export(module);
