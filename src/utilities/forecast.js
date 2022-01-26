const request = require('postman-request')

const forecast = (lat, long, callback) => {
    const url ='http://api.weatherstack.com/current?access_key=8b7eb3df54fb60ca49dd5f8046a7abb8&query='+long+','+lat+'&units=m'
    request({url, json: true}, (error, {body} = {}) => {
        if (error) {
            const err = 'No internet connection detected for forecast.'
            callback(err, undefined)
        }
        else if (body.error) {
            const err = 'Unable to find location'
            callback(err, undefined)
        }
        else {
            const {temperature:temp, feelslike:feelslike, weather_descriptions:weather, humidity:humidity} = body.current
            const desc = weather[0]
            callback(undefined, {
                temp,
                feelslike,
                desc,
                humidity
            })
        }

    });
}

module.exports = {
    fore: forecast
}