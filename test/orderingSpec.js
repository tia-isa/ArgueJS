define(['argue', 'chai'], function(__, chai) {
  var should = chai.should();

  describe('argument excess', function() {
    
    it('should throw an Error when arguments exceed', function() {
      
      function upper() {
        return __({});
      }
      
      (function(){
        upper("value");
      }).should.throw('Too many arguments');
        
    });
    
  });
  describe('optional parameters', function() {
  
    describe('optional parameters', function() {
  
      it('should accept both defined and not defined arguments', function() {
        function upper() {
          return __({
            param : [String]
          });
        }
  
        //right:
        var emptyCall = upper(); 
        emptyCall.should.have.ownProperty('param')
        should.not.exist(emptyCall.param);
        
        var stringCall = upper("value"); 
        should.equal(stringCall.param, "value");
  
        //wrong:
        (function(){
          upper(7);
        }).should.throw('Incompatible type signature');
  
        (function(){
          upper("value", 7);
        }).should.throw('Too many arguments');
      });
  
      it('should hit the target among similars', function() {
        function range() {
          return __({
            start : [Number, 1],
            stop : Number,
            step : [Number, 1]
          });
        }
  
        //right:
        var oneArg = range(7);
        should.equal(oneArg.start, 1); 
        should.equal(oneArg.stop, 7);
        should.equal(oneArg.step, 1);
        
        var twoArg = range(3, 7);
        should.equal(twoArg.start, 3); 
        should.equal(twoArg.stop, 7);
        should.equal(twoArg.step, 1);
        
        var threeArg = range(3, 7, 2);
        should.equal(threeArg.start, 3); 
        should.equal(threeArg.stop, 7);
        should.equal(threeArg.step, 2);
  
        //wrong:
        (function(){
          range(3, 7, 1, 0);
        }).should.throw('Too many arguments');
      });
  
      it('should not worry about not set optional arguments', function() {
        function upper() {
          return __({
            first : Number,
            second : [String],
            third : [String],
            fourth : [String],
            fifth : [String],
            sixth : [Number]
          });
        }
  
        //right:
        var numberAlone = upper(7);
        numberAlone.first.should.be.equal(7)
        numberAlone.should
          .have.ownProperty('second')
          .have.ownProperty('third')
          .have.ownProperty('fourth')
          .have.ownProperty('fifth')
          .have.ownProperty('sixth');
        should.not.exist(numberAlone.second);
        should.not.exist(numberAlone.third);
        should.not.exist(numberAlone.fourth);
        should.not.exist(numberAlone.fifth);
        should.not.exist(numberAlone.sixth);
        
        var numberStrings = upper(7, "value", "value", "value", "value", 7);
        numberStrings.first.should.be.equal(7);
        numberStrings.second.should.be.equal("value");
        numberStrings.third.should.be.equal("value");
        numberStrings.fourth.should.be.equal("value");
        numberStrings.fifth.should.be.equal("value");
        numberStrings.sixth.should.be.equal(7);
        
        //wrong:
        (function(){
          upper("value", 7);
        }).should.throw("parameter 'first' waiting for a Number argument but received a String");
        
        (function(){
          upper(7, true);
        }).should.throw('Incompatible type signature');
        
        
        (function(){
          upper(7, 7, 7);
        }).should.throw('Incompatible type signature');
      });
  
    });
    
    describe('default values', function() {
  
      it('should accept both defined and not defined arguments', function() {
        function upper() {
          return __({
            param : [Number, 3]
          });
        }
  
        //right:
        should.equal(upper().param, 3);
        
        should.equal(upper(7).param, 7);
  
        //wrong:
        (function(){
          upper('unknown');
        }).should.throw("Incompatible type signature");
      });
  
    });
    
  });
});
