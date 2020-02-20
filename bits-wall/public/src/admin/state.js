class State {
    constructor() {
        this.vh = null
        this.vw = null
        this.canvas = null
        this.fcanvas = null
        this.move = null
        this.backgroundImage = null
        this.token = null
        this.userId = null
        this.channelId = 43797122
        this.config = {}
        this.brickTemplate = {}
        this.bricks = {}

        this.pages = [
            $('#home-page'),
            $('#launch-page'),
            $('#album-page'),
            $('#report-page')
        ];
    }
}