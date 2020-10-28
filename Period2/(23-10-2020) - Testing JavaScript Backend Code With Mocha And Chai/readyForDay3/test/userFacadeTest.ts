import UserFacade from '../src/facades/userFacade';
import chai from 'chai';
import chaiAsPromised from 'chai-as-promised'
chai.use(chaiAsPromised)
const expect = chai.expect
const assert = chai.assert
import { ApiError } from '../src/errors/apiError';
import { bryptAsync, bryptCheckAsync } from '../src/utils/bcrypt-async-helper'

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
      expect(passwordOK).to.be.equal(true);
    } catch (err) {
      expect.fail("Seems like password was not hashed correctly")
    } finally { }
  })

  it("Should remove the user Peter", async function () {
    const status = await UserFacade.deleteUser("pp@b.dk");
    expect(status).to.be.equal("User was deleted")
  })

  it("Should get three users", async function () {
    const status = await UserFacade.getAllUsers();
    expect(status.length).to.be.equal(3);
    expect(status[0].name).to.be.equal("Peter Pan")
    expect(status[1].name).to.be.equal("Donald Duck")
    expect(status[2].name).to.be.equal("admin")
  })

  it("Should find Donald Duck", async function () {
    const findDonald = await UserFacade.getUser("dd@b.dk");
    expect(findDonald.name).to.be.equal("Donald Duck");
  })

  it("Should not find xxx.@.b.dk", async function () {
    let throwsError = UserFacade.getUser("xxx.@.b.dk")
    //Needs to await the expect, or else the test will still show passing even though it failed.
    await expect(throwsError).to.be.rejectedWith(ApiError, "User Not Found");
  })
})
