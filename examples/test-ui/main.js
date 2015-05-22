var coordinates = [0, 0, 1, 0, 1, 1, 0, 1];
var coeffs = [1, 0, 0, 0, 1, 0, 0, 0];
var coeffsInv = [1, 0, 0, 0, 1, 0, 0, 0];
var perspectiveTran;

function setMatrixForCurrentRectangles(){
	var index, rect1Id, rect2Id;
	var rect2 = [];
	for(var i = 0; i < 8; i++){
		if(i % 2 == 0){
			index = 'x' + i/2;
		}
		else{
			index = 'y' + (i-1)/2;
		}
		coordinates[i] = Number( $('#rect1' + index).val() );
		rect2[i] = Number( $('#rect0' + index).val() );
	}
	perspectiveTran = PerspT(rect2, coordinates);
	for(var i = 0; i < perspectiveTran.coeffs.length; i++){
		$('#transMat' + i).html(perspectiveTran.coeffs[i]);
		$('#transMatInv' + i).html(perspectiveTran.coeffsInv[i]);
	}
}

function roundToThousandths(num){
	return Math.round(num*1000) / 1000;
}

function applyTransform(){
	var x = $('#pointX').val();
	var y = $('#pointY').val();
	var res = perspectiveTran.transform(x,y);
	$('#transResult').html('(' + roundToThousandths(res[0]) + ', ' + roundToThousandths(res[1]) + ')');
}

function applyTransformInv(){
	var x = $('#pointXInv').val();
	var y = $('#pointYInv').val();
	var res = perspectiveTran.transformInverse(x,y);
	$('#transResultInv').html('(' + roundToThousandths(res[0]) + ', ' + roundToThousandths(res[1]) + ')');
}