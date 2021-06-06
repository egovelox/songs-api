import * as dotenv from "dotenv"

export default class ConfigLoader {
    private readonly config: { [k: string]: string | undefined } 

    constructor(path: string) {
        this.config = 
            process.env.NODE_ENV === 'development'
                ? dotenv.config({ path: path }).parsed || process.env
                : process.env
        if (this.config.error) {
            console.error("An error occured when extracting configuration", this.config.error)
            throw this.config.error
        }
    }

    public getString = (key: string, fallback?: string): string =>
        this.get(key, fallback, this.asString)

    public getStringOpt = (key: string): string | undefined => this.getOpt(key, this.asString)

    private asString = (value: string) => value

    public getInt = (key: string, fallback?: number): number => this.get(key, fallback, this.asInt)

    public getIntOpt = (key: string): number | undefined => this.getOpt(key, this.asInt)

    private asInt = (value: string) => parseInt(value, 10)

    public getBoolean = (key: string, fallback?: boolean): boolean =>
        this.get(key, fallback, this.asBoolean)

    public getBooleanOpt = (key: string): boolean | undefined => this.getOpt(key, this.asBoolean)

    private asBoolean = (value: string) => value.toLowerCase() === "true"

    public get = <T>(key:string, fallback: T | undefined, map: (string: string) => T): T => {
        const value = this.config[key]

        if (value === undefined) {
            if(fallback === undefined) {
                throw new Error(
                    `[ConfigLoader] Undefined variable "${key}". \n Is it set in the ".env" file ?`
                )
            } else {
                return fallback
            }
        }
        else {
            return map(value)
        }
    }

    public getOpt = <T>(key: string, map: (string: string) => T): T | undefined => {
        const value = process.env[key]
        if(value === undefined) {
            return undefined
        } else {
            return map(value)
        }
    }

    public getArray = (key: string, separator: string, fallback: string[] | undefined): string[] => {
        return this.get(key, fallback || [], (value) => value.split(separator))
    }
}