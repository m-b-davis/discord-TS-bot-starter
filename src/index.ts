/* eslint-disable @typescript-eslint/no-var-requires */
// Load .env config
require('dotenv').config();

import { startClient } from './start-bot';

process.on('uncaughtException', (error) => {
  console.error('FATAL - uncaughtException', error);
});

process.on('unhandledRejection', (error) => {
  console.error('FATAL - unhandledRejection', error);
});

async function main() {
  try {
    await startClient();
  } catch (err) {
    console.error('App stopped', err);
  }
}

main();
