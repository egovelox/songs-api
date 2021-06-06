import * as fastify from "fastify"

import { DomainError, ErrorType } from "../models/errors/DomainError"
import { logger } from "../utils/Logger"
import { generateRandomChars } from "../utils/RandomChars"

export function NegotiateResponseType(
    error: DomainError,
    url: string,
    reply: fastify.FastifyReply
) {
    switch(error.type) {
        case ErrorType.BAD_REQUEST:
            logger.warn(JSON.stringify(error))
            return reply.status(400).send({
                error: error.type,
                message: error.clientMessage
            })
        case ErrorType.NOT_FOUND_ERROR:
            logger.warn(JSON.stringify(error))
            return reply.status(404).send({
                error: error.type,
                message: error.clientMessage
            })
        case ErrorType.INTERNAL_ERROR:
        default: 
            const errorId = generateRandomChars()
            logger.error(`Error calling ${url} with id ${errorId}`, error)
            return reply.status(500).send({
                error: error.type,
                message: `Error id: ${errorId} with message ${error.clientMessage}`
            })
    }
}