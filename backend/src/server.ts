import * as database from './helpers/database';

let db = database.connect();

database.disconnect(db);
