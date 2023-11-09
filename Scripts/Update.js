
//statrt an addEventListener for the DOMContentLoaded event
document.addEventListener("DOMContentLoaded", function () {
    // create variables for the update button and slider
    var restartButton = document.getElementById("updateButton");

    var slider = document.getElementById("slider");

    var sliderValue = document.getElementById("sliderValue");

    //update the text of the slider
    function updateText(value) {
        sliderValue.textContent = value;
    }

    //check for if the slider changes
    slider.addEventListener("input", function () {
        //change the text of the slider
        var value = slider.value;
        updateText(value);
    });

    //add an event listener for the update button
    restartButton.addEventListener("click", function () {
        //exactly the same as 3ddraw from the other js file
        svg.selectAll('circle').remove();


        var jsonDataUrl = 'http://34.38.72.236/Circles/Towns/' + slider.value;


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
       
    });




});