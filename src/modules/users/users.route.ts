import { Router } from "express";
import usersController from "../../containers/users.container.js";
import { validate } from "../../middlewares/validate.middleware.js";
import {
  createUserSchema,
  updateUserSchema,
  userIdParamSchema,
  userEmailParamSchema,
} from "./dtos/index.js";

const router = Router();

router
  .route("/email/:email")
  .get(
    validate(userEmailParamSchema, "params"),
    usersController.getUserByEmail
  );

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(validate(createUserSchema, "body"), usersController.createUser);

router
  .route("/:id")
  .get(validate(userIdParamSchema, "params"), usersController.getUserById)
  .patch(
    validate(userIdParamSchema, "params"),
    validate(updateUserSchema, "body"),
    usersController.updateUser
  )
  .delete(validate(userIdParamSchema, "params"), usersController.deleteUser);

export default router;
