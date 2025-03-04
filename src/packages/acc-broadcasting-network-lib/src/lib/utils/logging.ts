import { createLogger, format, transports } from 'winston';

// export const logger = createLogger({
//   format: format.combine(
//     format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
//     format.errors({ stack: true }),
//     format.splat(),
//     format.json()
//   ),
//   defaultMeta: { service: 'acc-boradcasting-network-lib' },
//   transports: [
//     // new transports.File({
//     //   filename: 'acc-broadcasting-network-lib-error.log',
//     //   level: 'error',
//     // }),
//     // new transports.File({
//     //   filename: 'acc-broadcasting-network-lib-combined.log',
//     // }),
//     // new transports.Console({
//     //   format: format.combine(format.colorize(), format.simple()),
//     // }),
//   ],
// });
export const logger = {};