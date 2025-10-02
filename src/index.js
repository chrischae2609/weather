// visual crossing api key: Q78B35DRTTDTTDA9UZ8BNJNBK
// giphy api key: 7cFe4bPkOQd2WzUL40fAId7vzZeWhgxw
// https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=Q78B35DRTTDTTDA9UZ8BNJNBK

import "./styles.css";
import changeUnit from "./units.js";
import loadWeatherNow from "./loadNow.js";
import loadWeatherData from "./loadWeather.js";
import { currentUnit, toggleUnit } from "./state.js";

const input = document.getElementById("location-input");
const searchBtn = document.getElementById("searchBtn");
const unitBtn = document.getElementById("check");
const unitLabel = document.querySelector(".unit-label");

const content = document.querySelector(".content");

async function getWeather() {
    const location = input.value.toLowerCase().trim();
    if (!location) {
        alert("Please enter a location");
        return;
    }
    try {
        const response = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?key=Q78B35DRTTDTTDA9UZ8BNJNBK`);
        const weatherData = await response.json();
        
        content.classList.add("active");

        loadWeatherNow(weatherData);
        loadWeatherData(weatherData);


    } catch (err) {
        console.error("Error fetching weather: ", err);
    }
}

searchBtn.addEventListener("click", () => {
    getWeather();
    input.value = "";
});

unitBtn.addEventListener("click", () => {
    if (unitBtn.checked) {
        unitLabel.textContent = "C";
    } else {
        unitLabel.textContent = "F";
    }
    const temperatures = content.querySelectorAll(".temp");
    const feelsLike = content.querySelectorAll(".feelsLike");

    const tempsMin = content.querySelectorAll(".tempMin");
    const tempsMax = content.querySelectorAll(".tempMax");

    tempsMin.forEach((tempMin, i) => {
        const min = parseFloat(tempMin.dataset.f);
        const unitSpan = tempMin.nextElementSibling;
        if (currentUnit === "F") {
            tempMin.textContent = "Min: " + changeUnit(min, "f").toFixed(1);
            unitSpan.textContent = "C";
        } else {
            tempMin.textContent = "Min: " + min.toFixed(1);
            unitSpan.textContent = "F";
        }
    })

    tempsMax.forEach((tempMax) => {
        const max = parseFloat(tempMax.dataset.f);
        const unitSpan = tempMax.nextElementSibling;
        if (currentUnit === "F") {
            tempMax.textContent = "Max: " + changeUnit(max, "f").toFixed(1);
            unitSpan.textContent = "C";
        } else {
            tempMax.textContent = "Max: " + max.toFixed(1);
            unitSpan.textContent = "F";
        }
    
    })
    temperatures.forEach((temp) => {
        const f = parseFloat(temp.dataset.f);
        const unitSpan = temp.nextElementSibling;
        if (currentUnit === "F") {
            temp.textContent = "Temperature: " + changeUnit(f, "f").toFixed(1);
            unitSpan.textContent = "C";
        } else {
            temp.textContent = "Temperature: " + f.toFixed(1);
            unitSpan.textContent = "F"; 
        }
    });
    

    feelsLike.forEach((fl) => {
        const f = parseFloat(fl.dataset.f);
        const unitSpan = fl.nextElementSibling;
        if (currentUnit === "F") {
            fl.textContent = "Feels like: " + changeUnit(f, "f").toFixed(1);
            unitSpan.textContent = "C";
        } else {
            fl.textContent = "Feels like: " + f.toFixed(1);
            unitSpan.textContent = "F";
        }
    })

    toggleUnit();

})

