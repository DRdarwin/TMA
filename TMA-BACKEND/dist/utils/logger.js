"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const winston_1 = require("winston");
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
const logFilePath = path_1.default.join(process.cwd(), "logs", "app.log");
const logger = (0, winston_1.createLogger)({
    level: logLevel,
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }), winston_1.format.printf(({ timestamp, level, message }) => {
        const processId = process.pid;
        return `[${timestamp}] [PID:${processId}] ${level.toUpperCase()}: ${message}`;
    })),
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.colorize(), winston_1.format.simple()),
        }),
        new winston_1.transports.File({ filename: logFilePath }),
    ],
});
exports.default = logger;
