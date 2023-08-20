let cityCountrynames = document.querySelector(".cityCountrynames");
const wrapper = document.querySelector(".wrapper");
const selectBtn = document.querySelector(".select-btn");
const searchCity = document.querySelector(".searchCity");
const wrapperCard = document.querySelector(".wrapperCard");
const content = document.querySelector(".content");
const gridWeatherWatcher = document.querySelector(".gridWeatherWatcher");
const loader = document.querySelector("h2");
var toggleLink = document.getElementById("toggleLink");
var unitDisplay = document.getElementById("unitDisplay");
var unitChange = document.getElementById("unitChange");
var isCelsius = true;

let extractedData = [];

selectBtn.addEventListener("click", () => {
    wrapper.classList.toggle("active");
    content.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
    content.style.color = "white";
});


async function fetchExcelData() {
    try {
        const response = await fetch("./data/city_coordinates.csv");
        const data = await response.text();
        if (data != null) {
            extractedData = parseCSVData(data);
            searchCity.innerHTML = "";
            extractedData.forEach(row => {
                let cityCountry = row.city + ", " + row.country;
                let li = `<li onclick="updateCity(this)">${cityCountry}</li>`;
                cityCountrynames.insertAdjacentHTML("beforeend", li);
            });
        }
        else {
            console.error('Failed to fetch data:', data);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function parseCSVData(data) {
    const lines = data.split('\n');
    const headers = lines[0].split(',');
    const latitudeIndex = headers.indexOf('latitude');
    const longitudeIndex = headers.indexOf('longitude');
    const cityIndex = headers.indexOf('city');
    const countryIndex = headers.indexOf('country');

    const result = [];

    for (let i = 1; i < lines.length; i++) {
        const columns = lines[i].split(',');
        const city = columns[cityIndex];
        const country = columns[countryIndex];
        const latitude = columns[latitudeIndex];
        const longitude = columns[longitudeIndex];

        if (city && country && latitude && longitude) {
            result.push({ city, country, latitude, longitude });
        }
    }

    return result;
}

function updateCity(selectedLi) {
    wrapper.classList.remove("active");
    selectBtn.querySelector(".searchCity").value = selectedLi.innerText;
}


(async function selectedCity() {
    await fetchExcelData();
    let arr = [];
    searchCity.addEventListener("keyup", () => {
        let searchedValue = searchCity.value.toLowerCase();
        arr = extractedData.filter(data => {
            return data.city.toLowerCase().startsWith(searchedValue);
        }).map(data => {
            let cityCountry = data.city + ", " + data.country;
            return `<li onclick="updateCity(this)">${cityCountry}</li>`;
        }).join("");
        cityCountrynames.innerHTML = arr ? arr : "<li>Oops !! No such city exists</li>";
    });
    cityCountrynames.addEventListener('click', function (event) {
        gridWeatherWatcher.innerHTML = "";
        const clickedCity = event.target;
        if (clickedCity.tagName === "LI") {
            const selectedCityCountry = clickedCity.textContent;
            const selectedCity = selectedCityCountry.split(",");
            extractedData.forEach(row => {
                if (row.city === selectedCity[0]) {
                    let latitude = row.latitude;
                    let longitude = row.longitude;
                    const WEATHER_API_URL = `/api?lon=${longitude}&lat=${latitude}&product=civillight&output=json`;
                    fetchWeatherInfo(WEATHER_API_URL);
                }
            });
        }
    });
})();

async function fetchWeatherInfo(url) {
    try {
        showLoader();
        const response = await fetch(url);
        if (response.ok) {
            hideLoader();
            const weatherData = await response.json();
            createWeatherInfoCards(weatherData);
        }
        else {
            console.log("Failed to fetch Weather information");
        }
    } catch (e) {
        console.log("Error fetching weather data : ", e);
    }

}

const weatherIcons = {
    "clear": "/assets/clear.gif",
    "cloudy": "/assets/cloudy.gif",
    "fog": "/assets/fog.gif",
    "humid": "/assets/humid.gif",
    "ishower": "/assets/ishower.gif",
    "lightrain": "/assets/lightrain.gif",
    "lightsnow": "/assets/lightsnow.gif",
    "mcloudy": "/assets/mcloudy.gif",
    "oshower": "/assets/oshower.gif",
    "pcloudy": "/assets/pcloudy.gif",
    "rain": "/assets/rain.gif",
    "snow": "/assets/snow.gif",
    "tsrain": "/assets/tsrain.gif",
    "tstorm": "/assets/tstorm.gif",
    "ts": "/assets/ts.gif",
    "windy": "/assests/windy.gif"
};

const weatherIconInformation = {
    "clear": "Clear",
    "cloudy": "Cloudy",
    "fog": "Fog",
    "humid": "Humid",
    "ishower": "Isolated Showers",
    "lightrain": "Light Rain",
    "lightsnow": "Light Snow",
    "mcloudy": "Very Cloudy",
    "oshower": "Occasional Showers",
    "pcloudy": "Partial Cloudy",
    "rain": "Rain",
    "snow": "Snow",
    "tsrain": "Rain with Thunderstorm",
    "tstorm": "Possible Thunderstorm",
    "ts": "Thunderstorm",
    "windy": "Windy"
};

function formatDate(dateString) {
    const year = dateString.slice(0, 4);
    const month = dateString.slice(4, 6);
    const day = dateString.slice(6, 8);

    const formattedDate = new Date(`${year}-${month}-${day}`);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };

    const dateFormatter = new Intl.DateTimeFormat('en-US', options);
    const formattedDateString = dateFormatter.format(formattedDate);

    let dates = new Date();

    let isToday = dates.getDate() === Number(day);

    return { formattedDateString, isToday };
}

function createWeatherInfoCards(weatherData) {
    if (weatherData != null) {
        const daysWeather = weatherData.dataseries;
        daysWeather.forEach(dayWeather => {
            var { formattedDateString, isToday } = formatDate(dayWeather.date.toString());
            var dailyWeatherDiv = document.createElement("div");
            var dateDiv = document.createElement("div");
            var weatherIconDiv = document.createElement("div");
            var imgDiv = document.createElement("img");
            var weatherInfoDiv = document.createElement("div");
            var maxTempDiv = document.createElement("div");
            var minTempDiv = document.createElement("div");
            var weatherIconInfo = document.createElement("div");

            dateDiv.className = "date";
            weatherIconDiv.className = "weatherIcon";
            imgDiv.className = "bx";
            weatherInfoDiv.className = "weatherInfo";
            maxTempDiv.className = "maxTemp";
            minTempDiv.className = "minTemp";
            weatherIconInfo.className = "weatherIconInfo";

            weatherIconDiv.appendChild(imgDiv);
            weatherInfoDiv.appendChild(weatherIconInfo);
            weatherInfoDiv.appendChild(maxTempDiv);
            weatherInfoDiv.appendChild(minTempDiv);

            dailyWeatherDiv.classList.add("dailyWeather");
            if (isToday) {
                dailyWeatherDiv.classList.add("grid-row-span-2");
            }

            dailyWeatherDiv.appendChild(dateDiv);
            dailyWeatherDiv.appendChild(weatherIconDiv);
            dailyWeatherDiv.appendChild(weatherInfoDiv);

            dateDiv.innerText = formattedDateString;
            imgDiv.setAttribute("src", weatherIcons[dayWeather.weather]);
            weatherIconInfo.innerText = weatherIconInformation[dayWeather.weather];
            maxTempDiv.innerText = "High : " + dayWeather.temp2m.max + " °C";
            maxTempDiv.setAttribute("data-tempHigh", dayWeather.temp2m.max);
            minTempDiv.innerText = "Low : " + dayWeather.temp2m.min + " °C";
            minTempDiv.setAttribute("data-tempLow", dayWeather.temp2m.min);
            gridWeatherWatcher.appendChild(dailyWeatherDiv);
        });
    }
}

function showLoader() {
    loader.classList.add("show");
}
function hideLoader() {
    loader.classList.remove("show");
}

toggleLink.addEventListener("click", () => {
    var usingUnit = document.getElementById("unitDisplay");
    var changeUnit = document.getElementById("unitChange");
    if (document.querySelector(".dailyWeather") != null) {
        var maxTemps = document.querySelectorAll(".maxTemp");
        var minTemps = document.querySelectorAll(".minTemp");
        if (isCelsius) {
            usingUnit.innerText = "Fahrenheit";
            changeUnit.innerText = "°C";
            maxTemps.forEach(i => {
                let maxTemp = i.dataset.temphigh;
                let temperature = maxTemp * 9 / 5 + 32;
                i.innerText = "High : " + temperature + " °F";
            });
            minTemps.forEach(i => {
                let minTemp = i.dataset.templow;
                let temperature = minTemp * 9 / 5 + 32;
                i.innerText = "Low : " + temperature + " °F";
            });
        } else {
            usingUnit.innerText = "Celcius";
            changeUnit.innerText = "°F";
            maxTemps.forEach(i => {
                i.innerText = "High : " + i.dataset.temphigh + " °C";
            });
            minTemps.forEach(i => {
                i.innerText = "Low : " + i.dataset.templow + " °C";
            });

        }
    }
    isCelsius = !isCelsius;
})


