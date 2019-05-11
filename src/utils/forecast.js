const request = require ('request')

const forecast = (latitude, longitude, callback) => {

    const url = 'https://api.darksky.net/forecast/167e6e8863e47b1906301ecd17b427a6/' + latitude + ',' + longitude +'?units=si'

    request({url, json:true}, (error, {body}) => {
        if(error){
           callback('unable to connect to internet', undefined)

        }else if(body.error){
            callback('unable to find location', undefined)

        }else{

          
            callback( undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.') 
        
            
        }
    })
}

module.exports = forecast