import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';

const prisma = new PrismaClient();

export const register= async(req: Request, res: Response)=> {
    const { fullname, email, password } = req.body;

    try {
      if(!fullname || !email || !password ) return res.status(400).json({error: "please fill all fields"})
      // Check if the user already exists
      const existingUser = await prisma.user.findUnique({
        where: { email },
      });
  
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create the user
      const newUser = await prisma.user.create({
        data: {
          fullname,
          email,
          password: hashedPassword,
        },
      });
  
      res.status(200).json({
        id: newUser.id,
        fullname: newUser.fullname,
        email: newUser.email
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
}

