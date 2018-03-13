var animals = ["mouse", "dog", "moose", "cat", "raccoon", "elephant", "penguin", "otter", "sea lion", "duck", "corgi"];

  	function makeButtons() {
  		$("#buttons-view").empty();

  		for(var i = 0; i < animals.length; i++) {
  			var a = $("<button>");
  			a.addClass("animal-btn giffy");
  			a.attr("animal-name", animals[i]);
  			a.text(animals[i]);
  			$("#buttons-view").append(a);
  		}
  	};

  	makeButtons(); 

    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      var newAnimal = $("#animal-input").val().trim();
      animals.push(newAnimal);
      $("#animal-input").val("");
      makeButtons();
    });
    
    function displayAnimalInfo() {
      
      $("#animals-view").empty();

      var name = $(this).attr("animal-name");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + name + "&api_key=G5xLz50iJ11XSQavFETyLEUehUMxU21V&limit=10";

      $.ajax({
        url: queryURL,
        method: "GET"
      }).then (function(response) {

        var results = response.data;
        
        for (var i = 0; i < results.length; i++) {

            var gifDiv = $("<div class='items'>");
            var rating = results[i].rating;
            var p = $("<p>").text("rating: " + rating);
            var image = $("<img>");
            var stillImage = results[i].images.fixed_height_still.url;
            var animatedImage = results[i].images.fixed_height.url;

            image.attr({
              "src": stillImage,
              "data-still": stillImage,
              "data-animated": animatedImage,
              "data-state": "still",
              class: "gif"
            });
            
            gifDiv.append(p);
            gifDiv.append(image);
            $("#animals-view").append(gifDiv);
        
            $(".gif").on("click", function() {
              var state = $(this).attr("data-state");
              if (state === "still") {
                $(this).attr("src", $(this).attr("data-animated"));
                $(this).attr("data-state", "animated");
              } else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
              }
            });
          }
      });
    }

  $(document).on("click",".animal-btn", displayAnimalInfo);
  