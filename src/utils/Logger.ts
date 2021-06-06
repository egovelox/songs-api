import * as log4js from "log4js"

import { loadLoggerConfig } from "../config/Config"
import * as ModuleInfo from "./ModuleInfo"

class Logger {
    static DEFAULT_VERSION = 1
    static ROOT_FOLDER = `${__dirname}/../..`

    #isLayoutSet = false
    #isLoggerConfigured = false
    #logger: log4js.Logger

    constructor() {
        this.addLayout()
        this.configure()
        this.#logger = log4js.getLogger()
    }

    get logger(): log4js.Logger {
        return this.#logger
    }

    private addLayout(): void {
        if (this.#isLayoutSet) {
            return
        }

        log4js.addLayout("logstash", () => (logEvent) => {
            return JSON.stringify(
                {
                    "@version": Logger.DEFAULT_VERSION,
                    "@timestamp": logEvent.startTime,
                    module: "songs-api",
                    module_version: ModuleInfo.moduleVersion,
                    component: "songs-api",
                    component_type: "ecs",
                    level: logEvent.level.levelStr,
                    message: format(logEvent.data[0]),
                    mparam: {...logEvent.data.slice(1).map(format)}
                },
                undefined,
                process.env.NODE_ENV === "development" ? 2 : undefined
            )
        })

        this.#isLayoutSet = true
    }

    private configure(): void {
        if(this.#isLoggerConfigured) {
            return
        }

        const config = loadLoggerConfig(`${Logger.ROOT_FOLDER}/.env`)

        log4js.configure({
            appenders: {
                out: { type: "stderr", layout: { type: "logstash" }},

            },
            categories: {
                default: { appenders: ["out"], level: config.level}
            }
        })

        this.#isLoggerConfigured = true
    }
}

function format(obj: unknown): string {
    if (typeof obj === "string") {
        return obj
    }
    if (obj instanceof Error) {
        return JSON.stringify({ message: obj.message, name: obj.name, stack: obj.stack })
    }
    return JSON.stringify(obj)
}

const logger = new Logger().logger

export { logger }