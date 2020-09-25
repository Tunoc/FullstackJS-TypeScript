/*
    2) Simple DOS-detector file

    Create a file dosDetector.js and paste in the code below. It's the start code for an event-based control
    which should fire (emit) an event "DosDetected" if the same URL is added more than once before the time-interval TIME_BETWEEN_CALLS has expired.
*/
const EventEmitter = require("events");

class DOS_Detector extends EventEmitter {
    constructor(timeValue) {
        super();
        this.urls = new Map();
        this.TIME_BETWEEN_CALLS = timeValue;
    }
    addUrl = (url) => {
        const time = new Date().getTime();
        if (this.urls.has(url)) {
            const deltaTime = time - this.urls.get(url)
            if (deltaTime < this.TIME_BETWEEN_CALLS) {
                this.emit("DosDetected",
                    {
                        url: url,
                        timeBetweenCalls: deltaTime
                    })
            }
        }
        this.urls.set(url, time);
    }
}

module.exports = DOS_Detector;
