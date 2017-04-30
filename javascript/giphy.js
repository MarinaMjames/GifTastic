// access API
// display rating
//display static image
//on click of image it begins to move


// array that holds the already defined buttons on screen in the gif-buttons id
var food = ["bacon", "cheeseburger", "guacamole", "pizza", "chicken+nuggets", "pretzels", "salad", "milkshake"];
console.log(food);

// Public API Key
var key = "dc6zaTOxFJmzC";

 // URL that gets called in the ajax function that is requesting info from the Giphy API
    var queryURL = "http://api.giphy.com/v1/gifs/search?q="+food+"&api_key="+key+"&limit=10";
// ajax function that requests information from the Giphy API
    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
   
            // Function for displaying movie data
      function renderButtons() {

        // Deletes the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#gif-buttons").empty();
        // Loops through the array of movies
        for (var i = 0; i < food.length; i++) {

          // Then dynamicaly generates buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adds a class of movie to our button
          a.addClass("gifButton");
          // Added a data-attribute
          a.attr("data-name", food[i]);
          // Provided the initial button text
          a.text(food[i]);
          // Added the button to the buttons-view div
          $("#gif-buttons").append(a);
        }
      }

      // This function handles events where the add movie button is clicked
      $("#add-button").on("click", function() {
        console.log("----------------------------------");
        console.log("Add button was clicked!!!!!!");
        console.log("-----------------------------------");
        // This line of code will grab the input from the textbox
        var foods = $("#gif-input").val().trim();

        // The movie from the textbox is then added to our array
        food.push(foods);

      });

      // Adding click event listeners to all elements with a class of "movie"
      $("#gif-buttons").click(function(){
      
      console.log("Gif Button was clicked!!!!!!!!!!!");
      });
      // Calling the renderButtons function to display the intial buttons
      renderButtons();

// $("food-gifs").prepend();





 });
    