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

export function apiGetWeatherToday() {
    let url = `https://weather.weatherbug.com/api/observation?&lat=${info.lat}&lng=${info.lng}&timestamp=${Date.now()}`;
    var data;

    fetch(proxy+url).then(resp => resp.json())
    .then(body => {
        data = JSON.parse(body)
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
                'day': convertDay(dt.getDay()),
                'ico': w.Day.IconCode,
                'high': w.Day.Temperature,
                'low': w.Night.Temperature
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