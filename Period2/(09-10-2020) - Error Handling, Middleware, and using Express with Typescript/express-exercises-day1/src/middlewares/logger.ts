var winston = require('winston'),
    expressWinston = require('express-winston');

const exWinstonLogError = expressWinston.errorLogger({
    transports: [
        new winston.transports.File({ filename: './logs/error.log' })
    ],
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.json(),
    )
});

const exWinstonLog = expressWinston.logger({
    transports: [
        new winston.transports.File({ filename: './logs/all.log' }),
    ],
    format: winston.format.combine(
        winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
        winston.format.colorize(),
        winston.format.json(),
        winston.format.prettyPrint()//It makes the log easier to read.
    )
});

export = { exWinstonLog, exWinstonLogError }