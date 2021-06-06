const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlbars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'abdou '
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'abdou'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name:  'abdou'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send ({
            error: 'You must Provide an address !!'
        })
        
    }
    geocode(req.query.address, (error, {latitude, longetitude,location} = {}) => {
        if (error){
            return res.send({error})
        }

        forecast(latitude, longetitude, (error, forecastData) => {
            if (error){
                res.send({error}  )
            }

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    }) 
   
    // res.send([
    //     {
    //         forecast: 'its raining',
    //         address: req.query.address,
    //         state: 'Massachusetts',
    //         country: 'United State of America'
    //     }
    // ])
})
//app.com
//app.comm/help
//app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name:   'abdou',
        errorMessage: 'Help Page not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name:   'abdou',
        errorMessage: '404 Page not found'
    })
})

app.listen(port, () => {
    console.log('SERVER IS UP ON PORT ' + port )
})

