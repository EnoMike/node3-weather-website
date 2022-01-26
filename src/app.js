const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utilities/forecast')
const geo = require('./utilities/geo')

// console.log(__dirname)
// console.log(path.join(__dirname, '../public'))

const app = express()

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')


//Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Glory'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Glory'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Glory'
    })
})
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

//app.com
//app.com/help
//app.com/about

// app.get('/help', (req, res) => {
//     // res.send('Help page')
// //     res.send([{
// //         name: 'Glory'
// //     },
// //         {
// //             age: 22
// //         }
    
// //    ])
//         const helpDirPath = path.join(__dirname, '../public/help')
//         res.send(express.static(helpDirPath))
// })

// app.get('/about', (req, res) => {
//     // res.send('<h2>About Page</h2>')
//     const aboutDirPath = path.join(__dirname, '../public/about')
//     res.send(express.static(aboutDirPath))
// })

app.get('/weather', (req, res) => {
    // res.send('Your weather is perfect.')
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }
    else {           
        geo.geo(req.query.address, (error, {lat, long, place} = {}) => {
            if(error) {
                return res.send({error})
            }
        
            forecast.fore(lat, long, (error1, {temp, feelslike, desc} = {}) => {
                if(error1) { 
                    return res.send({error: error1})
                }
                // res.send(desc + '. It is currently '+temp+' degrees out in '+place+'. It feels like '+feelslike+' degrees out');
                res.send({
                    data: desc + '. It is currently '+temp+' degrees out in '+place+'. It feels like '+feelslike+' degrees out'
                })
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help Article',
        name: 'Glory',
        errorMessage: 'Help article not found.'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Glory',
        pageAbsent: 'Page not found.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})

