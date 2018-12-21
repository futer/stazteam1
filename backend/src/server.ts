import * as database from './helpers/database';

const db = database.connect();

database.disconnect(db);
