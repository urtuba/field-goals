import { v4 as uuidv4 } from 'uuid'
import GameManager from './game-manager.js'

class AppManager {
    constructor() {
        this.games = {}
        this.appId = uuidv4()
    }

    addGame(t1Name, t2Name) {
        const gameId = uuidv4()
        this.games[gameId] = new GameManager(t1Name, t2Name)
        return gameId
    }

    getGame(gameId) {
        return this.games[gameId]
    }

    triggerTime(gameId) {
        return this.games[gameId].triggerTime()
    }

    addPlayers(gameId, teamId, players) {
        this.games[gameId].addPlayers(teamId, players)
    }

    addAttempt(gameId, teamId, playerNo, x, y, weight, success, ft) {
        this.games[gameId].addAttempt(teamId, playerNo, x, y, weight, success, ft)
    }

    getQuarters(gameId) {
        return this.games[gameId].getQuarters()
    }

    getAttempts(gameId, team, qtr, players) {
        return this.games[gameId].getAttempts(team, qtr, players)
    }

    getTeams(gameId) {
        return this.games[gameId].getTeams()
    }

    getScoreboard(gameId) {
        return this.games[gameId].getScoreboard()
    }
}

export default new AppManager()