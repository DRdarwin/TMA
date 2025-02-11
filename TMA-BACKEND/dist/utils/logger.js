var _a;
import path from "path";
import { createLogger, format, transports } from "winston";
const allowedLogLevels = [
    "error",
    "warn",
    "info",
    "http",
    "verbose",
    "debug",
    "silly",
];
const logLevel = allowedLogLevels.includes((_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : "")
    ? process.env.LOG_LEVEL
    : "info";
const logFilePath = path.join(process.cwd(), "logs", "app.log");
const logger = createLogger({
    level: logLevel,
    format: format.combine(format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), format.printf(({ timestamp, level, message }) => {
        const processId = process.pid;
        return `[${timestamp}] [PID:${processId}] ${level.toUpperCase()}: ${message}`;
    })),
    transports: [
        new transports.Console({
            format: format.combine(format.colorize(), format.simple()),
        }),
        new transports.File({ filename: logFilePath }),
    ],
});
export default logger;
