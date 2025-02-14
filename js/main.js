//inout
var searchInp = document.getElementById('Search')

//today variables

var today = document.getElementById('today');
var todayDate = document.getElementById('today-date');
var Name = document.getElementById('name');
var country = document.getElementById('country');
var todayTemp = document.getElementById('today-temp');
var humidity = document.getElementById('humidity');
var wind = document.getElementById('wind');
var windDir = document.getElementById('wind-dir');
var todayIcon = document.getElementById('today-icon')
var todayCondition = document.getElementById('today-status')

//tomorrow variables

var nextDay;
var tomorrow = document.getElementById('tomorrow')
var secondIcon = document.getElementById('second-icon');
var tomorrowTempMax = document.getElementById('tomorrow-temp-max');
var tomorrowTempMin = document.getElementById('tomorrow-temp-min');
var secondCondition = document.getElementById('second-condition');

//third day variables

var thirdday;
var thirdDay = document.getElementById('third-day');
var thirdIcon = document.getElementById('third-icon');
var thirdDayTempMax = document.getElementById('third-day-temp-max');
var thirdDayTempMin = document.getElementById('third-day-temp-min');
var thirdCondition = document.getElementById('third-condition');

var apiresponse;
var responseData;

var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
var months = ['Jan', 'Feb', 'March', 'April', 'May', 'June', 'July', 'Aug', 'Spet', 'Oct', 'Nov', 'Dec']

var todayDetails = document.getElementById('todayDetails');

var city = 'alexandria'
getData(city)


async function getData(location) {
    apiresponse = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=572e08fb1d7547f58d8151525211205&q=${location}&days=3`)
    responseData = await apiresponse.json()
    console.log(responseData);
    displayTemp();


}



function displayTemp() {
    var date = new Date();
    today.innerHTML = days[date.getDay()];
    todayDate.innerHTML = `${date.getDate()} ${months[date.getMonth()]}`
    Name.innerHTML = responseData.location.name
    country.innerHTML = responseData.location.country;
    todayTemp.innerHTML = responseData.current.temp_c
    wind.innerHTML = responseData.current.wind_kph;
    windDir.innerHTML = responseData.current.wind_dir;
    humidity.innerHTML = responseData.current.humidity;
    todayIcon.setAttribute('src', `https:${responseData.current.condition.icon}`)
    todayCondition.innerHTML = responseData.current.condition.text

    nextDay = date.getDay() + 1
    tomorrow.innerHTML = days[nextDay];
    secondIcon.setAttribute('src', `https:${responseData.forecast.forecastday[1].day.condition.icon}`);
    tomorrowTempMax.innerHTML = responseData.forecast.forecastday[1].day.maxtemp_c;
    tomorrowTempMin.innerHTML = responseData.forecast.forecastday[1].day.mintemp_c;
    secondCondition.innerHTML = responseData.forecast.forecastday[1].day.condition.text;

    thirdday = (date.getDay() + 2);
    if (thirdday >= 7) {
        thirdday = 0;
    }


    thirdDay.innerHTML = days[thirdday]
    thirdIcon.setAttribute('src', `https:${responseData.forecast.forecastday[2].day.condition.icon}`);
    thirdDayTempMax.innerHTML = responseData.forecast.forecastday[2].day.maxtemp_c;
    thirdDayTempMin.innerHTML = responseData.forecast.forecastday[2].day.mintemp_c;
    thirdCondition.innerHTML = responseData.forecast.forecastday[2].day.condition.text;
}

searchInp.addEventListener('keydown', function (e) {
    city = e.target.value;
    getData(city);


})


