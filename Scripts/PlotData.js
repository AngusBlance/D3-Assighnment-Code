//set up constants for the width and hight of csv
const width = 500;
const height = 630;



//set up constants for how small we want our bubbles as well as our scale factor 
const size = 15000;
const x = 1;
const TheScale = 1700;
const center = [-2, 56];

//set up the links to the json files
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

//create tooltip variable from d3 library for the mouseover
var tooltip = d3.select('body').append('div')
  .attr('class', 'tooltip')
  .style('opacity', 0);

/*
function reads the data from the json file and turns it in to bubbles
*/
function create_tooltip() {
  // Show tooltip on mouseover
  tooltip.transition()
    .duration(200)
    .style('opacity', .9);
  tooltip.html(`Town: ${d.Town}<br>Population: ${d.Population}<br>County: ${d.County}`)
    .style('left', (d3.event.pageX) + 'px')
    .style('top', (d3.event.pageY - 28) + 'px');

}




function d3Draw(dataset) {
  var slider = document.getElementById("slider").value;
  svg.selectAll('circle').remove();

  // Load JSON data based on the slider value
  var jsonDataUrl = 'http://34.38.72.236/Circles/Towns/' + slider;

  //load our json file
  d3.json(jsonDataUrl).then(data => {
    //create circles
    svg.selectAll('circle')
      .data(data)
      .enter()
      .append('circle')
      //turn the lattitude and longitude into c,y coordinates with projection function
      .attr('cx', d => x * (projection([d.lng, d.lat])[0]))
      //circles start of the screan for transition
      .attr('cy', -10)
      //make the radius proporional to the population size of each place
      //use the size constant to make sure they are not too big
      .attr('r', function (d) {
        return d.Population / size
      })
      //circle colour
      .style('fill', '#c23616')

      .on('mouseover', function (d) {
        // Show tooltip on mouseover
        tooltip.transition()
          //length of time until the tooltip is visible
          .duration(200)
          //opacity of the tooltip
          .style('opacity', .9);
        //tooltip text
        tooltip.html(`Town: ${d.Town}<br>Population: ${d.Population}<br>County: ${d.County}`)
          //tooltip position on the page d3.event.pageX/Y is the mouse position
          .style('left', (d3.event.pageX) + 'px')
          .style('top', (d3.event.pageY - 28) + 'px');
      })
      .on('mouseout', function (d) {
        // Hide tooltip on mouseout
        tooltip.transition()
          .duration(500)
          .style('opacity', 0);
      })
      //start the transition
      .transition()
      //transition duration
      .duration(1000)
      //transition ease
      .ease(d3.easeLinear)
      //move the circles to their correct position by changing y coord
      .attr('cy', d => x * (projection([d.lng, d.lat])[1]));



  }).catch(error => console.error(error));
  // Append a tooltip div

}


//fuction reads map data and draws it
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

  }, 2000);

});