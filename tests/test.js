var fingerPrintScore = require('../'),
    fs = require('fs'),
    test = require('tape');


    test('fingerprint test', function (t){
      //Refernece
      var refSignals = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/refSignals.json'));

      //Inputs
      var inTest1 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/scan.json'));
      var inTest2 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/test2.json'));
      var inTest3 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/test3.json'));
      var inTest4 = JSON.parse(fs.readFileSync(__dirname+'/fixtures/in/test4.json'));


      fingerPrintScore(inTest1.properties.wifi, refSignals.properties.wifi, function(fingerprint){
          var result =  { input: 2, matches: 2, pMatchIn: 100, pMatchRef: 100, ref: 2, score: 17 }
        t.deepEqual(fingerprint, result, 'Input and reference have even number on aps with different RSSI valuse');
      });

      fingerPrintScore(inTest2.properties.wifi, refSignals.properties.wifi, function(fingerprint){
          var result = { input: 1, matches: 1, pMatchIn: 100, pMatchRef: 50, ref: 2, score: 3 }
        t.deepEqual(fingerprint, result, 'Input has less aps than reference');
      });

      fingerPrintScore(inTest3.properties.wifi, refSignals.properties.wifi, function(fingerprint){
          var result = { input: 0, matches: 0, pMatchIn: 0, pMatchRef: 0, ref: 2, score: 0 }
        t.deepEqual(fingerprint, result, 'Input has has empty arry of aps');
      });

      fingerPrintScore(refSignals.properties.wifi, refSignals.properties.wifi, function(fingerprint){
          var result = { input: 2, matches: 2, pMatchIn: 100, pMatchRef: 100, ref: 2, score: 0 }
        t.deepEqual(fingerprint, result, 'Input and reference are equal "Prefect Match"');
      });

      fingerPrintScore(inTest4.properties.wifi, refSignals.properties.wifi, function(fingerprint){
          var result =  { input: 3, matches: 2, pMatchIn: 66.67, pMatchRef: 100, ref: 2, score: 4 }
        t.deepEqual(fingerprint, result, 'Input has larger array than the reference');
      });

      t.throws(function(){
        fingerPrintScore(inTest1, refSignals.properties.wifi);
      }, 'Array required - Input Singal must be array');

      t.throws(function(){
        fingerPrintScore(inTest1.properties.wifi, refSignals);
      }, 'Array required - Reference Signals must be array');

      t.end();
    });
