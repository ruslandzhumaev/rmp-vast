'use strict';

var ADTAG = 'https://www.radiantmediaplayer.com/vast/tags/inline-linear-error-media.xml';


describe("Test for ErrorMediaSpec", function () {

  var id = 'rmpPlayer';
  var container = document.getElementById(id); 
  var rmpVast = new RmpVast(id);
  var fw = rmpVast.getFW();
  var title = document.getElementsByTagName('title')[0];


  it("should load adTag and trigger a 401 error", function (done) {
    var validSteps = 0;

    var _incrementAndLog = function (event) {
      validSteps++;
      if (event && event.type) {
        fw.log('RMP-VAST-TEST: ' + event.type);
      }
    };

    container.addEventListener('adtagloaded', function (e) {
      _incrementAndLog(e);
    });

    container.addEventListener('aderror', function (e) {
      _incrementAndLog(e);
      expect(rmpVast.getAdVastErrorCode()).toBe(401);
    });

    container.addEventListener('addestroyed', function (e) {
      _incrementAndLog(e);
      expect(validSteps).toBe(3);
      if (validSteps === 3) {
        title.textContent = 'Test completed';
      }
      setTimeout(function () {
        done();
      }, 500);
    });

    rmpVast.loadAds(ADTAG);
    
  });


});