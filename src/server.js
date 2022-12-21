import express from "express";
import listEndpoints from "express-list-endpoints";
import blogPostsRouter from "./api/blogposts/index.js";
import cors from "cors";
import {
  genericErrorHandler,
  notFoundHandler,
  badRequestHandler,
  unauthorizedHandler,
} from "./errorHandlers.js";

const server = express();
const port = 3001;

//place your global middlewares here

// const loggerMiddleware = (req, res, next) => {
//   // console.log(req.headers)
//   console.log(`Request method ${req.method} -- url ${req.url} -- ${new Date()}`)
//   next() // gives the control to whom is coming next (either another middleware or route handler)
// }

// server.use(loggerMiddleware)

//middleware that parses the response and gives us an object

server.use(cors());
server.use(express.json());

server.use("/blogPosts", blogPostsRouter);

server.use(badRequestHandler); // 400
server.use(unauthorizedHandler); // 401
server.use(notFoundHandler); // 404
server.use(genericErrorHandler); // 500

//server needs to run
server.listen(port, () => {
  console.table(listEndpoints(server));
});
