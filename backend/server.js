import express from 'express'

const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', 'pages')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req, res) => {
    res.render('index', {

    })
})

app.post('/', async (req, res) => {
    res.render('index', {

    })
})

app.delete('/:id', async(req, res) => {
    res.render('index', {

    })
})

app.put('/:id', async(req, res) => {
    res.render('index', {

    })
})

app.listen(port)
