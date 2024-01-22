const express = require('express')

const router = express.Router()

import { listContacts, getContactById, addContact } from '../../models/contacts.js'

router.get('/', async (req, res, next) => {
  const allContacts = await listContacts();
  return res.status(200).json(allContacts);
})

router.get('/:contactId', async (req, res, next) => {
  const { contactId } = req.params;
  try {
  const contacts = getContactById(contactId);
  return res.status(200).json(contacts);
  } catch {
  res.status(404).json({message: 'Not found'});
  };
})

router.post('/', async (req, res, next) => {
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
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
