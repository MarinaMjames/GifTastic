// array that holds the already defined buttons on screen in the gif-buttons id
var food = ["Bacon", "Burritos", "Guacamole", "Grilled Cheese", "Pizza", "Pancakes", "Donuts", "Ice Cream", "Waffles", "Carrot"];
console.log(food);


// function that creates the gif buttons 
function renderButtons() {
  // remove everything from the gif button div
  $("#gif-buttons").empty();
  // Loops through the array of pre-defined food variable
  for (var i = 0; i < food.length; i++) {
    // Generates buttons for each food in the food variable array
    var button = $("<button class='waves-effect waves-light btn'>");
    // Adds a class of gifButton to our buttons
    button.addClass("gifButton");
    // Added a data-attribute
    button.attr("data-name", food[i]);
    // Provided the initial button text
    button.text(food[i]);
    // Added the button to the div with id gif buttons
    $("#gif-buttons").append(button);
  }

// On Click function for each gif button that pushes that value into the queryURL variable
$(".gifButton").click(function(){
  // empties the div with id food-gifs so that only those of the button clicked are shown
  $("#food-gifs").empty();

// stored the data-name in the variable gifClicked
var gifClicked = $(this).attr("data-name");
// console.log("Gif Button was clicked! I have a data-name of: " + gifClicked);
  // URL that gets called in the ajax function that is requesting info from the Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifClicked + "&api_key=dc6zaTOxFJmzC&limit=10";
  // console.log(queryURL);
  // ajax function that requests information from the Giphy API
  $.ajax({
    url: queryURL,
    method: "GET"
  })
// once response is given from the giphy API do all this stuff: 
  .done(function(response) {
    // get the data from response and store it in variable gif
    var gif = response.data;
      // console.log(gif);
// loop through the gif reponse data
      for (i = 0; i < gif.length; i++){
        // create p tag
        var p = $("<p>");
        //add class of rating to p tags
        p.addClass("rating");
        // add text to p tag of Rating: and the rating from the gif responses
        p.text("Rating: " + gif[i].rating);
        // store img tag in variable gifImg
        var gifImg = $("<img>");

// set src, data-state, data-still, data-animate to the gif images
        gifImg.attr({"src": gif[i].images.fixed_height_still.url, "data-state": "still", "data-still": gif[i].images.fixed_height_still.url, "data-animate": gif[i].images.fixed_height.url });
// create variable state that stores the data-state
        var state = $(this).attr("data-state", "animated");
// put the p tag information and gifimg information into the div with id food-gifs
        $("#food-gifs").prepend(p, gifImg);
// when you click gifImg - any image responses from the giphy API 
        $(gifImg).click(function() {
          // get the data-state of the one that was clicked
          var state = $(this).attr("data-state");
          // if data-state is still then change it to data animate and change url 
            if (state === "still") {
              $(this).attr("src", $(this).attr("data-animate"));
              $(this).attr("data-state", "animate");
              // if state is animate then change it to data still and change url
            } else {
              $(this).attr("src", $(this).attr("data-still"));
              $(this).attr("data-state", "still");
            }
        });
      };

      });

});
};
// call render buttons function
renderButtons();
// On click for when the submit button is clicked
$("#add-button").click(function(){
// allows you to hit enter to submit 
  event.preventDefault();
  // console.log("----------------------------------");
  // console.log("Add button was clicked!!!!!!");
  // console.log("-----------------------------------");
  // This line of code will grab the input from the textbox
  var gifInput = $("#gif-input").val().trim();
  // The input is added to the original array
  food.push(gifInput);
  // clears the input fields value
  $("#gif-input").val("");
  // console.log(food);
  // calls the render buttons function
  renderButtons();
});



