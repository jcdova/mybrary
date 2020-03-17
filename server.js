const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')


const indexRouter = require('./routes/index')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

const mongoose = require('mongoose')

const database = require('./keys').mongoURI;
// mongoose.connect('mongodb://jcdova:mixx49@ds233208.mlab.com:33208/mybrary', {
//   useNewUrlParser: true, useUnifiedTopology: true
// })
mongoose.connect(database, {
  useNewUrlParser: true, useUnifiedTopology: true
})

const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongooose'))


app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)