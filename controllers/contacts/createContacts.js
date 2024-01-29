import {  addContact } from '#models/contacts.js';

export const createContacts = async (req, res, next) => {
    const body = req.body;
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: 'missing required field' });
      return;
    }
    else {
      const contact = await addContact(body);
      res.status(201).json(contact)
    }
  }
