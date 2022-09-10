


// firstly get weather jspn data
getWeather("London");
let data = {};
//  = {
//     "location": {
//         "name": "London",
//         "region": "City of London, Greater London",
//         "country": "United Kingdom",
//         "lat": 51.52,
//         "lon": -0.11,
//         "tz_id": "Europe/London",
//         "localtime_epoch": 1662532962,
//         "localtime": "2022-09-07 7:42"
//     },
//     "current": {
//         "last_updated_epoch": 1662532200,
//         "last_updated": "2022-09-07 07:30",
//         "temp_c": 15.0,
//         "temp_f": 59.0,
//         "is_day": 1,
//         "condition": {
//             "text": "Partly cloudy",
//             "icon": "//cdn.weatherapi.com/weather/64x64/day/116.png",
//             "code": 1003
//         },
//         "wind_mph": 8.1,
//         "wind_kph": 13.0,
//         "wind_degree": 180,
//         "wind_dir": "S",
//         "pressure_mb": 1009.0,
//         "pressure_in": 29.8,
//         "precip_mm": 0.5,
//         "precip_in": 0.02,
//         "humidity": 100,
//         "cloud": 75,
//         "feelslike_c": 14.6,
//         "feelslike_f": 58.2,
//         "vis_km": 10.0,
//         "vis_miles": 6.0,
//         "uv": 1.0,
//         "gust_mph": 10.5,
//         "gust_kph": 16.9
//     }
// }

// update the text of the elements with the classes

function updateText() {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const day = document.querySelector(".day");
  let a = new Date(data.current.last_updated_epoch);
  day.innerHTML = days[a.getDay()];

  const date = document.querySelector(".date");
  date.innerHTML = data.current.last_updated.split(" ")[0];

  const loc = document.querySelector(".location");
  loc.innerHTML = data.location.name + ", " + data.location.country;

  const temp = document.querySelector(".temperature_value");
  temp.innerHTML = data.current.temp_c + "°C";

  const weather = document.querySelector(
    ".temperature_description .description"
  );
  weather.innerHTML = data.current.condition.text;

  const icon = document.querySelector(".weather_icon img");
  icon.src = data.current.condition.icon;

  const wind = document.querySelector(".wind");
  const humidity = document.querySelector(".humidity");
  const pressure = document.querySelector(".pressure");
  const coValue = document.querySelector(".co_value");
  const no2Value = document.querySelector(".no2_value");
  const so2Value = document.querySelector(".so2_value");

  wind.innerHTML = data.current.wind_kph + " km/h";
  humidity.innerHTML = data.current.humidity + " %";
  pressure.innerHTML = data.current.pressure_mb + " mb";
  coValue.innerHTML = (data.current.air_quality.co).toFixed(2);
  no2Value.innerHTML = data.current.air_quality.no2.toFixed(2);
  so2Value.innerHTML = data.current.air_quality.so2.toFixed(2);

  const rightBg = document.querySelector(".right_panel");
  const legtBg = document.querySelector(".left_panel");
  
  if(data.current.is_day == 1){
    rightBg.style.background = "linear-gradient(to top, #a8edea 0%, #fed6e3 100%)";
    legtBg.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2017/07/12/20/59/bouquet-2498384_960_720.jpg')";
    
  }else{
    rightBg.style.background = "linear-gradient(0deg, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.5)), url('https://cdn.pixabay.com/photo/2015/11/16/22/39/balloons-1046658_960_720.jpg')"
    // "linear-gradient(to top, #0f2027 0%, #203a43 50%, #2c5364 100%)";
    legtBg.style.backgroundImage = "url('https://cdn.pixabay.com/photo/2015/07/09/22/45/tree-838667_960_720.jpg')";
  }
}

const changeLocation = document.querySelector(".change_location");
changeLocation.addEventListener("click", () => {
  const location = prompt("Enter Location");
  getWeather(location);
});


async function getWeather(location) {
  const a = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=${keys.api}&q=${location}&aqi=yes`
  );
  if (a.ok) {
    data = await a.json();

    updateText();
  } else {
    alert("Location not found");
  }
  // console.log(data);
}
