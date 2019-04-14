const path = require('path')
const express = require('express')
const chalk = require('chalk')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express Configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = (path.join(__dirname, '../templates/views'))
const partialsPath = (path.join(__dirname, '../templates/partials'))

// Sets templating engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Chris Lissman'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Chris Lissman'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'This is the help message.',
        title: 'Help',
        name: 'Chris Lissman'
    })
})

app.get('/weather', (req, res) => {
    
    if (!req.query.address) {
        return res.send({
            error: "Address must be provided"
        })
    }
    
    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error }) 
        } 

        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }

            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Lissman',
        errorMessage: 'Help Article Not Found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Chris Lissman',
        errorMessage: 'Page not found.'
    })
})

app.listen(port, () => {
    console.log(chalk.blue.inverse('Server started on port ' + port  ))
})

