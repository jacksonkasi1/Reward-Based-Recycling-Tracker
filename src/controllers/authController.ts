// ======================================
// Core Modules
// (None in this file)
// ======================================

// ======================================
// Third-Party Libraries
import { Request, Response } from '@fastly/expressly';
// ======================================

// ======================================
// Project Modules
import * as authService from '../services/authService';
// ======================================

/**
 * Handles user signup requests.
 * @param req Express request object containing email and password.
 * @param res Express response object.
 */
export async function signup(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await authService.signup(email, password);
    res.status(201).json({ user });
  } catch (error) {
    res.status(400).json({ error: error instanceof Error ? error.message : 'Signup failed' });
  }
}

/**
 * Handles user login requests.
 * @param req Express request object containing email and password.
 * @param res Express response object.
 */
export async function login(req: Request, res: Response): Promise<void> {
  try {
    const { email, password } = req.body;
    const token = await authService.login(email, password);
    res.status(200).json({ token });
  } catch (error) {
    res.status(401).json({ error: error instanceof Error ? error.message : 'Login failed' });
  }
}
