import { Router } from "express";
import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { ensureAuthentication } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verifyUserAuthorization";

const deliveryLogsRoutes = Router()
const deliveryLogsController = new DeliveryLogsController()

deliveryLogsRoutes.post("/", ensureAuthentication, verifyUserAuthorization(["sale"]), deliveryLogsController.create)

deliveryLogsRoutes.get("/:delivery_id/show", ensureAuthentication, verifyUserAuthorization(["customer", "sale"]), deliveryLogsController.index)

export { deliveryLogsRoutes }