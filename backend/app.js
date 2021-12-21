const express = require('express')
const app = express()
const HTTP_PORT = process.env.PORT || 8080

app.listen(HTTP_PORT, () => {
    console.log(`Server running on port ${HTTP_PORT}`)
})

app.get('/', (req, res) => {
    res.json({'message': 'OK'})
})

app.use((req, res, next) => {
    res.status(404).json({'message': 'Not found'})
})

