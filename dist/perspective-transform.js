

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

	function getNormalizationCoefficients(srcPts, dstPts){
		var r1 = [srcPts[0], srcPts[1], 1, 0, 0, 0, -1*dstPts[0]*srcPts[0], -1*dstPts[0]*srcPts[1]];
		var r2 = [0, 0, 0, srcPts[0], srcPts[1], 1, -1*dstPts[1]*srcPts[0], -1*dstPts[1]*srcPts[1]];
		var r3 = [srcPts[2], srcPts[3], 1, 0, 0, 0, -1*dstPts[2]*srcPts[2], -1*dstPts[2]*srcPts[3]];
		var r4 = [0, 0, 0, srcPts[2], srcPts[3], 1, -1*dstPts[3]*srcPts[2], -1*dstPts[3]*srcPts[3]];
		var r5 = [srcPts[4], srcPts[5], 1, 0, 0, 0, -1*dstPts[4]*srcPts[4], -1*dstPts[4]*srcPts[5]];
		var r6 = [0, 0, 0, srcPts[4], srcPts[5], 1, -1*dstPts[5]*srcPts[4], -1*dstPts[5]*srcPts[5]];
		var r7 = [srcPts[6], srcPts[7], 1, 0, 0, 0, -1*dstPts[6]*srcPts[6], -1*dstPts[6]*srcPts[7]];
		var r8 = [0, 0, 0, srcPts[6], srcPts[7], 1, -1*dstPts[7]*srcPts[6], -1*dstPts[7]*srcPts[7]];

		var matA = math.matrix([r1, r2, r3, r4, r5, r6, r7, r8]);
		var matB = math.matrix(dstPts);
	
		try{
	    	var matC = math.inv(math.multiply(math.transpose(matA), matA));
		}catch(e){
	    	console.log(e);
	    	return [1,0,0,0,1,0,0,0];
		}
		var matD = math.multiply(matC, math.transpose(matA));
		var matX = math.multiply(matD, matB);

		return getArrayFromMatSize8(matX);
	}

	function getNormalizationInverseCoefficients(srcPts, dstPts){

		var r1 = [dstPts[0], dstPts[1], 1, 0, 0, 0, -1*srcPts[0]*dstPts[0], -1*srcPts[0]*dstPts[1]];
		var r2 = [0, 0, 0, dstPts[0], dstPts[1], 1, -1*srcPts[1]*dstPts[0], -1*srcPts[1]*dstPts[1]];
		var r3 = [dstPts[2], dstPts[3], 1, 0, 0, 0, -1*srcPts[2]*dstPts[2], -1*srcPts[2]*dstPts[3]];
		var r4 = [0, 0, 0, dstPts[2], dstPts[3], 1, -1*srcPts[3]*dstPts[2], -1*srcPts[3]*dstPts[3]];
		var r5 = [dstPts[4], dstPts[5], 1, 0, 0, 0, -1*srcPts[4]*dstPts[4], -1*srcPts[4]*dstPts[5]];
		var r6 = [0, 0, 0, dstPts[4], dstPts[5], 1, -1*srcPts[5]*dstPts[4], -1*srcPts[5]*dstPts[5]];
		var r7 = [dstPts[6], dstPts[7], 1, 0, 0, 0, -1*srcPts[6]*dstPts[6], -1*srcPts[6]*dstPts[7]];
		var r8 = [0, 0, 0, dstPts[6], dstPts[7], 1, -1*srcPts[7]*dstPts[6], -1*srcPts[7]*dstPts[7]];

		var matA = math.matrix([r1, r2, r3, r4, r5, r6, r7, r8]);
		var matB = math.matrix(srcPts);
	
		try{
	    	var matC = math.inv(math.multiply(math.transpose(matA), matA));
		}catch(e){
	    	console.log(e);
	    	return [1,0,0,0,1,0,0,0];
		}
		var matD = math.multiply(matC, math.transpose(matA));
		var matX = math.multiply(matD, matB);

		return getArrayFromMatSize8(matX);
	}

	function PerspT(srcPts, dstPts){
		if(window === this || this === undefined) {
			return new PerspT(srcPts, dstPts);
		}

		this.srcPts = srcPts;
		this.dstPts = dstPts;
		this.coeffs = getNormalizationCoefficients(this.srcPts, this.dstPts);
		this.coeffsInv = getNormalizationInverseCoefficients(this.srcPts, this.dstPts);

		return this;
	}

	PerspT.prototype = {
		transform: function(x,y) {
			var coordinates = [];
			coordinates[0] = (this.coeffs[0]*x + this.coeffs[1]*y + this.coeffs[2]) / (this.coeffs[6]*x + this.coeffs[7]*y + 1);
			coordinates[1] = (this.coeffs[3]*x + this.coeffs[4]*y + this.coeffs[5]) / (this.coeffs[6]*x + this.coeffs[7]*y + 1);
			return coordinates;
		},

		transformInverse: function() {
			var coordinates = [];
			coordinates[0] = (this.coeffsInv[0]*x + this.coeffsInv[1]*y + this.coeffsInv[2]) / (this.coeffsInv[6]*x + this.coeffsInv[7]*y + 1);
			coordinates[1] = (this.coeffsInv[3]*x + this.coeffsInv[4]*y + this.coeffsInv[5]) / (this.coeffsInv[6]*x + this.coeffsInv[7]*y + 1);
			return coordinates;
		}
	};

	return PerspT;

}));