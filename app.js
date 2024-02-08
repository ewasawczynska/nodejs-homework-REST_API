import express from "express";
import logger from "morgan";
import cors from "cors";

import { contactsRouter } from "./routes/contacts.js";
import { usersRouter } from "./routes/users.js";
import { jwtMiddleware } from "#middleware/middleware.js";

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

jwtMiddleware(app);
app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use('/contacts', contactsRouter)
app.use('/users', usersRouter)

app.use((_, res, __) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

export { app };
