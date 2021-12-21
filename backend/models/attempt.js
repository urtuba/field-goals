class GoalAttempt {
    constructor(team, player, x, y, weight, success, ft) {
        this.time = new Date().getTime()
        this.team = team
        this.player = player
        this.x = x
        this.y = y
        this.weight = weight
        this.success = success
        this.ft = ft
    }
}

export default GoalAttempt