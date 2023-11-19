import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const key_secret = process.env.secret_key;

export const signin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res.status(401).json({ error: "please fill fields!!!" });

    await prisma.user
      .findUnique({
        where: { email },
      })
      .then((user) => {
        if (!user)
          return res.status(401).json({ error: "User does not exists" });
        bcrypt.compare(password, user.password).then((isMatch) => {
          if (!isMatch)
            return res.status(401).json({ error: "Invalid credentials" });
          jwt.sign(
            { id: user.id },
            key_secret!,
            { expiresIn: "1d" },
            (err, token) => {
              if (err) throw err;
              res.status(200).json({
                user: {
                  token,
                  id: user.id,
                  fullname: user.fullname,
                  email: user.email,
                },
              });
            }
          );
        });
      });

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
