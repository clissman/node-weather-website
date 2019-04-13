const request = require('request')

const geocode = (address, callback) => {
    if (!address) return console.log(object)
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?limit=1&access_token=pk.eyJ1IjoiY2xpc3NtYW4iLCJhIjoiY2p1OHF3cHU3MG90ejN5cGxta3Z5M21haCJ9.D-3ZbqJTBqPVUvH9S5uHzA`
    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services', undefined)
        } else if (body.features.length == 0) {
            callback('Location not found. Try another search.', undefined)
        } else {
            callback(undefined, {
                latitude: body.features[0].center[0],
                longitude: body.features[0].center[1],
                location: body.features[0].place_name
            })
        }
    })
}

    

// Why can't I send this as a object like I do in notes?
module.exports = geocode