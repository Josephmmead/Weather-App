$(document).ready(function(){

    var history = JSON.parse(window.localStorage.getItem("history")) || [];

    if(history.length > 0){
        // add seach function for each city 
        console.log(history);
    }
    for(var i=0; i< history.length; i++){
        makeRow(history[i])
    }

    function makeRow(text){
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text)
        $("#city-list").append(li)
    }
    


    $("#searchBtn").on("click", function(){
        var cityName = $("#city-name").val().trim().toLowerCase();
        searchWeather(cityName)
  

        if (history.indexOf(cityName) === -1) {

            history.push(cityName);
            window.localStorage.setItem("history", JSON.stringify(history))
            makeRow(cityName);
        }
        console.log(localStorage)
    });




    function searchWeather(query) {
        $.ajax({
                //add code for ajax call here hint method: GET
        }).then(function(res){
            console.log(res)
        })
    }






})