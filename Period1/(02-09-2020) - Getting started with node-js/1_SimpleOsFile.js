/*
    1) Simple OS-info file

    Create a javascript file that, using nodes CommonJS module system (require/exports), will export an object with the following info (demonstrated for a Window PC)
        {
        platform: 'win32',
        osType: 'Windows_NT',
        freeMemory: 1244311552,
        totalMemory: 8251834368,
        EOL: '\r\n'
        }
*/

const os = require('os');

const getOsInformation = () => {
    osInfoObject = {
        platform: os.platform(),
        osType: os.type(),
        osRelease: os.release(),
        freeMemory: os.freemem(),
        totalMemory: os.totalmem(),
        EOL: os.EOL
    }
    return osInfoObject;
}

console.log(getOsInformation())

module.exports.getOsInformation = getOsInformation();