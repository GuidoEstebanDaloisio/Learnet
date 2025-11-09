import { Request, Response, NextFunction } from "express";
import { logger } from "../utils/logger";

export const requestLogger = (req: Request, res: Response, next: NextFunction) => {
  logger.info(`➡️ [${req.method}] ${req.originalUrl}`);
  if (Object.keys(req.body || {}).length > 0) logger.json("Body recibido", req.body);

  // Para loguear la respuesta también (opcional)
  const originalJson = res.json;
  res.json = function (body) {
    logger.json(`⬅️ Respuesta (${req.method} ${req.originalUrl})`, body);
    return originalJson.call(this, body);
  };

  next();
};
