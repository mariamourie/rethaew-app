'use strict';

const btnLocation = document.querySelector('.btn-location');
const btnWeather = document.querySelector('.btn-weather');
const btnWind = document.querySelector('.btn-wind');

$(document).ready(function (){
    document.querySelector('.date').innerHTML = getInfoDay();
    $('.wind').hide();
    $('.more-info').hide();
    $('.weather-informations').hide();

});

btnLocation.addEventListener('click', function(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        alert('Não foi possível carregar temperatura');
    }
});

btnWeather.addEventListener('click', () => {
    $('.weather').show();
    $('.wind').hide();
});

btnWind.addEventListener('click', () => {
    $('.wind').show();
    $('.weather').hide();
});

function getPosition(position){
    $('.btn-location').hide();
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    const request = async (url) => {
        const response = await fetch(url);
        return response.ok ? response.json() : Promise.reject({error: 500});
    };
    const getWeatherInfo = async ( element, form ) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5fbd511b448f5728a538d1bf60c3e630&units=metric&lang=pt_br`;
            const response = await request(url);
            const infoWeather = JSON.stringify(response);
            localStorage.setItem('testJSON', infoWeather);
            setWeatherInfo(localStorage.getItem('testJSON'));
            $('.banner-img').hide();
            $('.weather-informations').show();
            $('.more-info').show();
        } catch(err) {
            console.log(err);
        }
    };
    getWeatherInfo();
}

function setWeatherInfo(text){
    const obj = JSON.parse(text);
    document.querySelector('.location').innerHTML += `${obj.name}, ${obj.sys.country}`;
    document.querySelector('.temperature').innerHTML = `${obj.main.temp}°C`;
    document.querySelector('.humidity').innerHTML = `${obj.main.humidity}%`;
    document.querySelector('.feels-like-temperature').innerHTML = `Sensação térmica de ${obj.main.feels_like} °C`;
    document.querySelector('.cloud').innerHTML = `${obj.clouds.all}%`;
    document.querySelector('.visibility').innerHTML = `${obj.visibility} km`;
    document.querySelector('.max-temperature').innerHTML = `${obj.main.temp_max} °C`;
    document.querySelector('.min-temperature').innerHTML = `${obj.main.temp_min} °C`;
    document.querySelector('.wind-speed').innerHTML = `${obj.wind.speed} m/seg`;
    document.querySelector('.wind-degree').innerHTML = `${obj.wind.deg}°`;
    document.querySelector('.wind-gust').innerHTML = `${obj.wind.gust} m/seg`;
    document.querySelector('.main-description').innerHTML = `${formatDescription(obj.weather[0].description)}`;
    document.querySelector('.icon-weather').setAttribute(`src`, `http://openweathermap.org/img/w/${obj.weather[0].icon}.png`);
    $('icon-weather').show();
}

function formatDescription(desc){
    return desc.replace(desc[0], desc[0].toUpperCase());
}

function getInfoDay(){
    const date = new Date();
    const week = getDayOfWeek(date.getDay());
    const month = getMonth(date.getMonth());
    if (date.getMinutes() < 10){
        return `${week}, ${date.getDate()} de ${month}, ${date.getHours()}:0${date.getMinutes()}.`;
    } else {
        return `${week}, ${date.getDate()} de ${month}, ${date.getHours()}:${date.getMinutes()}.`;
    }
}

function getMonth(month){
    switch(month){
        case 0:{
            return 'janeiro';
        }
        case 1:{
            return 'ferreiro';
        }
        case 2:{
            return 'março';
        }
        case 3:{
            return 'abril';
        }
        case 4:{
            return 'maio';
        }
        case 5:{
            return 'junho';
        }
        case 6:{
            return 'julho';
        }
        case 7:{
            return 'agosto';
        }
        case 8:{
            return 'setembro';
        }
        case 9:{
            return 'outubro';
        }
        case 10:{
            return 'novembro';
        }
        case 11:{
            return 'dezembro';
        }
    }
}

function getDayOfWeek(day){
    switch(day){
        case 0:{
            return 'Dom';
        }
        case 1:{
            return 'Seg';
        }
        case 2:{
            return 'Ter';
        }
        case 3:{
            return 'Qua';
        }
        case 4:{
            return 'Qui';
        }
        case 5:{
            return 'Sex';
        }
        case 6:{
            return 'Sáb';
        }
    }
}