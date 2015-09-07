/**
 * Scores signal based on coverage finger print and returns score.
 *
 * @module plott/fingerprintScore
 * @category helper
 * @param {Array} inSignal Input from wifi scan
 * @param {Array} refSignal Reference input signals
 * @param {Function} Callback maximum coverage of signal
 * @return {Object} fingerprint
 * @example
 * plott.fingerprintScore(inSignals, refSignals, function(fingerprint){
 *    --Do Something
 *});
 *
 * //=fingerprint
 */

module.exports = function (inSignals, refSignals, callback){
  if (!Array.isArray(inSignals)) throw new Error ('Input signals must be an array');
  if (!Array.isArray(refSignals)) throw new Error ('Reference signals must be an array');


	var apScore,
      fingerPrint = {
  			score: 0,
  			input: inSignals.length,
        ref: refSignals.length,
  			matches: 0
  		};

		inSignals.forEach(function(ap){
			refSignals.forEach(function(ref){
				if (ap.mac === ref.mac && ap.channel === ref.channel){
					fingerPrint.matches++;
					apScore = Math.abs(ap.signal_level - ref.signal_level);
					fingerPrint.score+= apScore;
				}
			});
		});
    fingerPrint.pMatchIn = fingerPrint.input ? parseFloat(((fingerPrint.matches / fingerPrint.input) * 100).toFixed(2)) : 0;
    fingerPrint.pMatchRef = parseFloat(((fingerPrint.matches / fingerPrint.ref) * 100).toFixed(2));
		return callback(fingerPrint);
}
