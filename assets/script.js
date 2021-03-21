let apiKey = "b879af1c69908645a6c452af1f05c5f4";

// let currWeatherTab = document.getElementById("nav-current");
let cityName = document.getElementById("city-name");
let icon = document.getElementById("current-icon");
let temp = document.getElementById("temp");
let humidity = document.getElementById("humidity");
let windSpeed = document.getElementById("wind-speed");
let uvIndex = document.getElementById("uv-index");

let queryList = document.getElementById("query-list");
let userQuery = document.getElementById("user-query");
let answerFromSearch = "Denton";
putWDataToScreen();

let firstCardDate = document.getElementById("first-date");
let firstCardIcon = document.getElementById("first-icon");
let firstCardHigh = document.getElementById("first-high");
let firstCardLow = document.getElementById("first-low");
let firstCardHumidity = document.getElementById("first-humidity");

let secondCardDate = document.getElementById("second-date");
let secondCardIcon = document.getElementById("second-icon");
let secondCardHigh = document.getElementById("second-high");
let secondCardLow = document.getElementById("second-low");
let secondCardHumidity = document.getElementById("second-humidity");

let thirdCardDate = document.getElementById("third-date");
let thirdCardIcon = document.getElementById("third-icon");
let thirdCardHigh = document.getElementById("third-high");
let thirdCardLow = document.getElementById("third-low");
let thirdCardHumidity = document.getElementById("third-humidity");

let fourthCardDate = document.getElementById("fourth-date");
let fourthCardIcon = document.getElementById("fourth-icon");
let fourthCardHigh = document.getElementById("fourth-high");
let fourthCardLow = document.getElementById("fourth-low");
let fourthCardHumidity = document.getElementById("fourth-humidity");

let fifthCardDate = document.getElementById("fifth-date");
let fifthCardIcon = document.getElementById("fifth-icon");
let fifthCardHigh = document.getElementById("fifth-high");
let fifthCardLow = document.getElementById("fifth-low");
let fifthCardHumidity = document.getElementById("fifth-humidity");

let keyList = Object.keys(localStorage);
let queryIter = 0;

keyList.forEach(key => {
    let newListItem = document.createElement("button");
    newListItem.setAttribute("class", "list-group-item list-group-item-action");
    newListItem.textContent = localStorage.getItem(key);
    queryList.appendChild(newListItem);

    queryIter++;

    newListItem.addEventListener("click", event => {
        answerFromSearch = event.target.textContent;
        putWDataToScreen();
    })
})

firstCardDate.textContent = moment().add(1, 'days').format('L');
secondCardDate.textContent = moment().add(2, 'days').format('L');
thirdCardDate.textContent = moment().add(3, 'days').format('L');
fourthCardDate.textContent = moment().add(4, 'days').format('L');
fifthCardDate.textContent = moment().add(5, 'days').format('L');


function putWDataToScreen() {
fetch(`https://api.openweathermap.org/data/2.5/weather?q=${answerFromSearch}&appid=${apiKey}`, {
    method: "GET"
})
.then(response => {
    // console.log(response.json());
    return response.json();
})
.then(data => {
    let lat = data.coord.lat;
    let lon = data.coord.lon;
    // console.log(lat, lon);
    return fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial&exclude=hourly,minutely,alerts`);
})
.then(response => {
    // console.log(response.json());
    return response.json();
})
.then(data => {
    let currIcon = `https://openweathermap.org/img/w/${data.current.weather[0].icon}.png`;
    // console.log(currIcon);
    cityName.textContent = answerFromSearch;
    icon.setAttribute("src", `${currIcon}`);
    temp.textContent = data.current.temp;
    humidity.textContent = data.current.humidity;
    windSpeed.textContent = data.current.wind_speed;
    uvIndex.textContent = data.current.uvi;
    // console.log(firstCardHigh);
    // console.log(data.daily[0]);
    firstCardIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.daily[0].weather[0].icon}.png`);
    firstCardHigh.textContent = data.daily[0].temp.max;
    firstCardLow.textContent = data.daily[0].temp.min;
    firstCardHumidity.textContent = data.daily[0].humidity;

    secondCardIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.daily[1].weather[0].icon}.png`);
    secondCardHigh.textContent = data.daily[1].temp.max;
    secondCardLow.textContent = data.daily[1].temp.min;
    secondCardHumidity.textContent = data.daily[1].humidity;

    thirdCardIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.daily[2].weather[0].icon}.png`);
    thirdCardHigh.textContent = data.daily[2].temp.max;
    thirdCardLow.textContent = data.daily[2].temp.min;
    thirdCardHumidity.textContent = data.daily[2].humidity;

    fourthCardIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.daily[3].weather[0].icon}.png`);
    fourthCardHigh.textContent = data.daily[3].temp.max;
    fourthCardLow.textContent = data.daily[3].temp.min;
    fourthCardHumidity.textContent = data.daily[3].humidity;

    fifthCardIcon.setAttribute("src", `https://openweathermap.org/img/w/${data.daily[4].weather[0].icon}.png`);
    fifthCardHigh.textContent = data.daily[4].temp.max;
    fifthCardLow.textContent = data.daily[4].temp.min;
    fifthCardHumidity.textContent = data.daily[4].humidity;
})
.catch(error => console.error(error))
}

function saveRenderUserQuery() {
    localStorage.setItem(`${queryIter}`, `${answerFromSearch}`)

    let newListItem = document.createElement("button");
    newListItem.setAttribute("class", "list-group-item list-group-item-action");
    newListItem.textContent = answerFromSearch;
    queryList.appendChild(newListItem);

    queryIter++;

    newListItem.addEventListener("click", event => {
        answerFromSearch = event.target.textContent;
        putWDataToScreen();
    })
}

let submitBtn = document.getElementById("submit-btn");

submitBtn.addEventListener("click", function() {
    tempString = userQuery.value;
    answerFromSearch = tempString.charAt(0).toUpperCase() + tempString.slice(1);
    putWDataToScreen();
    saveRenderUserQuery();
})

let orientControl = document.getElementById("row-col");
let searchContainer = document.getElementById("search-container")
let weatherContainer = document.getElementById("weather-data");

if ((orientControl.className.split(" ")[0] === "row") && (window.innerWidth < 993)) {
    orientControl.className = "col";
    searchContainer.className = "col-auto";
    weatherContainer.className = "col-auto";
}

window.addEventListener("resize", () => {
    if ((orientControl.className.split(" ")[0] === "row") && (window.innerWidth < 993)) {
        orientControl.className = "col";
        searchContainer.className = "col-auto";
        weatherContainer.className = "col-auto";
    }
    if ((orientControl.className.split(" ")[0] === "col") && (window.innerWidth > 992)) {
        orientControl.className = "row";
        searchContainer.className = "col-4";
        weatherContainer.className = "col-8";
    }
})