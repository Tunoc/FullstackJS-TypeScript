import { use } from "chai";
import express from "express";
import { Request, Response } from "express"
import { ApiError } from "../errors/apiError";
import userFacade from "../facades/user";
import basicAuth from "../middlewares/basic-auth"

const router = express.Router();

router.post('/', async function (req: Request, res: Response, next) {
  try {
    let newUser = req.body;
    newUser.role = "user";  //Even if a hacker tried to "sneak" in his own role, this is what you get
    const status = await userFacade.addUser(newUser)
    res.json({ status })
  } catch (err) {
    next(err);
  }
})

//We place the authorisation here, because the post above, doesn't need to be authorized in order to create a person, but everything else does.
router.use(basicAuth)

router.get('/:userName', async function (req: any, res: Response, next) {
  try {
    const role = req.role;
    if (role != "admin") {
      throw new ApiError("Forbidden", 403)
    }
    const user_Name = req.params.userName;
    const user = await userFacade.getUser(user_Name);
    const { name, userName } = user;
    const userDTO = { name, userName }
    res.json(userDTO);
  } catch (err) {
    next(err)
  }
});

router.get('/user/me', async function (req: any, res: Response, next) {
  try {
    const user_Name = req.userName;
    const user = await userFacade.getUser(user_Name);
    const { name, userName } = user;
    const userDTO = { name, userName }
    res.json(userDTO);
  } catch (err) {
    next(err)
  }
});

router.get('/', async function (req: any, res: Response, next) {
  try {
    const role = req.role;
    if (role != "admin") {
      throw new ApiError("Not Authorized", 403)
    }
    const users = await userFacade.getAllUsers();
    const usersDTO = users.map((user) => {
      const { name, userName } = user;
      return { name, userName }
    })
    res.json(usersDTO);
  } catch (err) {
    next(err)
  }
});

router.delete('/:userName', async function (req: any, res: Response, next) {
  try {
    const role = req.role;
    if (role != "admin") {
      throw new ApiError("Not Authorized", 403)
    }
    const user_name = req.params.userName;
    const status = await userFacade.deleteUser(user_name)
    res.json({ status })
  } catch (err) {
    next(err);
  }
})

module.exports = router;