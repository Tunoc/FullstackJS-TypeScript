const makePersonalInfo = () => {
    let privateName = "No name given";
    let privateAge = "No age given";
    function changeVal(val) {
        typeof val == "number" ? privateAge = val : privateName = val;
    }
    return {
        //set: () => { changeBy(1); },
        editPerson: (val) => changeVal(val),
        getInfo: () => `${privateName}, ${privateAge}`
    };
};
module.exports = makePersonalInfo;


