// TO DO LIST: 
// 1. MAKE INPUT EMPTY AFTER YOU CLICK THE SUBMIT BUTTON
// 2. FIGURE OUT WHY EVERYOTHER GIF WON'T ANIMATE
// 3.















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
        gifImg.addClass("gif");

        gifImg.attr({"src": gif[i].images.original_still.url, "data-state": "still", "data-still": gif[i].images.original_still.url, "data-animate": gif[i].images.original.url });

        var state = $(this).attr("data-state", "animated");

        $("#food-gifs").prepend(gifImg);

        $(".gif").click(function() {
          var state = $(this).attr("data-state");
          console.log(state);
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }

        });


// $(".pause").on("click", function() {
//             var state = $(this).attr("data-state");
//             if (state == "still") {
//                 $(this).attr("src", $(this).data("animate"));
//                 $(this).attr("data-state", "animate");
//             } else {
//                 $(this).attr("src", $(this).data("still"));
//                 $(this).attr("data-state", "still");
//             }
//         })









 // $(".gif").on("click", function() {

 //    var state = $(this).attr("data-state");

 //    if (state === "still") {
 //      var animate = $(this).attr("data-animate");
 //      $(this).attr({
 //        "data-state": "animate",
 //        "src": animate
 //      });
 //    };

 //    if (state === "animate") {
 //      var still = $(this).attr("data-still");
 //      $(this).attr({
 //        "data-state": "still",
 //        "src": still
 //      });  
 //    };
 //  });





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


