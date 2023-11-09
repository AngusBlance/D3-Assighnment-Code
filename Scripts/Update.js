


document.addEventListener("DOMContentLoaded", function () {
    // Get the slider element by its id
    var slider = document.getElementById("slider");

    

    // Update the output element with the initial value of the slider
    sliderValue.textContent = slider.value;

    // Add an event listener to the slider to update the output when the slider value changes
    slider.addEventListener("input", function () {
        // Update the output element with the current value of the slider
        sliderValue.textContent = slider.value;
        
        // You can perform additional actions here based on the slider value
        // For example, update other elements or make AJAX requests.
    });
});