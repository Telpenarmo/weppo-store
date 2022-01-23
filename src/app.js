const express = require("express");

const app = express();
app.get("/", (req, res) => {
    res.send("Hello World!\n")
})

let server;

const port = process.env.PORT;
server = app.listen(port, () => {
    console.log(`App started on port ${port}`);
});
