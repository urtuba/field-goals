import Game from "./models/game.js"
import Team from "./models/team.js"
import Attempt from "./models/attempt.js"
import Quarter from "./models/quarter.js"

class GameManager {
    constructor(t1Name, t2Name) {
        const team1 = new Team(1, t1Name, [])
        const team2 = new Team(2, t2Name, [])
        this.game = new Game(team1, team2)
    }

    #addPlayer(teamId, name, number, role) {
        const team = teamId == 1 ? this.game.team1 : this.game.team2
        team.addPlayer(name, number, role)
    }

    addPlayers(teamId, players) {
        players.forEach(player => {
            this.#addPlayer(teamId, player[0], player[1], player[2])
        })
    }

    getTeams() {
        return {
            team1: this.game.team1,
            team2: this.game.team2
        }
    }

    triggerTime() {
        // check if the game is not started
        if(this.game.quarters.length == 0) {
            const q1 = new Quarter(new Date().getTime())
            this.game.quarters.push(q1)
            return false
        }

        // check if game ended
        if(this.game.quarters.length == 4 && this.game.quarters[3].end != null)
            return false
        
        // check if quarter ended
        if(this.game.quarters[this.game.quarters.length - 1].end != null) {
            const newQuarter = new Quarter(new Date().getTime())
            this.game.quarters.push(newQuarter)
            return true
        }

        // check if quarter started but not ended
        if(this.game.quarters[this.game.quarters.length - 1].end == null) {
            this.game.quarters[this.game.quarters.length - 1].end = new Date().getTime()
            return true   
        }
    }

    addAttempt(teamId, playerNo, x, y, weight, success, ft) {
        const attempt = new Attempt(teamId, playerNo, x, y, weight, success, ft)
        this.game.shoots.push(attempt)

        return true
    }

    #quarterFilter(qtr, shoots) {
        console.log(qtr, shoots)
        if(qtr == 0)
            return shoots
        else if (this.game.quarters.length == qtr && this.game.quarters[qtr - 1].end == null)
            return shoots.filter(shoot => shoot.time >= this.game.quarters[qtr - 1].start)
        else
            return shoots.filter(shoot => shoot.time >= this.game.quarters[qtr - 1].start && shoot.time <= this.game.quarters[qtr - 1].end)
    }

    #playersFilter(players, shoots) {
        console.log(players, shoots)
        if (players.length == 0)
            return shoots
        else
            return shoots.filter(shoot => players.includes(shoot.player))
    }

    getAttempts(team = 1, qtr = 0, players = []) {
        const shoots = this.game.shoots
        console.log(shoots)

        const filteredShoots = this.#playersFilter(players, this.#quarterFilter(qtr, shoots))
        console.log(filteredShoots)

        return filteredShoots.filter(shoot => shoot.team == team)
    }

    getQuarters() {
        return this.game.quarters
    }

    getScore(team = 1) {
        let score = 0
        this.game.shoots.forEach(shoot => {
            if(shoot.team == team && shoot.success)
                score += shoot.weight
        })
        return score
    }

    getScoreboard() {
        return {
            team1: this.getScore(1),
            team2: this.getScore(2)
        }
    }
}

export default GameManager