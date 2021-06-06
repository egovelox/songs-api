import { config } from "dotenv/types"

import ConfigLoader from "../utils/ConfigLoader"

export type Config = {
  env: string
  http: {
    port: number
    url: string
  }
  mysql: {
    host: string
    port: number
    user: string
    password: string
    database: string
  }
}

export type LoggerConfig = {
  level: string
}

export function loadConfig(path: string) {
  const configLoader = new ConfigLoader(path)

  return {
    env: configLoader.getString("NODE_ENV", "development"),
    http: {
      port: configLoader.getInt("HTTP_PORT"),
      url: configLoader.getString("HTTP_URL"),
    },
    mysql: {
      host: configLoader.getString("DB_HOST"),
      port: configLoader.getInt("DB_PORT"),
      user: configLoader.getString("DB_USER"),
      password: configLoader.getString("DB_PASSWORD"),
      database: configLoader.getString("DB_NAME"),
    },
  }
}

// This loader must not fail so that we are always able to build a logger
export function loadLoggerConfig(path: string): LoggerConfig {
  const configLoader = new ConfigLoader(path)
  return {
    level: configLoader.getString("LOGGER_LEVEL", "trace"),
  }
}
