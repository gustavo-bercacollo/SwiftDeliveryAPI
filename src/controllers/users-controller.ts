import { Request, Response, NextFunction } from "express";
import { z } from "zod"
import { hash } from "bcrypt"
import { db } from "@/database/dbConfig";
import { AppError } from "@/utils/AppError";


class UsersController {
  async create(request: Request, response: Response, nest: NextFunction){
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email(),
      password: z.string().min(6)
    })

    const {email, password, name } = bodySchema.parse(request.body)

    const emailExists = await db.user.findFirst({ where: { email }})

    if(emailExists){
      throw new AppError("User with same email already exists")
    }

    const hashedPassword = await hash(password, 8)

    const user = await db.user.create({
      data: {
        name,
        email,
        password: hashedPassword
      }
    })

    const {password:_,...userWithoutPassword} = user

    response.status(201).json(userWithoutPassword)
  }
}

export { UsersController }