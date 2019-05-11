const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define path for express config
const publicDirectorypath = path.join(__dirname, '../public')
const partialPath = path.join(__dirname, '../templates/partials')
const viewsPath = path.join(__dirname, '../templates/views')


//setup handlebars engine and views locations 
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

app.use(express.static(publicDirectorypath))

app.get('', (req, res) => {
    res.render('index', {
        title: "Weather",
        Name: "Anda"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About me",
        Name: "Anda"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'Help message',
        title: 'Help',
        Name: 'Anda'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
       return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} ={} )=>{
        if(error){
            return res.send({error})
        }   
        
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send ({error})
            }

            res.send({
                forecast:forecastData, 
                location,
                address: req.query.address
            })
        })

    })  


    
})


app.get('/products', (req, res) =>{
    if(!req.query.search){
       return res.send({
            error: "You must provide a search message"
        })
    }
    res.send( {
       products: []
    })

})
app.get('*', (req,res) =>{
    res.render('404', {
        title: "404 Page not found",
        Name: "Anda",
        errorMessage: "Page not found"
    })

})

app.listen(3000, () => {
    console.log('server is up on port 3000')
})