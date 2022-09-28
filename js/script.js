'use strict';

const btnLocation = document.querySelector('.btn-location');
const btnWeather = document.querySelector('.btn-weather');
const btnWind = document.querySelector('.btn-wind');

$(document).ready(function (){
    document.querySelector('.date').innerHTML = getInfoDay();
    $('.wind, .more-info, .weather-informations').hide();

});
$(btnLocation).click(() => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(getPosition);
    } else {
        alert('Não foi possível carregar temperatura');
    }
});
$('.btn-weather').click(() => {
    $('.weather').show();
    $('.wind').hide();  
});

$('.btn-wind').click(() => {
    $('.wind').show();
    $('.weather').hide();
}); 

function getPosition(position){
    $('.btn-location, .btn-location + p').hide();
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const request = async (url) => {
        const response = await fetch(url);
        return response.ok ? response.json() : Promise.reject({error: 500});
    };
    const getWeatherInfo = async ( element, form ) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=5fbd511b448f5728a538d1bf60c3e630&units=metric&lang=pt_br`;
            const response = await request(url);
            const infoWeather = JSON.stringify(response);
            setWeatherInfo(infoWeather);
            $('.banner-img').hide();
            $('.weather-informations, .more-info').show();
        } catch(err) {
            $('.banner-img').empty().append('Erro: ', erro);
        }
    };
    getWeatherInfo();
}

function setWeatherInfo(text){
    const obj = JSON.parse(text);
    $('.location').append(`${obj.name}, ${obj.sys.country}`);
    $('.temperature').append(`${obj.main.temp}°C`);
    $('.humidity').append(`${obj.main.humidity}%`);
    $('.feels-like-temperature').append(`Sensação térmica de ${obj.main.feels_like} °C`);
    $('.cloud').text(`${obj.clouds.all}%`);
    $('.visibility').append(`${obj.visibility} km`);
    $('.max-temperature').append(`${obj.main.temp_max} °C`);
    $('.min-temperature').append(`${obj.main.temp_min} °C`);
    $('.wind-speed').append(`${obj.wind.speed} m/seg`);
    $('.wind-degree').append(`${obj.wind.deg}°`);
    $('.wind-gust').append(`${obj.wind.gust} m/seg`);
    $('.main-description').append(`${formatDescription(obj.weather[0].description)}`);
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
        return `${week}, ${date.getDate()} de ${month} de ${date.getFullYear()} | ${date.getHours()}:0${date.getMinutes()}.`;
    } else {
        return `${week}, ${date.getDate()} de ${month} de ${date.getFullYear()} | ${date.getHours()}:${date.getMinutes()}.`;
    }
}

function getMonth(month){
    switch(month){
        case 0:{
            return 'jan.';
        }
        case 1:{
            return 'fev.';
        }
        case 2:{
            return 'mar.';
        }
        case 3:{
            return 'abr.';
        }
        case 4:{
            return 'mai.';
        }
        case 5:{
            return 'jun.';
        }
        case 6:{
            return 'jul.';
        }
        case 7:{
            return 'ago.';
        }
        case 8:{
            return 'set.';
        }
        case 9:{
            return 'out.';
        }
        case 10:{
            return 'nov.';
        }
        case 11:{
            return 'dez.';
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