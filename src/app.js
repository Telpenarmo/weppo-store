const express = require('express')
const port = process.env.PORT
const app = express()

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.get("/", (req, res) => {
    res.render('index', { 
        title: 'Hello world', 
        message: 'Hello world!'
    })
})

app.use('/assets', express.static(__dirname + '/public'))

app.listen(port, () => {
    console.log(`App started on port ${port}`)
});
