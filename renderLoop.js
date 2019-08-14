export default class RenderLoop {
    constructor(callback) {
        this.callback = callback
        this.started = false
        this.msPrev = 0
        var self = this
    }
    run() {
        //Check that loop is started
        if(this.started == true) {
        //Set current time
        let msCurr = performance.now()
        //Get difference between each frame
        let dt = (msCurr - this.msPrev) / 1000
        //Set last frame as current frame
        this.msPrev = msCurr
        //Callback
        this.callback(dt)
        //Loop
        window.requestAnimationFrame(() => this.run())
        }
    }
    start() {
        //Start
        this.started = true
        //Set reference to use as first time
        this.msPrev = performance.now()
        //Loop
        window.requestAnimationFrame(() => this.run())
        return this
    }
}