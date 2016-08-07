var fscore = require("../lib/fscore.js");
var vows = require("vows");
var assert = require("assert");

//f1_score(y_true, y_pred, labels=None, pos_label=1, average='binary', sample_weight=None)
vows.describe('Fscore testing').addBatch({
  "3 elements arrays are same" : {
    topic : function(){
      return fscore([22, 34, 55], [22, 34, 55]);
    },
    "when same, fscore is 1" : function(res){
      assert.isTrue(res == 1, "output should be 1 and is "+res);
    }
  },
  "3 elements arrays are same but in different order" : {
    topic : function(){
      return fscore([22, 34, 55], [34, 55, 22]);
    },
    "when same (even is different orders), fscore is 1" : function(res){
      assert.isTrue(res == 1, "output should be 1 and is "+res);
    }
  },
  "4 elements arrays are same but in different order" : {
    topic : function(){
      return fscore([22, 34, 55, 52], [34, 55, 52, 22]);
    },
    "when same (even is different orders), fscore is 1" : function(res){
      assert.isTrue(res == 1, "output should be 1 and is "+res);
    }
  },
  "3 elements array are different" : {
    topic : function(){
      return fscore([22, 34, 55], [23, 37, 52]);
    },
    "when different, fscore is 0" : function(res){
      assert.isTrue(res == 0, "output should be 0 and is "+res);
    }
  },
  "3 elements array are same with tolerance" : {
    topic : function(){
      return fscore([22, 34, 55], [22.1, 33.8, 55.2], {tolerance : 0.2});
    },
    "when same, fscore is 1" : function(res){
      assert.isTrue(res == 1, "output should be 1 and is "+res);
    }
  },
  "3 elements array are different with tolerance" : {
    topic : function(){
      return fscore([22, 34, 55], [22.3, 33.6, 55.2001], {tolerance : 0.2});
    },
    "when different, fscore is 0" : function(res){
      assert.isTrue(res == 0, "output should be 0 and is "+res);
    }
  },
  "5 elements array vs 10 element array are partially different" : {
    topic : function(){
      return fscore([22, 34, 55, 52, 56, 79, 123, 678, 89, 567], [34, 55, 22, 33, 45]);
    },
    "when partially different, fscore is 0" : function(res){
      assert.isTrue(res == 0.4, "output should be 0.4 and is "+res);
    }
  },
  "5 elements array vs 10 element array are partially different with beta = 0.5" : {
    topic : function(){
      return fscore([22, 34, 55, 52, 56], [34, 55, 22, 33, 45], { beta : 0.5 });
    },
    "when partially different, fscore is 0" : function(res){
      assert.isTrue(res == 0.6, "output should be 0.6 and is "+res);
    }
  }
}).export(module);
