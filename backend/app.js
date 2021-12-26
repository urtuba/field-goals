import Express from "express"
import appManager from "./app-manager.js"

const app = Express()
const port = 3000

app.use(Express.json())

// check if api works
app.get('/health', (req, res) => {
    console.log("health check")
    res.json({'status': true})
})

// add game
app.post('/game', (req, res) => {
    console.log('add game')
    const gameId = appManager.addGame(req.body.team1Name, req.body.team2Name)
    res.json({
        'status': true,
        'data': {
            'game': gameId
        }
    })
})

// get game
app.get('/game', (req, res) => {
    console.log('get game')
    const gameId = req.query.gameId
    const game = appManager.getGame(gameId)
    res.json({
        'status': true,
        'data': {
            'game': game
        }
    })
})

// get all games
app.get('/game/all', (req, res) => {
    console.log('get all games')
    res.json({
        'status': true,
        'data': [appManager.games] 
    })
})

// addPlayers to team
app.post('/game/players', (req, res) => {
    console.log('add players to team')
    const gameId = req.query.gameId
    const teamId = req.body.teamId
    const players = req.body.players // array of players [{name, number, role}]
    console.log(players)
    appManager.addPlayers(gameId, teamId, players)
    res.json({
        'status': true,
        'data': {
            'game': gameId,
            'team': teamId,
            'players': players
        }
    })
})

// trigger time
app.get('/game/trigger', (req, res) => {

    const gameId = req.query.gameId
    const success = appManager.triggerTime(gameId)
    const quarters = appManager.getQuarters(gameId)

    let quarter
    if((quarters.length == 4) && (quarters[3].end != null)) {
        quarter = 5
    } else {
        quarter = quarters.length
    }

    res.json({
        'status': success,
        'data': {
            'game': gameId,
            'quarter': quarter
        }
    })
})

// add attempt
app.post('/game/attempt', (req, res) => {
    console.log('add attempt')
    const gameId = req.query.gameId

    const teamId = req.body.teamId
    const playerNo = req.body.playerNo
    const x = req.body.x
    const y = req.body.y
    const weight = req.body.weight
    const success = req.body.success
    const ft = req.body.ft
    console.log(gameId, teamId, playerNo, x, y, weight, success, ft)
    appManager.addAttempt(gameId, teamId, playerNo, x, y, weight, success, ft)
    
    res.json({
        'status': true,
        'data': {
            'game': gameId
        }
    })
})

// get scoreboard
app.get('/game/scoreboard', (req, res) => {
    console.log('get scoreboard')
    const gameId = req.query.gameId
    const teams = appManager.getTeams(gameId)
    const scoreboard = appManager.getScoreboard(gameId)

    res.json ({
        'status': true,
        'data': {
            'game': gameId,
            'teams': teams,
            'scoreboard': scoreboard
        }
    })
})

// get attempts
app.get('/game/attempts', (req, res) => {
    console.log('get attempts')
    const gameId = req.query.gameId
    const team = req.body.team
    const qtr = req.body.quarter
    const players = req.body.players
    const attempts = appManager.getAttempts(gameId, team, qtr, players)

    res.json ({
        'status': true,
        'data': {
            'game': gameId,
            'attempts': attempts
        }
    })
})

app.use((req, res, next) => {
    console.log('404')
    res.status(404).json({'status': false})
})

app.listen(port, () => console.log(`Field Goals app listening on port ${port}!`))