import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import { UsersService } from "./users.service.js";

export class UsersController {
  constructor(private userService: UsersService) { }

  // GET api/v1/users
  getAllUsers = asyncHandler(async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(200).json({
      status: "success",
      message: "Users retrieved successfully",
      data: { users },
    });
  });

  // GET api/v1/users/:id
  getUserById = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: { user },
    });
  });

  // POST api/v1/users
  createUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(201).json({
      status: "success",
      message: "User created successfully",
      data: { user },
    });
  });

  // PUT api/v1/users/:id
  updateUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      data: { user },
    });
  });

  // DELETE api/v1/users/:id
  deleteUser = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.deleteUser(req.params.id);
    res.status(200).json({
      status: "success",
      message: "User deleted successfully",
      data: { user },
    });
  });

  // GET api/v1/users/email/:email
  getUserByEmail = asyncHandler(async (req: Request, res: Response) => {
    const user = await this.userService.getUserByEmail(req.params.email);
    res.status(200).json({
      status: "success",
      message: "User retrieved successfully",
      data: { user },
    });
  });
}
