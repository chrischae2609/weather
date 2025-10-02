
import renderDayDetails from "./renderDay.js";
import { currentUnit } from "./state.js";
import formatDate from "./formatDate.js";

// const contentNow = document.querySelector(".content-now");
const contentDaily = document.querySelector(".content-daily");
const contentHourly = document.querySelector(".content-hourly");
const extraInfo = document.querySelector(".extra-info");

function loadWeatherData(weatherData) {
    contentDaily.innerHTML = "";
    contentHourly.innerHTML = "";
    extraInfo.innerHTML = "";

    const today = new Date().toLocaleDateString("en-CA", { timeZone: weatherData.timezone });
    

    console.log("today (calculated):", today);
    console.log("days from API:", weatherData.days.map(d => d.datetime));

    let dayCount = 0;
    for (const day of weatherData.days) {
        if (dayCount >= 8) break;
        dayCount++;
        const daily = document.createElement("div");

        daily.className = "dailyData";

        if (day.datetime === today) {
            daily.classList.add("today");
        }
        daily.innerHTML = `
            <div class="daily-header">
                <h3>${formatDate(day.datetime)}</h3>
                <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${day.icon}.png" alt="icon"></img>
            </div>
            <div class="overall">
                <div class="temps">
                    <div><span class="temp" data-f="${day.temp}"><strong>Temperature:</strong> ${day.temp}</span>°<span class="unit">${currentUnit}</span></div>
                    <div><span class="tempMin" data-f="${day.tempmin}"><strong>Min:</strong> ${day.tempmin}</span>°<span class="unit">${currentUnit}   </span>
                        <span class="tempMax" data-f="${day.tempmax}"><strong>Max:</strong> ${day.tempmax}</span>°<span class="unit">${currentUnit}</span></div>
                </div>
                <div>
                    <p><strong>Condition:</strong> ${day.conditions}</p>
                </div>
            </div>
        `
        contentDaily.append(daily)
        

        daily.addEventListener("click", () => {
            renderDayDetails(day, weatherData);
            // dayCount++;
        });
    }
    const todayDay = weatherData.days.find(d => d.datetime === today) || weatherData.days[0];
    renderDayDetails(todayDay, weatherData);
    // renderDayDetails(weatherData.days[0], weatherData);
    }

export default loadWeatherData;