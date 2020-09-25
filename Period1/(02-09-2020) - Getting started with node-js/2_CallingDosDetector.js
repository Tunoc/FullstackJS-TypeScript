/*
    Create a simple test file that should import the class, make an instance,
    and test the behaviour by adding the same URL more than once (use setTimeout to make the second call)

    Hints: Observe how this code uses JavaScripts Map (not the map-method on an Array, but the type Map) to store URLs,
    and how the URL itself is used as the key.
*/

const EventEmitter = require('events');

const DOS_Detector = require('./2_dosDetector');
const dosDetector = new DOS_Detector(100);

dosDetector.on('DosDetected', (arg) => {
    console.log('Listener called', arg)
});


dosDetector.addUrl("testURL")
setTimeout(function () {
    dosDetector.addUrl("testURL")
}, 50);
