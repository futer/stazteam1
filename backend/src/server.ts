// import "reflect-metadata";

// import * as express from "express";
// import * as http from "http";
// import { AddressInfo } from "net";
// import * as graphqlHTTP from "express-graphql";
// import { Request, Response, NextFunction } from "express-serve-static-core";

// import { ChatWebSocket } from "./websockets/chat.websocket";
// import { buildSchemaSync, AuthChecker } from "type-graphql";
// import { UserResolver } from "./resolvers/user.resolver";

// const app = express();
// const server = http.createServer(app);
// const chatSocket = new ChatWebSocket(server);

// const customAuthChecker: AuthChecker =
//   ({ root, args, context, info }, roles) => {
//     console.log(args);
//     console.log(roles);
//     let ctx: Request = context as Request;
//     // console.log(ctx.headers.authorization);

//     return true;
//   }

// const schema = buildSchemaSync({
//   resolvers: [UserResolver],
//   authChecker: customAuthChecker
// });

// app.use("/graphql", graphqlHTTP({
//   schema: schema,
//   graphiql: true,
// }));

// app.route("/").get((req: Request, res: Response, next: NextFunction) => {
//   res.status(200).send({ message: "aaa" });
// });

// server.listen(3000, () => {
//   const { port } = server.address() as AddressInfo;
//   console.log(`Server started on port ${port}`);
// });

//...