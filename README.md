# perspective-transform

A small JavaScript library for creating and applying perspective transforms. A perspective transform can be used to 
map one 2D quadrilateral to another, given the corner coordinates for the source and destination quadrilaterals. 
[Here](http://xenia.media.mit.edu/~cwren/interpolator/) is a useful resource for learning more about perspective 
transforms and the math behind them.

## Features
- Create functions to map points from one arbitrary quadrilateral to another and vice versa with the inverse
- Access the transformation matrix and its inverse (useful for transforming elements with CSS3)
- No external dependencies

## Install

    $ bower install perspective-transform --save

## Basic Usage

###Browser

```html
<script type="text/javascript" src="async.js"></script>
<script type="text/javascript">
  
  var srcCorners = [];
  var dstCorners = [];
  var perspT = PerspT(srcCorners, dstCorners);
  var srcPt = [100, 150];
  var dstPt = perspT.transform(srcPt[0], srcPt[1]);
  //[]

</script>
```

##API Documentation

* [`transform`](#transform)
* [`transformInverse`](#transformInverse)
* [`coeffs`](#coeffs)
* [`coeffsInv`](#coeffsInv)
* [`srcPts`](#srcPts)
* [`dstPts`](#dstPts)

<a name="transform" />
### transform

Map a point from the source quadrilateral to the destination quadrilateral. 

```js
var perspT = PerspT(srcPts, dstPts);
perspT.transform(100, 150);
```

<a name="transformInverse" />
### transformInverse

Map a point from the destination quadrilateral to the source quadrilateral. 

```js
var perspT = PerspT(srcPts, dstPts);
perspT.transformInverse(100, 150);
```

<a name="srcPts" />
### srcPts

Get the coordinates of the corners of the transform's source quadrilateral, expressed as an array.

```js
var perspT = PerspT(srcPts, dstPts);
var srcPts = perspT.srtPts;
```

<a name="dstPts" />
### dstPts

Get the coordinates of the corners of the transform's destination quadrilateral, expressed as an array.

```js
var perspT = PerspT(srcPts, dstPts);
var dstPts = perspT.dstPts;
```

<a name="coeffs" />
### coeffs

Get the homographic transform matrix, expressed as an array of coefficients.

```js
var perspT = PerspT(srcPts, dstPts);
var mat = perspT.coeffs;
```

<a name="coeffsInv" />
### coeffsInv

Get the inverse homographic transform matrix, expressed as an array of coefficients.

```js
var perspT = PerspT(srcPts, dstPts);
var mat = perspT.coeffsInv;
```