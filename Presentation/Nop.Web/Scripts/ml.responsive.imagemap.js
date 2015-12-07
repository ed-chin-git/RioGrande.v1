/*
 * @package   MLR Image Map
 * Licensed under the MIT license
 * Copyright (c) 2013 Matthew Lillistone
 * @author    Matthew Lillistone <matthewlillistone.co.uk>
 * 
 */

/* Make image map responsive */

function saveMapData(imageID,mapID) {
imageID.data('reset_map',mapID.html());
}

function resetMap(mapID,imageID) {
	mapID.html(imageID.data('reset_map'));
}

function mlResponsiveImageMap(imageID,mapID) {

if (typeof(imageID.attr('usemap')) == 'undefined')
					return;

/* Find width of image on load */
function resizeMe(mlImage) {
	var	imWidth = mlImage.attr('width');
	return imWidth;
}
	
var mlOriginalWidth = resizeMe(imageID),
	newMLWidth = imageID.width(),
	
/* Get array of coordinates from map */
	$areas = mapID.children('area'),
	areasArray = $areas.map(function() {
		return jQuery(this).attr('coords');
		}).get();
		
if(newMLWidth < mlOriginalWidth) {
	imageID.css({'width':'auto',
				 'height':'auto'
				 });
	var proportion = Math.round((newMLWidth / mlOriginalWidth) * 100);

/* Function to get new array of coordinates from original array map */
function toArray(mlString) {
	var temp = mlString.split(','),
		tempLen = temp.length,
		newTempArray = [];
	for(var j = 0; j < tempLen; j++) {
		var backToArray = Math.round(temp[j] * (proportion / 100));
		newTempArray.push(backToArray);
		}
	return newTempArray;
}
		
/* Change old coordinates to new */		
var areaLen = areasArray.length;
	for(var i = 0; i < areaLen; i++) {
	mapID.children('area').eq(i).attr('coords',toArray(areasArray[i]));			
}

} /* End if smaller than original image size */
} /* End responsive function */

/* Condense into one easy function */
function mlResizeMap() {
				var i = 0;
				jQuery('img[usemap]').each(function() {
					i++;
					var j = Math.ceil(Math.random() * 100 + 1),
						$this    = jQuery(this);
					if($this.parent('p')) {
						$this.unwrap();
						}
					var	mlSource = $this.attr('src'),
						idPrefix = mlSource.substr(mlSource.length - 1),	
						mlThisID = $this.addClass('image'+j+idPrefix+i),
						
						$that    = $this.nextAll('map').eq(0),
						mlThatID = $that.addClass('ml_map'+j+idPrefix+i);
	
		saveMapData(mlThisID,mlThatID);
		mlResponsiveImageMap(mlThisID,mlThatID);

		jQuery(window).resize(function() {
			resetMap(mlThatID,mlThisID);
			mlResponsiveImageMap(mlThisID,mlThatID);
			});
	});
}

