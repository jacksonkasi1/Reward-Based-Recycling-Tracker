// ======================================
// Core Modules
// (None in this file)
// ======================================

// ======================================
// Third-Party Libraries
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
// ======================================

// ======================================
// Project Modules
import { db } from '../config/db';
import { users } from '../models/user';
// ======================================

/**
 * Signs up a new user.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns The newly created user record.
 * @throws Will throw an error if the user already exists.
 */
export async function signup(email: string, password: string) {
  // Check if a user with the same email already exists.
  const existing = await db.select().from(users).where(users.email.eq(email)).limit(1);
  if (existing.length > 0) {
    throw new Error('User already exists');
  }

  // Hash the provided password.
  const passwordHash = await bcrypt.hash(password, 10);

  // Insert the new user into the database.
  const [user] = await db.insert(users).values({
    email,
    passwordHash
  }).returning();
  
  return user;
}

/**
 * Logs in a user.
 * @param email - The user's email address.
 * @param password - The user's password.
 * @returns A JWT token if the login is successful.
 * @throws Will throw an error if the user is not found or if the password is invalid.
 */
export async function login(email: string, password: string) {
  const [user] = await db.select().from(users).where(users.email.eq(email)).limit(1);
  if (!user) {
    throw new Error('User not found');
  }

  // Compare the provided password with the stored hash.
  const valid = await bcrypt.compare(password, user.passwordHash);
  if (!valid) {
    throw new Error('Invalid password');
  }

  // Generate a JWT token.
  const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET || 'secret', {
    expiresIn: '1h'
  });

  return token;
}
