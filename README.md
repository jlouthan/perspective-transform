# perspective-transform

A small JavaScript library for creating and applying perspective transforms. A perspective transform can easily be used to map one 2D quadrilateral to another, given the corner coordinates for the source and destination quadrilaterals. [Here](http://xenia.media.mit.edu/~cwren/interpolator/) is a useful resource for learning more about perspective transforms and the math behind them. [And here](http://uncorkedstudios.com/blog/perspective-transforms-in-javascript) is a blog post I wrote about the motivation for creating this library and details of some of its applications.

## Features
- Create functions to map points from one arbitrary quadrilateral to another and vice versa with the inverse
- Access the homographic matrix and its inverse (useful for transforming elements with CSS3)
- No external dependencies

## Install

With npm:
```
$ npm install perspective-transform --save
```

With bower:
```
$ bower install perspective-transform --save
```   

## Basic Usage

### Node

```js
var PerspT = require('perspective-transform');

var srcCorners = [158, 64, 494, 69, 495, 404, 158, 404];
var dstCorners = [100, 500, 152, 564, 148, 604, 100, 560];
var perspT = PerspT(srcCorners, dstCorners);
var srcPt = [250, 120];
var dstPt = perspT.transform(srcPt[0], srcPt[1]);
// [117.27521125839255, 530.9202410878403]
```

### Browser

```html
<script type="text/javascript" src="async.js"></script>
<script type="text/javascript">
  
  var srcCorners = [158, 64, 494, 69, 495, 404, 158, 404];
  var dstCorners = [100, 500, 152, 564, 148, 604, 100, 560];
  var perspT = PerspT(srcCorners, dstCorners);
  var srcPt = [250, 120];
  var dstPt = perspT.transform(srcPt[0], srcPt[1]);
  // [117.27521125839255, 530.9202410878403]

</script>
```

## API Documentation

* [`transform`](#transform)
* [`transformInverse`](#transformInverse)
* [`srcPts`](#srcPts)
* [`dstPts`](#dstPts)
* [`coeffs`](#coeffs)
* [`coeffsInv`](#coeffsInv)

Note: Commented variable values in the following examples assume `srcPts` and `dstPts` as used in the Basic Usage example above. 

<a name="transform" />
### transform

Map a point from the source quadrilateral to the destination quadrilateral. 

```js
var perspT = PerspT(srcPts, dstPts);
var dstPt = perspT.transform(250, 120);
// [117.27521125839255, 530.9202410878403]
```

<a name="transformInverse" />
### transformInverse

Map a point from the destination quadrilateral to the source quadrilateral. 

```js
var perspT = PerspT(srcPts, dstPts);
var srcPt = perspT.transformInverse(130, 570);
// [338.99465637447327, 278.6450957956236]
```

<a name="srcPts" />
### srcPts

Get the coordinates of the corners of the transform's source quadrilateral, expressed as an array.

```js
var perspT = PerspT(srcPts, dstPts);
var srcPts = perspT.srtPts;
// [158, 64, 494, 69, 495, 404, 158, 404]
```

<a name="dstPts" />
### dstPts

Get the coordinates of the corners of the transform's destination quadrilateral, expressed as an array.

```js
var perspT = PerspT(srcPts, dstPts);
var dstPts = perspT.dstPts;
// [100, 500, 152, 564, 148, 604, 100, 560]
```

<a name="coeffs" />
### coeffs

Get the homographic transform matrix, expressed as an array of coefficients.

```js
var perspT = PerspT(srcPts, dstPts);
var mat = perspT.coeffs;
// [0.3869749384, 0.0426817448, 59.2427947969, 0.9589610618, 0.4562821238, 434.8644299345, 0.0012901794, 0.0004268174, 1]
```

<a name="coeffsInv" />
### coeffsInv

Get the inverse homographic transform matrix, expressed as an array of coefficients.

```js
var perspT = PerspT(srcPts, dstPts);
var mat = perspT.coeffsInv;
// [1.9955408809, -0.1282507787, -62.4497171511, -2.9335671323, 2.2894572644, -821.8108124927, -0.0013225082, -0.0008117138, 1]
```
