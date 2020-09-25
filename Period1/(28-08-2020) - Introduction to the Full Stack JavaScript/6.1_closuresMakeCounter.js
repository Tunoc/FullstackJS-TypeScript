const makeCounter = () => {
    let privateCounter = 0;
    function changeBy(val) {
        privateCounter += val;
    }
    return {
        inc: () => { changeBy(1); },
        dec: () => { changeBy(-1); },
        value: () => privateCounter,
    };
};
module.exports = makeCounter;


