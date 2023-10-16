const Height = 2000
const width = 1500

// create svg within body of html
var svg = d3.select("body").append("svg").attr("width", Width).attr(
    "Height", Height);
// create circles from d3
var circles = svg.selectAll("circle").data(dataset).enter()
		.append("circle");


function d3Draw(dataset){
    circles.attr(cx, function(dataset){var coords = projection([dataset.lng,dataset.lat]); return coords[0];})
    .attr("cy", function(dataset){var coords = projection([dataset.lng,dataset.lat]); return coords[1];})
    .attr("r", function(dataset){var Psize = 1+2*Math.sqrt(dataset.Population/10000); return Psize;})
}


//reads data and then calls d3Draw function with the data inputed
function    ReadData(){
    var datalink = "http://34.38.72.236/Circles/Towns/50"
    d3.json("datalink", function(data) {
		d3Draw(data);
	});
}
window.onload = ReadData;