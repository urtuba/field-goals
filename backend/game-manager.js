import Game from "./models/game"
import Team from "./models/team"
import Quarter from "./models/quarter"

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

    addPlayers(players) {
        players.forEach(player => {
            this.#addPlayer(player.teamId, player.name, player.number, player.role)
        })
    }

    triggerTime() {
        // check if the game is not started
        if(this.game.quarters == []) {
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
        const team = teamId == 1 ? this.game.team1 : this.game.team2
        const player = team.players.find(player => player.number == playerNo)

        this.game.shoots.push(new Attempt(team, player, x, y, weight, success, ft))
        return true
    }

    #quarterFilter(qtr, shoots) {
        if(qtr == 0)
            return shoots
        else
            return shoots.filter(shoot => shoot.time >= this.game.quarters[qtr - 1].start && shoot.time <= this.game.quarters[qtr - 1].end)
    }

    #playersFilter(players, shoots) {
        if (players == [])
            return shoots
        else
            return shoots.filter(shoot => players.includes(shoot.player.number))
    }

    getAttempts(team = 1, qtr = 0, players = []) {
        const shoots = this.game.shoots
        const filteredShoots = this.#playersFilter(players, this.#quarterFilter(qtr, shoots))

        return filteredShoots.filter(shoot => shoot.team == team)
    }
}