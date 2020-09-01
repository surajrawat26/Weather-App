// jshint esversion:6

const express = require ("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
const port = 3000;
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.get("/", function(req, res)
{
  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req,res)
{
  var cityName = req.body.CityName;
  console.log(cityName);
  const appId = "20b17f094bb61f855caa2302ac611fc5";
  const unit = "metric";
  var url= "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&appid="+appId+"&units="+unit;
  https.get(url,function(response){

    response.on("data",function(data){
      const WeatherData = JSON.parse(data);
      console.log(WeatherData);
      var temperature = WeatherData.main.temp;
      var feelsLike   = WeatherData.main.feels_like;
      var MinTemp   = WeatherData.main.temp_min;
      var MaxTemp = WeatherData.main.temp_max;
      var image       = WeatherData.weather[0].icon;
      var description = WeatherData.weather[0].description;
      var Humidity = WeatherData.main.humidity;
      var windSpeed = WeatherData.wind.speed;
      const imageURL = "http://openweathermap.org/img/wn/"+image+"@2x.png";

      res.render('weather', {Desc: description,Tfl: feelsLike,Ts: temperature,site: cityName,Tmin: MinTemp,Tmax: MaxTemp,HL: Humidity,img1: imageURL,WS:windSpeed});
      // res.render('weather', {Tfl: feelsLike});
      //  res.render('weather', {Ts: temperature});
      //  res.render('weather', {site: cityName});
      // res.render('weather', {Tmin: MinTemp});
      // res.render('weather', {Tmax: MaxTemp});
      // res.render('weather', {HL: Humidity});
      // res.render('weather', {img1: imageURL});
      // res.write("<h1>Weather App</h1>");
      // res.write("Description of weather: "+description+"<br>");
      // res.write("Temperature in "+cityName+" is "+temperature+" but it feels like "+feelsLike+"<br><br>");
      // res.write("Minimum temperature is : "+MinTemp+"<br>");
      // res.write("Maximum temprature is  : "+MaxTemp+"<br>");
      // res.write("Humidity levels are  : "+Humidity+"%<br>");
      //
      // res.write("<img src=" +imageURL + ">");
       // res.send();
    });

  });

});



app.use(bodyParser.urlencoded({ extended: true }));

app.listen(port, function(){

  console.log("Server is working");
});
