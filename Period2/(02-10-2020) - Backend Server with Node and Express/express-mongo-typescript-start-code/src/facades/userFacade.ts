var bcrypt = require('bcryptjs');
const debug = require("debug")("game-case")
interface IGameUser { name: string, email: string, password: string, role: string }

const users: Array<IGameUser> = [];
class UserFacade {
    static addUser(user: IGameUser): boolean {
        try {
            return bcrypt.hash(user.password, 10) //auto gen salt - https://www.npmjs.com/package/bcryptjs
                .then((hashedPsw: string) => {
                    user.password = hashedPsw;
                    users.push(user);
                    return true;
                })
        } catch (error) {
            debug(error)
            return false;
        }
    }
    static deleteUser(email: string): boolean {
        let removeIndex = users.findIndex(user => user.email == email);
        if (removeIndex != -1) {
            users.splice(removeIndex, 1);
            return true;
        }
        return false;
    }
    static getAllUsers(): Array<IGameUser> {
        return users;
    }
    static getUser(email: string): IGameUser {
        // let userIndex = users.map(
        //     function (user) {
        //         return user.email;
        //     }).indexOf(email);
        // return users[userIndex];
        let foundUser = users.find(user => user.email == email);
        if (foundUser === undefined) {
            throw new Error("User not found");
        }
        return foundUser;
    }
    static checkUser(email: string, password: string): boolean {
        try {
            let userCheck = this.getUser(email);
            let doesExist = bcrypt.compareSync(password, userCheck.password);
            return doesExist ? true : false; //Tennary for true false result.
        } catch (error) {
            debug(error)
            throw new Error("Error occured while checking user");
        }
    }
}

export { UserFacade };