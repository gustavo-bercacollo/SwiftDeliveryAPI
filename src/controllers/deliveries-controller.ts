import { Request, Response, NextFunction } from "express"
import { db } from "@/database/dbConfig"
import { z } from "zod"

class DeliveriesController {
  async create(request: Request, response: Response, next: NextFunction){

    const bodySchema = z.object({
      user_id: z.string().uuid(),
      description: z.string()
    })

    const { user_id, description } = bodySchema.parse(request.body)

    await db.delivery.create({
      data: {
        userId: user_id,
        description
      }
    })

    return response.status(201).json()
  }

  async index(request: Request, response: Response, next: NextFunction){
    
    const deliveries = await db.delivery.findMany({
      include: {
        user: {select: {name: true, email: true}}
      }
    })

    return response.json(deliveries)
  }
}

export { DeliveriesController }