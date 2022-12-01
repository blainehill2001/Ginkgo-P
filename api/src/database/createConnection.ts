import { DataSource } from 'typeorm';

import * as entities from 'entities';

const createDatabaseConnection = new DataSource({
  type: 'mongodb',
  url: process.env.MONGODB_URL,
});

export default createDatabaseConnection;
