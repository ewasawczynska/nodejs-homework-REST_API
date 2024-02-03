import express from "express";
import logger from "morgan";
import cors from "cors";

import { contactsRouter } from "./routes/api/contacts.js";

const app = express();

const formatsLogger = app.get('env') === 'development' ? 'dev' : 'short'

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use('/contacts', contactsRouter)

app.use((_, res, __) => {
  res.status(404).json({ message: 'Not found' })
})

app.use((err, _, res, __) => {
  res.status(500).json({ message: err.message })
})

export { app };
