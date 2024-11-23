import { Request, Response, NextFunction } from "express";
import { db } from "@/database/dbConfig";
import { z } from "zod"
import { AppError } from "@/utils/AppError";
import { compare } from "bcrypt";
import { authConfig } from "@/config/auth";
import { sign } from "jsonwebtoken"

class SessionsController {
  async create(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6)
    })

    const { email, password } = bodySchema.parse(request.body)

    const user = await db.user.findFirst({
      where: {email}
    });


    if(!user){
      throw new AppError("Invalid email or password", 401)
    }

    const passwordCompare = await compare(password, user.password)

    if(!passwordCompare){
      throw new AppError("Invalid email or password", 401)
    }

    const { secret, expiresIn } = authConfig.jwt

    const token = sign({role: user.role ?? "customer"}, secret, {
      subject: user.id,
      expiresIn
    })

    const { password:_, ...userWithoutPassword } = user

    response.json({ token, user: userWithoutPassword})
  }
}

export { SessionsController }