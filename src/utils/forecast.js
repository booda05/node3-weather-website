const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93d6eee4727b298d6932683b3ed052b9&query='+ latitude +','+longitude
    request ({url, json: true}, (error, { body }) => {
        if (error) { 
            callback('Unable to connect to weather services', undefined)
        }else if (body.error) {
            callback('Unable to find location', undefined)
        }else {
            callback(undefined, body.current.weather_descriptions + '. its currently '+ body.current.temperature + ' degrees out. There is a '+ body.current.precip + '% chance of rain')
        }
    })
}

module.exports = forecast