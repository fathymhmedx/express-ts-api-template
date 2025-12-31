import { Router } from "express";
import { UsersController } from "./users.controller.js";
import { UsersRepository } from "./users.repository.js";
import { UsersService } from "./users.service.js";

const router = Router();

const usersRepository = new UsersRepository();
const usersService = new UsersService(usersRepository);
const usersController = new UsersController(usersService);

router
    .route("/")
    .get(usersController.getAllUsers)
    .post(usersController.createUser);

router
    .route("/:id")
    .get(usersController.getUserById)
    .put(usersController.updateUser)
    .delete(usersController.deleteUser);

router
    .route("/email/:email")
    .get(usersController.getUserByEmail);

export default router;
  