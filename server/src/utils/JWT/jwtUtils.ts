import express from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const expiresIn = 60 * 60;
const JWT_SECRET = process.env.JWT_SECRET as string;

interface Payload {
  // Define your payload interface here
  // Example:
  userId: string;
}

const generateToken = (payload: Payload): string => {
  console.log('payload', payload);
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
};

const verifyToken = (token: string): Payload => {
  return jwt.verify(token, JWT_SECRET) as Payload;
};

export { generateToken, verifyToken };
