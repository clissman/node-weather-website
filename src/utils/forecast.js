const request = require('request')

const forecast = (longitude, latitude, callback) => {
    const url = `https://api.darksky.net/forecast/7d6901d24b4915af1f32a940733003b9/${latitude},${longitude}?units=us&lang=en`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, 
                `${body.daily.data[0].summary} It is ${body.currently.temperature} degrees out. There is a ${body.currently.precipProbability}% chance of rain`
            )
        }
    })
}

module.exports = forecast