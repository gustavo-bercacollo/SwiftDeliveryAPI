import { Request, Response, NextFunction } from "express";
import { z } from "zod";
import { db } from "@/database/dbConfig";

class DeliveryStatusController {
  async update(request: Request, response: Response, next: NextFunction){

    const paramsSchema = z.object({
      id: z.string().uuid()
    })

    const bodySchema = z.object({
      status: z.enum(["processing", "shipped", "delivered"])
    })

    const { id } = paramsSchema.parse(request.params)
    const { status } = bodySchema.parse(request.body)

    await db.delivery.update({
      data: {
        status,
      },
      where: {
        id,
      }
    })

    await db.deliveryLog.create({
      data:{
        deliveryId: id,
        description: status
        }
      })

    return response.json()
  }
}

export { DeliveryStatusController }