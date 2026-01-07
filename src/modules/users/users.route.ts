import { Router } from "express";
import usersController from "../../containers/users.container.js";

const router = Router();

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
  