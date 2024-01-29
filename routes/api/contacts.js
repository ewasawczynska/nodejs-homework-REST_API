import express from "express";
const router = express.Router();
import { validation } from "#validation/validation.js";

import { indexContacts, showContacts, createContacts, deleteContacts, updateContacts } from '#controllers/contacts/index.js';

router.get('/', indexContacts)

router.get('/:contactId', showContacts)

router.post('/', validation, createContacts)

router.delete('/:contactId', deleteContacts)

router.put('/:contactId', validation, updateContacts)

export { router as contactsRouter };
