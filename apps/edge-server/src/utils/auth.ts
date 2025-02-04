// src/utils/auth.ts

import jwt from "@tsndr/cloudflare-worker-jwt";

const encoder = new TextEncoder();

/**
 * Generates a PBKDF2-based hash of a password.
 * Returns a string in the format: salt:hash
 */
export async function hashPassword(password: string, salt?: Uint8Array): Promise<string> {
    if (!salt) {
      salt = crypto.getRandomValues(new Uint8Array(16)); // Generate a 16-byte salt
    }
    // Import the password as a key.
    const keyMaterial = await crypto.subtle.importKey(
      "raw",
      encoder.encode(password),
      "PBKDF2",
      false,
      ["deriveBits"]
    );
    
    const derivedBits = await crypto.subtle.deriveBits(
      {
        name: "PBKDF2",
        salt: salt.buffer as ArrayBuffer,
        iterations: 100000,
        hash: "SHA-256",
      },
      keyMaterial,
      256
    );
    const hashArray = new Uint8Array(derivedBits);
    const hashHex = Array.from(hashArray)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    const saltHex = Array.from(salt)
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return `${saltHex}:${hashHex}`;
  }

/**
 * Verifies a password against the stored hash.
 */
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [saltHex] = stored.split(":");
  const salt = new Uint8Array(saltHex.match(/.{1,2}/g)!.map((byte) => parseInt(byte, 16)));
  const computed = await hashPassword(password, salt);
  return computed === stored;
}

/**
 * Signs a JWT with the given payload and secret.
 */
export async function signJWT(payload: Record<string, any>, secret: string): Promise<string> {
  // jwt.sign will use HS256 by default. You can extend the payload with nbf/exp as needed.
  return await jwt.sign(payload, secret);
}

/**
 * Verifies a JWT token with the given secret.
 * Returns the decoded token on success or undefined if verification fails.
 */
export async function verifyJWT(token: string, secret: string): Promise<any | undefined> {
  return await jwt.verify(token, secret);
}