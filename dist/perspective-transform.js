
// If the user is not including math.js already, add shim so this library works. Removes dependency on math.js

(function(window) {
	if(window.math) {
		return
	}

	else{
		console.log('no math.js included!!');
	}

}(window));


(function(global, factory) {
	if(typeof exports === 'object' && typeof module !== undefined){
		module.exports = factory();
	}
	else if(typeof define === 'function' && define.amd){
		define(factory);
	}
	else{
		global.perspT = factory();
	}
}(this, function() {
	'use strict';

	function getArrayFromMatSize8(mat){
		var array = [math.subset(mat, math.index(0)), math.subset(mat, math.index(1)), math.subset(mat, math.index(2)),
		math.subset(mat, math.index(3)), math.subset(mat, math.index(4)), math.subset(mat, math.index(5)),
		math.subset(mat, math.index(6)), math.subset(mat, math.index(7))];
		return array;
	}

	function getNormalizationCoefficients(srcPts, dstPts, isInverse){
		if(isInverse){
			var tmp = dstPts;
			dstPts = srcPts;
			srcPts = tmp;
		}
		var r1 = [srcPts[0], srcPts[1], 1, 0, 0, 0, -1*dstPts[0]*srcPts[0], -1*dstPts[0]*srcPts[1]];
		var r2 = [0, 0, 0, srcPts[0], srcPts[1], 1, -1*dstPts[1]*srcPts[0], -1*dstPts[1]*srcPts[1]];
		var r3 = [srcPts[2], srcPts[3], 1, 0, 0, 0, -1*dstPts[2]*srcPts[2], -1*dstPts[2]*srcPts[3]];
		var r4 = [0, 0, 0, srcPts[2], srcPts[3], 1, -1*dstPts[3]*srcPts[2], -1*dstPts[3]*srcPts[3]];
		var r5 = [srcPts[4], srcPts[5], 1, 0, 0, 0, -1*dstPts[4]*srcPts[4], -1*dstPts[4]*srcPts[5]];
		var r6 = [0, 0, 0, srcPts[4], srcPts[5], 1, -1*dstPts[5]*srcPts[4], -1*dstPts[5]*srcPts[5]];
		var r7 = [srcPts[6], srcPts[7], 1, 0, 0, 0, -1*dstPts[6]*srcPts[6], -1*dstPts[6]*srcPts[7]];
		var r8 = [0, 0, 0, srcPts[6], srcPts[7], 1, -1*dstPts[7]*srcPts[6], -1*dstPts[7]*srcPts[7]];

		var matA = [r1, r2, r3, r4, r5, r6, r7, r8];
		var matB = dstPts;
	
		try{
	    	// var matC = math.inv(math.multiply(math.transpose(matA), matA));
	    	var matC = numeric.inv(numeric.dot(numeric.transpose(matA), matA));
		}catch(e){
	    	console.log(e);
	    	return [1,0,0,0,1,0,0,0];
		}
		// var matD = math.multiply(matC, math.transpose(matA));
		// var matX = math.multiply(matD, matB);

		var matD = numeric.dot(matC, numeric.transpose(matA));
		var matX = numeric.dot(matD, matB);

		// return getArrayFromMatSize8(matX);
		console.log(matX);
		return matX;
	}

	function PerspT(srcPts, dstPts){
		if(window === this || this === undefined) {
			return new PerspT(srcPts, dstPts);
		}

		this.srcPts = srcPts;
		this.dstPts = dstPts;
		this.coeffs = getNormalizationCoefficients(this.srcPts, this.dstPts, false);
		this.coeffsInv = getNormalizationCoefficients(this.srcPts, this.dstPts, true);

		return this;
	}

	PerspT.prototype = {
		transform: function(x,y) {
			var coordinates = [];
			coordinates[0] = (this.coeffs[0]*x + this.coeffs[1]*y + this.coeffs[2]) / (this.coeffs[6]*x + this.coeffs[7]*y + 1);
			coordinates[1] = (this.coeffs[3]*x + this.coeffs[4]*y + this.coeffs[5]) / (this.coeffs[6]*x + this.coeffs[7]*y + 1);
			return coordinates;
		},

		transformInverse: function(x,y) {
			var coordinates = [];
			coordinates[0] = (this.coeffsInv[0]*x + this.coeffsInv[1]*y + this.coeffsInv[2]) / (this.coeffsInv[6]*x + this.coeffsInv[7]*y + 1);
			coordinates[1] = (this.coeffsInv[3]*x + this.coeffsInv[4]*y + this.coeffsInv[5]) / (this.coeffsInv[6]*x + this.coeffsInv[7]*y + 1);
			return coordinates;
		}
	};

	return PerspT;

}));