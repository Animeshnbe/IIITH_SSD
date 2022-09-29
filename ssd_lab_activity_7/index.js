const express = require('express')

const app = express()
const port = process.env.PORT || 3000

function mWare(req, res, next){
    console.log("Logging...")
    if (req.query.admin === 'ashish'){
        req.admin = true
    }
    next()
}

// app.use(mWare)

app.get('/', (req, res) => {
    res.send("Hello World")
})

app.get('/page/:id', mWare, (req, res) => {
    req.params.id
    req.query
    res.send("Hello World")
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.post('/', (req, res) => {
    res.send("Hello World")
})

app.listen(port, () => console.log('Listening on port 3000'))