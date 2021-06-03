const request = require('request')

const geocode = (address, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=93d6eee4727b298d6932683b3ed052b9&query=' + address
    request({url, json: true}, (error, {body}) => {
            if (error) {
                callback('Unable to connect to location services !!', undefined)
            }else if (body.error) {
                callback('unable to find location ! try another search', undefined)
            }else {
                callback(undefined, {
                    latitude: body.location.lat,
                    longitude: body.location.lon,
                    location: body.location.name +' '+ body.location.region +' '+ body.location.country
                })
            }
    })
}

module.exports = geocode