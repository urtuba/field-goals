import Express from "express"
import appManager from "./app-manager.js"

const app = Express()
const port = 3000

app.use(Express.json())

app.get('/health', (req, res) => {
    res.json({'status': true})
})

app.post('/game', (req, res) => {
    const gameId = appManager.addGame(req.body.team1Name, req.body.team2Name)
    console.log(req)
    res.json({
        'status': true,
        'data': {
            'game': gameId
        }
    })
})

app.get('/game/all', (req, res) => {
    res.json({
        'status': true,
        'data': [appManager.games] 
    })
})

app.get('/game', (req, res) => {
    const gameId = req.query.gameId
    const gameManager = appManager.games[gameId]
    const teams = gameManager.getTeams()
    const shoots = gameManager.getAttempts()

    res.json({
        'status': true,
        'data': {
            'game': gameId,
            'teams': teams,
            'shoots': shoots
        }
    })
})


app.use((req, res, next) => {
    res.status(404).json({'status': false})
})

app.listen(port, () => console.log(`Field Goals app listening on port ${port}!`))



