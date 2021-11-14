import winston from "winston"
import expressWinston from "express-winston"

const baseFormats = [winston.format.timestamp(), winston.format.simple()]

const consoleFormat = winston.format.combine(
  ...baseFormats,
  winston.format.colorize()
)

const fileFormat = winston.format.combine(...baseFormats)

const transports =
  process.env.NODE_ENV !== "production"
    ? [
        new winston.transports.Console({
          level: process.env.LOG_LEVEL || "info",
          format: consoleFormat,
        }),
      ]
    : [
        new winston.transports.Console({
          level: process.env.LOG_LEVEL || "info",
          format: consoleFormat,
        }),
        new winston.transports.File({
          filename: "logs/error.log",
          level: "error",
          format: fileFormat,
        }),
        new winston.transports.File({
          filename: "logs/combined.log",
          level: process.env.LOG_LEVEL || "info",
          format: fileFormat,
        }),
      ]

export const logger = winston.createLogger({
  transports,
})

export const expressLogger = expressWinston.logger({
  winstonInstance: logger,
  meta: false,
  colorize: false,
  msg: "HTTP {{req.method}} {{res.statusCode}} {{res.responseTime}}ms {{req.url}}",
  ignoreRoute: function (req, res) {
    return false
  },
})

// TODO: Needs more work...
export const expressErrorLogger = expressWinston.errorLogger({
  winstonInstance: logger,
  meta: false,
  msg: "Error {{err.message}} {{err.stack}}",
})
