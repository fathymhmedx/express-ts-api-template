import { Request, Response } from "express";
import { UsersService } from "./users.service.js";
import { translate } from "../../shared/utils/translate.js";
import { USER_CODES } from "./users.codes.js";

/**
 * Users Controller
 * Responsible only for handling HTTP requests & responses
 */
export class UsersController {
  /**
   * @param {UsersService} userService - Users service instance
   */
  constructor(private userService: UsersService) {}

  /**
   * Get all users
   * @route GET /api/v1/users
   * @access public / Protected (depends on middleware)
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(USER_CODES.USER_LISTED.statusCode).json({
      status: "success",
      message: translate(USER_CODES.USER_LISTED.code, { lng: req.language }),
      data: { users },
    });
  };

  /**
   * Get user by ID
   * @route GET /api/v1/users/:id
   * @access public / Protected
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  getUserById = async (req: Request, res: Response) => {
    const user = await this.userService.getUserById(req.params.id);
    res.status(USER_CODES.USER_RETRIEVED.statusCode).json({
      status: "success",
      message: translate(USER_CODES.USER_RETRIEVED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Create new user
   * @route POST /api/v1/users
   * @access protected (Admin)
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  createUser = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(USER_CODES.USER_CREATED.statusCode).json({
      status: "success",
      message: translate(USER_CODES.USER_CREATED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Update user by ID
   * @route PUT /api/v1/users/:id
   * @access protected
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  updateUser = async (req: Request, res: Response) => {
    const user = await this.userService.updateUser(req.params.id, req.body);
    res.status(USER_CODES.USER_UPDATED.statusCode).json({
      status: "success",
      message: translate(USER_CODES.USER_UPDATED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Delete user by ID
   * @route DELETE /api/v1/users/:id
   * @access protected (Admin)
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  deleteUser = async (req: Request, res: Response) => {
    const user = await this.userService.deleteUser(req.params.id);
    res.status(USER_CODES.USER_DELETED.statusCode).json({
      status: "success",
      message: translate(USER_CODES.USER_DELETED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Get user by email
   * @route GET /api/v1/users/email/:email
   * @access protected
   * @param {Request} req
   * @param {Response} res
   * @returns {Promise<void>}
   */
  getUserByEmail = async (req: Request, res: Response) => {
    const user = await this.userService.getUserByEmail(req.params.email);
    res.status(USER_CODES.USER_RETRIEVED.statusCode).json({
      status: "success",
      message: translate(USER_CODES.USER_RETRIEVED.code, { lng: req.language }),
      data: { user },
    });
  };
}
