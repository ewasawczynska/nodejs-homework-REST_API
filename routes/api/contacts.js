import express from "express";
const router = express.Router();
import { validation } from "../../validation/validation.js";
import { listContacts, getContactById, addContact, removeContact, updateContact } from '../../models/contacts.js';

router.get('/', async (req, res, next) => {
  const allContacts = await listContacts();
  return res.status(200).json(allContacts);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
  const contacts = await getContactById(contactId);
  return res.status(200).json(contacts);
  } catch {
  res.status(404).json({message: 'Not found'});
  };
})

router.post('/', validation, async (req, res, next) => {
  const body = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing required field' });
    return;
  }
  else {
    const contact = await addContact(body);
    res.status(201).json(contact)
  }
})

router.delete('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
    await removeContact(contactId);
    res.status(200).json({ message: 'contact deleted'});
    return;
  }
  catch(error) {
    res.status(404).json({ message: 'not found'});
  }
})

router.put('/:contactId', validation, async (req, res, next) => {
  const { contactId } = req.params;
  const body = req.body;
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing fields' });
    return;
  }
  try {
    const contact = await updateContact(contactId, body);
    return res.status(200).json(contact);
  } catch (error) {
    res.status(404).json({ message: 'not found' });
  }
})

export { router as contactsRouter };
