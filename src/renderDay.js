
import { currentUnit } from "./state.js";
import formatTime from "./formatTime.js";

const contentHourly = document.querySelector(".content-hourly");
const extraInfo = document.querySelector(".extra-info");

function renderDayDetails(day, weatherData) {
    contentHourly.innerHTML="";
    extraInfo.innerHTML = "";
    for (const hour of day.hours) {
        const time = new Date(`1970-01-01T${hour.datetime}`);
        const formattedTime = time.toLocaleTimeString([], {
            hour: "numeric",
            minute: "2-digit",
            hour12: true
        })

        const hourInt = parseInt(hour.datetime.split(":")[0]);
        const hourlyData = document.createElement("div");
        hourlyData.className = "hourlyData";
        hourlyData.setAttribute("data-hour", String(hourInt));
        hourlyData.innerHTML = `
            <div class="hour">
                <strong>${formattedTime}:</strong> <br/>
                <span class="temp" data-f="${hour.temp}"><strong>Temperature:</strong> ${hour.temp}</span>°<span class="unit">${currentUnit}</span> <br />
                <span class="feelsLike" data-f="${hour.feelslike}"><strong>Feels Like:</strong> ${hour.feelslike}</span>°<span class="unit">${currentUnit}</span>
            </div>
            <div class="hourly-img">
                <img src="https://raw.githubusercontent.com/visualcrossing/WeatherIcons/main/PNG/1st%20Set%20-%20Color/${hour.icon}.png" alt="icon"></img>
            </div>
        `;
        contentHourly.append(hourlyData);

    }

    const extrasDaily = document.createElement("div");

        extrasDaily.className = "extrasDaily";
        extrasDaily.innerHTML = `
            <div><strong>Precipitation:</strong> ${(day.precip * 100).toFixed(1)}%</div>
            <div><strong>Snow:</strong> ${(day.snow * 100).toFixed(1)}%</div>
            <div><strong>Sunrise:</strong> ${formatTime(day.sunrise)}</div>
            <div><strong>Sunset:</strong> ${formatTime(day.sunset)}</div>
        `
        extraInfo.append(extrasDaily);



        const now = new Date().toLocaleString("en-US", { timeZone: weatherData.timezone });
        const localHour = new Date(now).getHours();

        console.log("Local hour:", localHour);

        const currentHourElement = contentHourly.querySelector(`[data-hour="${localHour}"]`);

        if (currentHourElement) {
            currentHourElement.scrollIntoView({behavior: "smooth", block: "start" });
            currentHourElement.style.backgroundColor = "lightblue";
        }

}


export default renderDayDetails;