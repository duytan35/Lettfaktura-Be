import { logger } from "../../config/index.js";
import { AppError } from "../errors.js";
import { createResponse } from "../utils.js";

export const errorHandler = (error, _, reply) => {
  logger.error(error);

  if (error instanceof AppError) {
    return reply
      .status(error.statusCode)
      .send(createResponse(false, null, undefined, error.message));
  }

  if (error.validation) {
    const validationErrors = error.validation.map((err) => {
      const field = err.instancePath
        ? err.instancePath.replace("/", "")
        : err.params?.missingProperty ||
          err.schemaPath?.split("/").pop() ||
          "unknown";
      return {
        field: field,
        message: err.message,
        value: err.data,
      };
    });

    const errorMessage = `Validation failed: ${validationErrors
      .map((e) =>
        e.field === "unknown" ? e.message : `${e.field} ${e.message}`
      )
      .join(", ")}`;

    return reply
      .status(400)
      .send(
        createResponse(false, { validationErrors }, undefined, errorMessage)
      );
  }

  return reply
    .status(500)
    .send(createResponse(false, null, undefined, "Internal server error"));
};
