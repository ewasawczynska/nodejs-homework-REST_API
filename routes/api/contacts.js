import express from "express";
const router = express.Router();

import { indexContacts, showContacts, createContacts, deleteContacts, updateContacts } from '#controllers/contacts/index.js';

router.get('/', indexContacts)

router.get('/:contactId', showContacts)

router.post('/', createContacts)

router.delete('/:contactId', deleteContacts)

router.put('/:contactId', updateContacts)

export { router as contactsRouter };
