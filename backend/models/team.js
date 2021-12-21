import Player from "./player.js"

class Team {
    constructor(id, name, players) {
        this.teamId = id
        this.name = name
        this.players = players
    }

    addPlayer(name, number, role) {
        const player = new Player(name, number, role, this.teamId)
        this.players.push(player)
    }
}

export default Team