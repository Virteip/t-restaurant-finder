const { createLogger, format, transports } = require('winston');

const {
  combine, timestamp, label, printf, splat,
} = format;

const { LOG_LEVEL } = process.env;

const generalLog = printf((info) => `${info.timestamp} : ${info.label} : ${info.level} : ${info.message}`);

const Logger = createLogger({
  format: combine(
    label({ label: 'restaurant-finder-ms' }),
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss.SSSS',
    }),
    splat(),
    generalLog,
  ),
  transports: [
    new transports.Console({
      level: LOG_LEVEL,
      exactLevel: false,
    }),
  ],
});

module.exports = Logger;
