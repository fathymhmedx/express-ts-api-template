import { Request, Response } from 'express';
import { UsersService } from './users.service.js';
import { translate } from '../../shared/utils/translate.js';
import { USER_CODES } from './users.codes.js';
import { inject, injectable } from 'tsyringe';
import { TOKENS } from '../../shared/containers/tokens.js';

/**
 * Users Controller
 * Responsible only for handling HTTP requests & responses
 */
@injectable()
export class UsersController {
  /**
   * @param {UsersService} userService - Users service instance
   */
  constructor(
    @inject(TOKENS.UsersService)
    private userService: UsersService,
  ) {}

  /**
   * Get all users
   * @route GET /api/v1/users
   * @access public / Protected
   */
  getAllUsers = async (req: Request, res: Response) => {
    const users = await this.userService.getAllUsers();
    res.status(USER_CODES.USER_LISTED.statusCode).json({
      status: 'success',
      message: translate(USER_CODES.USER_LISTED.code, { lng: req.language }),
      data: { users },
    });
  };

  /**
   * Get user by ID
   * @route GET /api/v1/users/:id
   * @access public / Protected
   */
  getUserById = async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;
    const user = await this.userService.getUserById(id);
    res.status(USER_CODES.USER_RETRIEVED.statusCode).json({
      status: 'success',
      message: translate(USER_CODES.USER_RETRIEVED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Create user
   * @route POST /api/v1/users
   * @access protected (Admin)
   */
  createUser = async (req: Request, res: Response) => {
    const user = await this.userService.createUser(req.body);
    res.status(USER_CODES.USER_CREATED.statusCode).json({
      status: 'success',
      message: translate(USER_CODES.USER_CREATED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Update user
   * @route PUT /api/v1/users/:id
   * @access protected
   */
  updateUser = async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const user = await this.userService.updateUser(id, req.body);
    res.status(USER_CODES.USER_UPDATED.statusCode).json({
      status: 'success',
      message: translate(USER_CODES.USER_UPDATED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Delete user
   * @route DELETE /api/v1/users/:id
   * @access protected (Admin)
   */
  deleteUser = async (req: Request, res: Response) => {
    const id = Array.isArray(req.params.id) ? req.params.id[0] : req.params.id;

    const user = await this.userService.deleteUser(id);
    res.status(USER_CODES.USER_DELETED.statusCode).json({
      status: 'success',
      message: translate(USER_CODES.USER_DELETED.code, { lng: req.language }),
      data: { user },
    });
  };

  /**
   * Get user by email
   * @route GET /api/v1/users/email/:email
   * @access protected
   */
  getUserByEmail = async (req: Request, res: Response) => {
    const email = Array.isArray(req.params.email)
      ? req.params.email[0]
      : req.params.email;

    const user = await this.userService.getUserByEmail(email);
    res.status(USER_CODES.USER_RETRIEVED.statusCode).json({
      status: 'success',
      message: translate(USER_CODES.USER_RETRIEVED.code, { lng: req.language }),
      data: { user },
    });
  };
}
