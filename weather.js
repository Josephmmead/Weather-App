$(document).ready(function(){


    // functions for setting and getting the citys
    var history = JSON.parse(window.localStorage.getItem("history")) || [];
    var key = "81f40804d680e3c5a27cee0529465e35";

    for(var i=0; i< history.length; i++){
        makeRow(history[i])
    }

    function makeRow(text){
        var li = $("<li>").addClass("list-group-item list-group-item-action").text(text);
        $("#city-list").prepend(li)
    }
    
    // setting the current weather card
    function searchWeather(query) {

        
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + key + "&units=imperial";

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
        }).then(function(response){
            
            $("#today").empty();
            $("#forcast").empty();

            var card = $("<div>").addClass("card mt-3");
            var cardBody = $("<div>").addClass("card-body main");
            var currentCity = response.name;
            var cardTitle = $("<h2>").addClass("card-title").text(currentCity);
            var currentTime = moment().subtract(10, 'days').calendar();
            var temp = Math.round(response.main.temp);
            var tempEl = $("<h6>").addClass("card-text").text("Temperature: " + temp + String.fromCharCode(176) + "F");
            var humidity = response.main.humidity;
            var humidityEl = $("<h6>").addClass("card-text").text("Humidity: " + humidity +  " %");
            var wind = response.wind.speed; 
            var windEl = $("<h6>").addClass("card-text").text("Wind Speed: " + wind +  " MPH");
            
            var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + response.weather[0].icon + ".png")
            
         

            $("#today").append(card.append(cardBody.append(cardTitle.append("  " + "(" + currentTime + ")"+ " ").append(img), "<br>", tempEl,"<br>", humidityEl,"<br>", windEl)))

            getForecast(response.coord.lat, response.coord.lon)
        })
    };
    
    // getting and setting the 5 day forcast cards
    function getForecast(lat, lon){
       
        var queryURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=${key}`

        $.ajax({
            url: queryURL,
            method: "GET",
            dataType: "json"
        }).then(function(res){ 

                var uv = res.current.uvi;
                var uvEl = $("<h6>").addClass("card-text").text("UV Index:" + uv);
                
            // was unable to figure out this portion
                // $(".main").append("<br>", uvEl);

                // if(uv <= 2){
                //     uvEl.addClass("uvLow")
                // }
                // else if(uv >= 3 && uv <= 5 ){
                //     uvEl.addClass("uvGood")
                // }
                // else if(uv >= 6 && uv <= 7){
                //     uvEl.addClass("uvMod")
                // }
                // else{
                //     uvEl.addClass("uvHigh")
                // }
                

                var today = new Date();
                var dd = today.getDate()+1;
                var mm = today.getMonth()+1; 
                var yyyy = today.getFullYear();

                for(var i = 1; i < 6; i++){
            
                    var newCol = $("<div>").addClass("col-xs-2 mt-4")
                    var newCard = $("<div>").addClass("card text-white bg-primary mx-2")
                    var cardBody = $("<div>").addClass("card-body main");
                    var date = (mm + "/" + dd + "/" + yyyy);
                    var cardTitle = $("<h5>").addClass("card-title").text(date);
                    var img = $("<img>").attr("src", "https://openweathermap.org/img/w/" + res.daily[i].weather[0].icon + ".png")
                    var temp = Math.round(res.daily[i].temp.day);
                    var tempEl =  $("<p>").addClass("card-text").text("Temp: " + temp + String.fromCharCode(176) + "F");
                    var humidity = res.daily[i].humidity;
                    var humidityEl = $("<p>").addClass("card-text").text("Humidity: " + humidity +  " %");

                    $("#forcast").append(newCol.append(newCard.append(cardBody.append(cardTitle, img, tempEl, humidityEl))));

                    dd = dd + 1;

            };                             
        });
    };

// onclick functions
    $(".history").on("click", "li", function(){
        searchWeather($(this).text())
    })


    $("#searchBtn").on("click", function(){
        event.preventDefault();

        var cityName = $("#city-name").val().trim().toUpperCase();
        searchWeather(cityName)
  

        if (history.indexOf(cityName) === -1) {

            history.push(cityName);
            window.localStorage.setItem("history", JSON.stringify(history))
            makeRow(cityName);
        }
        console.log(localStorage)
    });
});