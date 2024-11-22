import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import { authConfig } from "@/config/auth";
import { AppError } from "@/utils/AppError";

interface TokenPayload {
  role: string
  sub: string
}

function ensureAuthentication(request: Request, response: Response, next: NextFunction){
  try {
    const authHeader = request.headers.authorization

    if(!authHeader){
      throw new AppError("JWT token not found")
    }

    const [, token] = authHeader.split(" ")

    const { role, sub: user_id } = verify(token, authConfig.jwt.secret) as TokenPayload

    request.user = {
      id: user_id,
      role
    }
    
    next();
    
  } catch (error) {
    throw new AppError("Invalid JWT token", 401)
  }

}

export { ensureAuthentication }
