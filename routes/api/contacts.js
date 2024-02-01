import express from "express";
const router = express.Router();

import { indexContacts, showContacts, createContacts, deleteContacts, updateContacts, patchContacts } from '#controllers/contacts/index.js';

router.get('/', indexContacts);

router.get('/:contactId', showContacts);

router.post('/', createContacts);

router.delete('/:contactId', deleteContacts);

router.put('/:contactId', updateContacts);

router.patch("/:contactId/favorite", patchContacts);

export { router as contactsRouter };
