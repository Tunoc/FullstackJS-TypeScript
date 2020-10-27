import UserFacade from '../src/facades/userFacade';
import { expect, should } from "chai";
import { ApiError } from '../src/errors/apiError';
import { bryptAsync, bryptCheckAsync } from '../src/utils/bcrypt-async-helper'
import IGameUser from '../src/interfaces/GameUser'
import { assert, debug } from 'console';

describe("Verify the UserFacade", function () {
  beforeEach(async function () {
    const hash: string = await bryptAsync("secret");
    UserFacade.users = [
      { name: "Peter Pan", userName: "pp@b.dk", password: hash, role: "user" },
      { name: "Donald Duck", userName: "dd@b.dk", password: hash, role: "user" },
      { name: "admin", userName: "admin@a.dk", password: hash, role: "admin" }
    ]
  })

  it("Should Add the user Kurt", async function () {
    const newUser = { name: "Kurt Olsen", userName: "ku@b.dk", password: "secret", role: "user" }
    try {
      const status = await UserFacade.addUser(newUser);
      const jan = await UserFacade.getUser("ku@b.dk");
      const passwordOK = await bryptCheckAsync("secret", jan.password);//Fails if the password isn't "secret"
      expect(status).to.be.equal("User was added")
      expect(UserFacade.users.length).to.equal(4)
    } catch (err) {
      expect.fail("Seems like password was not hashed correctly")
    } finally { }
  })

  it("Should remove the user Peter", async function () {
    try {
      const status = await UserFacade.deleteUser("pp@b.dk");
      expect(status).to.be.equal("User was deleted")
    } catch (err) {
      expect.fail("The user wasn't deleted")
    } finally { }
  })

  it("Should get three users", async function () {
    try {
      const status = await UserFacade.getAllUsers();
      expect(status.length).to.be.equal(3);
      expect(status[0].name).to.be.equal("Peter Pan")
    } catch (err) {
      expect.fail("3 users not found")
    } finally { }
  })

  it("Should find Donald Duck", async function () {
    try {
      const status = await UserFacade.getUser("dd@b.dk");
      expect(status.name).to.be.equal("Donald Duck")
    } catch (err) {
      expect.fail("Couldn't find Donald Duck")
    } finally { }
  })

  it("Should not find xxx.@.b.dk", async function () {
    try {
      await UserFacade.getUser("xxx.@.b.dk");
      //Expecting to fail
    } catch (err) {
      expect(err).to.be.instanceOf(Error);
      expect(err.message).to.equal("User Not Found");
    } finally { }
  })
})
