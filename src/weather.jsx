import 'whatwg-fetch'

// To add to window
if (!window.Promise) {
  window.Promise = Promise;
}

var proxy = "https://cors-anywhere.herokuapp.com/"

export var info = {
    'lat': '32.425',
    'lng': '-85.6911'
};

export async function apiGetWeatherToday() {
    let url = `https://weather.weatherbug.com/api/observation?lat=${info.lat}&lng=${info.lng}&providerId=3&stationId=NG044&timestamp=${Date.now()}`;
    var data = {
        //date: null,
        temp: null,
        h: null,
        l: null,
        ico: null,
        desc: null,
        hum: null,
        dew: null
    };

    await fetch(proxy+url).then(resp => resp.json())
    .then(json => {
        data.temp = json.Observation.TemperatureDisplay;
        data.h = json.HighLow.TemperatureHigh;
        data.l = json.HighLow.TemperatureLow;
        data.ico = apiGetWeatherIcon(json.Observation.IconCode);
        data.hum = json.Observation.Humidity;
        data.dew = json.Observation.DewPointDisplay;
    });

    return data;
}

export async function apiGetWeatherWeek() {
    let url = `https://weather.weatherbug.com/api/forecasts/daily?includeObservation=true&lat=${info.lat}&lng=${info.lng}&timestamp=${Date.now()}`;
    var processed = [];

    await fetch(proxy+url/*,
    {
        method: 'GET',
        headers: {
            Accept: 'application/json',
            Origin: 'null'
        },
    }*/).then(resp => resp.json())
    .then(json => {
        json.slice(1, 8).forEach(function(w) {
            var dt = new Date(Date.parse(w.Day.ForecastDateLocalStr));

            var cast = {
                day: convertDay(dt.getDay()),
                ico: w.Day.IconCode,
                high: w.Day.Temperature,
                low: w.Night.Temperature,
                desc: w.Day.DetailedDescription
            }

            processed.push(cast);
        }, this);
    });

    console.log(processed);
    return processed;
}

export function convertDay(d) {
    switch(d){
        case 0:
            return 'SUN';
        case 1:
            return 'MON';
        case 2:
            return 'TUE';
        case 3:
            return 'WED';
        case 4:
            return 'THU';
        case 5:
            return 'FRI';
        case 6:
            return 'SAT';
        default:
            return 'INV';
    }
}

export function apiGetWeatherIcon(i) {
    var token = 'c8ccaad9-43d9-4a3e-8ba9-78ac4aaf1b9f';
    var href = `https://d3ltyiavrr2h27.cloudfront.net/resources/v1/resource/IconByCodeV1?iconset=forecast&iconSize=svglarge&iconCode=${i}&token=${token}`;

    return href;
}