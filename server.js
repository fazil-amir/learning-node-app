const express = require('express')
const hbs = require('hbs')
const fs = require('fs')

// Init App
const app = express()

// Register hbs partails
hbs.registerPartials(__dirname + '/views/partials')

// Register hbs helper functions
hbs.registerHelper('getCurrentYear', () => new Date().getFullYear())
hbs.registerHelper('screamIt', text => text.toUpperCase())

// Setting view engine to hbs
app.set('view engine', 'hbs')


// Middlewares
app.use((req, res, next) => {
  const now = new Date().toString()
  const log = `${now} : ${req.method} ${req.url}`
  fs.appendFileSync('logs/server.logs', `${log} \n`)
  next()
})

// app.use((req, res, next) => {
//   res.render('maintenance.hbs')
// })

// static middleware
app.use(express.static(__dirname + '/public'))


// Handle Requestss
app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
  })
})

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  })
})

app.get('/contact', (req, res) => {
  res.render('contact.hbs', {
    pageTitle: 'Contact Page',
  })
})


app.listen(3000, () => {
  console.log('App Started')
});