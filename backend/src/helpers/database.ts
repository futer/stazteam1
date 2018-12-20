import * as mongoose from "mongoose";
import * as env from "../environments/environments";
mongoose.set("useFindAndModify", false);

export function connect() {
  let db = mongoose.createConnection(env.MONGODB_CONN_URI, {
    useNewUrlParser: true
  });
  
  db.useDb(env.MONGODB_DB_NAME);

  db.on("connected", () => {
    console.log("connected to mongodb");
  });

  db.on("disconnected", () => {
    console.log("connection disconnected");
  });

  db.on("error", function(err) {
    console.log("connection to mongo failed " + err);
  });

  return db;
}

export function disconnect(db: mongoose.Connection) {
  if (db) {
    db.close();
  }
}
