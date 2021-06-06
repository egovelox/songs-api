import * as fastify from "fastify"

import { GlobalErrorHandler } from "../config/GlobalErrorHandler"
import { logger } from "./Logger"

export function createFastifyInstance(): fastify.FastifyInstance {
    const instance = fastify.default({
        ajv: {
            customOptions: {
                coerceTypes: "array"
            },
        },
    })
    instance.setErrorHandler(GlobalErrorHandler)
    setCors(instance)

    return instance
}

const setCors = (instance: fastify.FastifyInstance) => {
    if( process.env.NODE_ENV === "development" ) {
        const allowedOrigin = "*"
        instance.register(require("fastify-cors"), {
            origin: allowedOrigin
        })
        logger.info(`Allowed origin : ${allowedOrigin}`)
    }
}