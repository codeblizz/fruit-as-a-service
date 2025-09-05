import pino from 'pino';

// Configure the logger
export const logger = pino({
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      translateTime: 'SYS:standard',
      ignore: 'pid,hostname'
    }
  },
  level: process.env.LOG_LEVEL || 'info'
});

// Export a function to create a child logger for different components
export function createLogger(component: string) {
  return logger.child({ component });
}

