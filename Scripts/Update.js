document.addEventListener("DOMContentLoaded", function () {

    var restartButton = document.getElementById("updateButton");

    var slider = document.getElementById("slider");

    var sliderValue = document.getElementById("sliderValue");

    function updateText(value) {
        sliderValue.textContent = value;
    }

    // Create a div for the tooltip
    var tooltip = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

    // Function to show the tooltip
    function showTooltip(data) {
        tooltip.transition()
            .duration(200)
            .style("opacity", 0.9);

        tooltip.html("Town: " + data.Town + "<br>Population: " + data.Population)
            .style("left", (event.pageX + 10) + "px")
            .style("top", (event.pageY - 28) + "px");
    }

    // Function to hide the tooltip
    function hideTooltip() {
        tooltip.transition()
            .duration(500)
            .style("opacity", 0);
    }




    slider.addEventListener("input", function () {
        var value = slider.value;
        updateText(value);
    });


    restartButton.addEventListener("click", function () {
        svg.selectAll('circle').remove();


        var jsonDataUrl = 'http://34.38.72.236/Circles/Towns/' + slider.value;


        d3.json(jsonDataUrl).then(data => {

            svg.selectAll('circle')
                .data(data)
                .enter()
                .append('circle')

                .attr('cx', d => x * (projection([d.lng, d.lat])[0]))
                .attr('cy', -10)

                .attr('r', function (d) {
                    return d.Population / size
                })
                .style('fill', '#c23616')
                .transition()
                .duration(2000)
                .ease(d3.easeLinear)
                .attr('cy', d => x * (projection([d.lng, d.lat])[1]))
                .attr('r', d => d.Population / size)
                .on('mouseover', function (event, d) {
                    // Show tooltip on mouseover
                    showTooltip(d);
                })
                .on('mouseout', function () {
                    // Hide tooltip on mouseout
                    hideTooltip();
                });


        }).catch(error => console.error(error));
    });


});