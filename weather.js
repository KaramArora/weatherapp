//This is by geolocation

$(document).ready(function () {
    
    // Get Location 
    navigator.geolocation.getCurrentPosition(success, error);

    function success(pos) {
        var lat = pos.coords.latitude;
        var lon = pos.coords.longitude;
        loadweather(lat, lon);
    }

    function error() {
        console.log('Could not find location');
    }

function loadweather(lat, lon){
  var URL = `https://fcc-weather-api.glitch.me/api/current?lat=${lat}&lon=${lon}`;

        $.getJSON(URL, function(url) {
            sendRequest(url);
        });    
}

function sendRequest(url) {
        var city = url.name;
        var temp = Math.round(url.main.temp_max);
        var desc = url.weather[0].description;
        var icon = url.weather[0].icon;

        $('#city1').html(city);
        $('#temp').html(temp);
        $('#desc').html(desc);
        $('#icon').attr('src', icon);
}
});

//
//Below is the coding for searching by city option

$(document).ready(function () {
    $('#submitWeather').click(function(){
        
        var city = $("#city").val();
        
        if(city != '') {
            
            /*Ajax reqest to get data from API*/
            
            $.ajax({
                
               /*Used open weather map api to get jSon format*/
                url: 'http://api.openweathermap.org/data/2.5/weather?q=' + city + "&units=metric" + "&APPID=b6925397e28c6bc536f39b64da24a890",
                type: "GET",
                dataType: "jsonp",
                success: function(data) {
                    var widget = show(data);
                    
                    $('#show').html(widget);
                    $("#city").val('');
                }
                
            });
            
        }else {
            $("#error").html('Field cannot be empty')
        }
        
    });
});

function show(data) {
    return "<h2 class='text-center'>Current Weather for "+ data.name +" , " + data.sys.country + " </h2>" +
           "<h3 style= 'padding-left:50px;'><strong>weather</strong>: "+ data.weather[0].main + "</h3>" +
           "<h3 style= 'padding-left:50px;'><strong>Description</strong>: <img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'> "+ data.weather[0].description + "</h3>" + 
           "<h3 style= 'padding-left:50px;'><strong>Temprature</strong>: "+ data.main.temp + "&deg;C</h3>" + 
//           "<h3><strong>Pressure</strong>: "+ data.main.pressure + "hPa</h3>" + 
           "<h3 style= 'padding-left:50px;'><strong>Humidity</strong>: "+ data.main.humidity + "%</h3>" + 
           "<h3 style= 'padding-left:50px;'><strong>Min Temprature</strong>: "+ data.main.temp_min + "&deg;C</h3>" + 
           "<h3 style= 'padding-left:50px;'><strong>Max Temprature</strong>: "+ data.main.temp_max + "&deg;C</h3>" +
           "<h3 style= 'padding-left:50px;'><strong>Wind Speed</strong>: "+ data.wind.speed + "m/s</h3>";
//           "<h3><strong>Wind Direction</strong>: "+ data.wind.deg + "&deg;</h3>";
           
}