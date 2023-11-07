//set up constants for the width and hight of csv
const width = 1000;
const height = 600;

//set up constants for how small we want our bubbles as well as our scale factor 
const size = 15000;
const x = 1;
const TheScale = 1700;
const center = [6, 56];

var UKGeoJson = "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/gb/lad.json";
var NIGeoJson = "https://raw.githubusercontent.com/martinjc/UK-GeoJSON/master/json/administrative/ni/lgd.json";

// Create an SVG container
var svg = d3.select("body").append("svg")
  .attr("width", width)
  .attr("height", height); 

// Create a projection (here, using Mercator projection)
var projection = d3.geoMercator()
  .center(center)
  .scale(TheScale)
  .translate([width / 2, height / 2]);

// Create a GeoPath generator and set the projection
var path = d3.geoPath().projection(projection);


/*
function reads the data from the json file and turns it in to bubbles
*/

function d3Draw(dataset) {


  //load our json file
  d3.json('http://34.38.72.236/Circles/Towns/50').then(data => {
    //create circles
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      //turn the lattitude and longitude into c,y coordinates with projection function
      .attr('cx', d => x * (projection([d.lng, d.lat])[0]))
      .attr('cy', d => x * (projection([d.lng, d.lat])[1]))
      //make the radius proporional to the population size of each place
      //use the size constant to make sure they are not too big
      .attr('r', function (d) {
        return d.Population / size
      })
      .style('fill', '#c23616');
      
  }).catch(error => console.error(error));
}

function drawmap(link) {
  // Load GeoJSON data
  d3.json(link).then(function (data) {
    // Draw features on the map
    svg.selectAll("path")
      .data(data.features)
      .enter().append("path")
      .attr("d", path)
      .style("fill", "#44bd32")

  });




}




window.addEventListener("load", function () {

  drawmap(UKGeoJson);
  drawmap(NIGeoJson);

  setTimeout(function () {
    d3Draw();
    //your code to be executed after 1 second
  }, 2000);

});