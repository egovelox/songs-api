import { readFileSync } from "fs"

const ROOT_FOLDER = `${__dirname}/../..`

const packageJson = JSON.parse(readFileSync(`${ROOT_FOLDER}/package.json`, "utf-8"))

export const moduleVersion = packageJson.version
