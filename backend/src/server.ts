import * as database from './helpers/database';

let db = database.connect();

console.log(db);

database.disconnect(db);
