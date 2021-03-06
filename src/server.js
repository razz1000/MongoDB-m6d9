import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import listEndpoints from "express-list-endpoints";
import {
  badRequestHandler,
  notFoundHandler,
  genericErrorHandler,
} from "./errorHandlers.js";
import blogPostRouter from "./apis/blog/index.js";
import commentRouter from "./apis/comment/index.js";
import authorsRouter from "./apis/authors/index.js";
import usersRouter from "./apis/users/index.js";
import likesRouter from "./apis/likes/index.js";

const server = express();
const port = process.env.PORT || 3001;

// ****************************************************** MIDDLEWARES **********************************************

server.use(cors());
server.use(express.json());

// ******************************************************* ENDPOINTS ***********************************************

server.use("/blogposts", blogPostRouter);
server.use("/comments", commentRouter);
server.use("/authors", authorsRouter);
server.use("/users", usersRouter);
server.use("/likes", likesRouter);

// ***************************************************** ERROR HANDLERS ********************************************

server.use(badRequestHandler);
server.use(notFoundHandler);
server.use(genericErrorHandler);

mongoose.connect(process.env.MONGO_CONNECTION_URL);

mongoose.connection.on("connected", () => {
  console.log("Successfully connected to Mongo!");
  server.listen(port, () => {
    console.table(listEndpoints(server));
    console.log(`Server is running on port ${port}`);
  });
});
