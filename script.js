const api = {
    key: 'ea814797a5f21eacb81307ccbd568ca5',
    baseurl: 'https://api.openweathermap.org/data/2.5/'
};
const searchbox = document.querySelector('.search-box');

searchbox.addEventListener("keypress", setQuery);
function setQuery(e) {
    getResults(searchbox.value);
    if (e.keyCode === 13) {
        console.log(searchbox.value);
    }
}

function getResults(query) {
    fetch(`${api.baseurl}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then(weather => {
            return weather.json();
        })
        .then(displayResults);
}

function displayResults(weather) {

    console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerHTML = `${weather.name},${weather.sys.country}`;
    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerHTML = dateBuilder(now);
    let temp = document.querySelector('.temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;        
    let weatherEl = document.querySelector('.weather');
    weatherEl.innerHTML = weather.weather[0].main;
    let hilow = document.querySelector('.hi-low');
    hilow.innerHTML =`${Math.round(weather.main.temp_min)}<span>°C</span>/${Math.round(weather.main.temp_max)}<span>°C</span>`;
}


function dateBuilder(o) {
    let months = ['Janiary', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thusday', 'Friday', 'Satirday'];
    let day = days[o.getDay()];
    let date = o.getDate();
    let month = months[o.getMonth()];
    let year = o.getFullYear();


    return `${day} ${date} ${month} ${year}`;
}