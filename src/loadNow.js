
import { currentUnit } from "./state.js";

const contentNow = document.querySelector(".content-now");


async function loadWeatherNow(weatherData) {
    const currentHourStr = weatherData.currentConditions.datetime.split(":")[0];
    const currentHour = parseInt(currentHourStr);
    const address = weatherData.resolvedAddress.split(" ").map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

    for (const hour of weatherData.days[0].hours) {
        if (currentHour === parseInt(hour.datetime.split(":")[0])) {
            if (currentHour > 5 && currentHour < 8) {
                document.body.style.background = "linear-gradient(to top, #FF512F, #F09819)";
                document.body.style.color = "#333";
            } else if (currentHour >= 8 && currentHour < 17) {
                document.body.style.background = "linear-gradient(to top, #87CEEB, #ffffff)";
                document.body.style.color = "#333"
            } else if (currentHour >= 17 && currentHour < 20) {
                document.body.style.background = "linear-gradient(to top, #F46B45, #EEA849)";
                document.body.style.color = "#333";
            } else {
                document.body.style.background = "linear-gradient(to top, #0F2027, #203A43, #2C5364)";
                document.body.style.color = "eee";
                contentNow.style.color = "white";
            }
            contentNow.innerHTML = "";
            contentNow.innerHTML += `
            <div class="cityName"><h2>${address}</h2></div>
            <div class="now-info">
                <div class="current">
                    <div><span class="temp" data-f="${hour.temp}"><strong>Temperature:</strong> ${hour.temp}</span>°<span class="unit">${currentUnit}</span></div>
                    <div><span class="feelsLike" data-f="${hour.feelslike}"><strong>Feels Like:</strong> ${hour.feelslike}</span>°<span class="unit">${currentUnit}</span></div>
                </div>
                <div class="currentImg">
                    <div><img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${hour.icon}.png" alt="icon"></img></div>
                </div>
            </div>
            ` 
        }
    }
}

export default loadWeatherNow;