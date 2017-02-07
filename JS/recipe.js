"use strict"
$(document).ready(function() {

  //get data from Edamam API 
  function getRequest(search, diet, health) {
    var params = {
      app_id: "600716a7",
      app_key: "5596c6f8221906faff7417392428b2c3",
      q: search,
      diet: diet,
      health: health, 
    }
    var url = "https://api.edamam.com/search"
    $.getJSON(url, params, function(data) {
      showResults(data);
    })
  };

  //display results 
  function showResults(data) {
    $("#results").show();
    $.each(data.hits, function(index, value) {
      var html = "<tr><td>" + value.recipe.label + "<br><a target='blank' href='" + value.recipe.url + 
      "'</a><img src='" + value.recipe.image + "'></td><td>" + value.recipe.ingredientLines + "</td><td>" +
      value.recipe.calories + "</td><td>" + value.recipe.dietLabels + "</td><td>" + value.recipe.healthLabels + 
      "</td></tr>"
      $("#resultsTable").append(html);
    })
    $("#edamam").append("<a href='http://developer.edamam.com'><img alt='poweredByEdamam' src='images/edamam.jpg'></a>");
  };
  
  //hide results table when search page first loads 
  $("#results").hide();

  //create empty array for ingredients user enters 
  var ingredients = [];

  //restart button to reset search 
  $("#restart").on("click", function() {
    location.reload();
  });

  //get value from input push to array & display to user
  $("#ingredientForm").submit(function(e) { 
    e.preventDefault();
    var newIngredient = $("#ingredientInput").val();
    ingredients.push(newIngredient);
    $("#list").append("<li>" + newIngredient + "</li>");
    $("#ingredientInput").val("");
  });

  //take array and & search
  $("#searchForm").submit(function(e) {
    e.preventDefault();
    //string for ingredients
    var search = ingredients.join(",");
    //retrieve values for dropdown to filter recipes
    var health = $("#health").val();
    var diet = $("#diet").val();
    //run search
    if (ingredients != "") {
      getRequest(search, diet, health);
    }
    else {
      alert("Please enter in at least one item.")
    }
  });
});
