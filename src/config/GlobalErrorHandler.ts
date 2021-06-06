import * as fastify from "fastify"

import { ErrorType } from "../models/errors/DomainError"
import { logger } from "../utils/Logger"
import { generateRandomChars } from "../utils/RandomChars"

export async function GlobalErrorHandler(
  error: fastify.FastifyError,
  request: fastify.FastifyRequest,
  reply: fastify.FastifyReply
) {
  const errorMessage = error.message
  const { validation } = error

  if (validation) {
    logger.warn(`Error calling ${request.url}: ${errorMessage}`)
    return reply.status(400).send({
      error: ErrorType.BAD_REQUEST,
      message: `${error}`,
    })
  } else {
    const errorId = generateRandomChars()
    logger.error(`Error calling ${request.url} with id: ${errorId}`, error)
    return reply.status(500).send({
      error: "error_server_error",
      message: `Error id: ${errorId}`,
    })
  }
}
