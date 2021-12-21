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
        return this.games[gameId].getAttempts()
    }
}

export default new AppManager()