var bcrypt = require('bcryptjs');
const debug = require("debug")("game-case")
interface IGameUser { name: string, email: string, password: string, role: string }

const users: Array<IGameUser> = [];
class UserFacade {
    static addUser(user: IGameUser): boolean {
        /*Info: Import bcryptjs and (npm install bcryptjs) and hash before you store */
        try {
            var salt = bcrypt.genSaltSync(10);
            var hashedPsw = bcrypt.hashSync(user.password, salt);
            user.password = hashedPsw;
            users.push(user);
            return true;
        } catch (error) {
            debug(error)
            throw new Error("Error occured while trying to add user");
        }
    }
    static deleteUser(email: string): boolean {
        try {
            //let removeIndex = users.findIndex(user => user == this.getUser(email));
            let removeIndex = users.findIndex(user => user.email == email);
            users.splice(removeIndex, 1);
            return true;
        } catch (error) {
            debug(error)
            throw new Error("Error occured while trying to delete user");
        }
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