import express from "express"
import { dirname } from "path"
import { fileURLToPath } from "url"

const port = process.env.PORT
const app = express()
const workdir = dirname(fileURLToPath(import.meta.url))

app.set('view engine', 'pug')
app.set('views', workdir + '/views')
app.locals.site = { title: 'WEPPO-STORE' }

app.get("/", (req, res) => {
  res.render('index', {
    message: 'Hello world!'
  })
})

app.use('/assets', express.static(workdir + '/public'))

app.listen(port, () => {
  console.log(`App started on port ${port}`)
})
