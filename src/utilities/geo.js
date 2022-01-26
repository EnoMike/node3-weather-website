const request = require('postman-request')

const geo = (address, callback) => {
    const url ='https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiZ2xvcnkyMiIsImEiOiJja3lseHV6bXUydHRmMnVxaHpzcjBmYWNsIn0.Cblv9TyqqZEVCyS6XvEn5g&limit=1'
    request({url, json: true}, (error, {body} = {}) => {

        if (error) {
            const err = 'No internet connection detected for geo.'
            callback(err, undefined)
        }
        else if (body.features.length === 0) {
            const err = 'Check your input, something is wrong'
            callback(err, undefined)
        }
        else {
            const {center:center, place_name:place} = body.features[0]
            const lat = center[0]
            const long = center[1]
            callback(undefined, {
                lat,
                long,
                place
            })
        }
    });
}

module.exports = {
    geo
}