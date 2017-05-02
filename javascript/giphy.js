// array that holds the already defined buttons on screen in the gif-buttons id
var food = ["Bacon", "Burritos", "Guacamole", "Grilled Cheese", "Pizza", "Pancakes"];
console.log(food);


// function that creates the gif buttons 
function renderButtons() {
  // remove everything from the gif button div
  $("#gif-buttons").empty();
  // Loops through the array of pre-defined food variable
  for (var i = 0; i < food.length; i++) {
    // Generates buttons for each food in the food variable array
    var button = $("<button>");
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
  $("#food-gifs").empty();
var gifClicked = $(this).attr("data-name");
console.log("Gif Button was clicked! I have a data-name of: " + gifClicked);
  // URL that gets called in the ajax function that is requesting info from the Giphy API
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        gifClicked + "&api_key=dc6zaTOxFJmzC&limit=10";
  console.log(queryURL);
  // ajax function that requests information from the Giphy API
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {
    var gif = response.data;
      console.log(gif);

      for (i = 0; i<gif.length; i++){
        var gifImg = $("<img>");

        gifImg.attr({"src": gif[i].images.fixed_height_still.url, "data-state": "still", "data-still": gif[i].images.fixed_height_still.url, });

        var state = $(this).attr("data-state", "animated");

        $("#food-gifs").prepend(gifImg);
      }
    });
});
}
renderButtons();



// This function handles events where the add movie button is clicked
$("#add-button").click(function(){
  event.preventDefault();
  console.log("----------------------------------");
  console.log("Add button was clicked!!!!!!");
  console.log("-----------------------------------");
  // This line of code will grab the input from the textbox
  var gifInput = $("#gif-input").val().trim();
  // The movie from the textbox is then added to our array
  food.push(gifInput);

  console.log(food);
  renderButtons();
});


