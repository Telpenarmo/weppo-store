const express = require("express");
const port = process.env.PORT;
const app = express();

app.set('view engine', 'pug')

app.get("/", (req, res) => {
    res.render('index', { 
        title: 'Hello world', 
        message: 'Hello world!'
    })
})

let server = app.listen(port, () => {
    console.log(`App started on port ${port}`)
});
