import { Request, Response, NextFunction } from "express"
import { db } from "@/database/dbConfig"
import { z } from "zod"
import { AppError } from "@/utils/AppError"

class DeliveryLogsController {
  async create(request: Request, response: Response, next: NextFunction){
    const bodySchema = z.object({
      delivery_id: z.string().uuid(),
      description: z.string()
    })

    const { delivery_id, description } = bodySchema.parse(request.body)

    const delivery = await db.delivery.findUnique({
      where: {id: delivery_id}
    })

    if(!delivery){
      throw new AppError("Delivery not found", 404)
    }

  

    if(delivery.status === "processing"){
      throw new AppError("change status to shipped", 404)
    }

      if(delivery.status === "delivered"){
      throw new AppError("This order already been delivered")
    }

    await db.deliveryLog.create({
      data: {
        deliveryId: delivery_id,
        description
      }
    })

    return response.json()
  }


  async index(request: Request, response: Response, next: NextFunction){
    const paramsSchema = z.object({
      delivery_id: z.string().uuid()
    })

    const { delivery_id } = paramsSchema.parse(request.params)


    const delivery = await db.delivery.findUnique({
      where: { id: delivery_id },
      include: {logs: true, user: { select: { name: true, email: true, role: true }
      }}
    }) 

    if(!delivery){
      return response.status(404).json({message: "delivery not found"})
    }

    if(request.user?.role === "custumer" && request.user.id !== delivery?.userId){
      throw new AppError("The user can only view their deliveries",401)
    }

    return response.json(delivery)
  }
}

export { DeliveryLogsController }