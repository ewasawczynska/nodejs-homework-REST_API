import { listContacts } from '#models/contacts.js';

export const indexContacts = async (req, res, next) => {
    try { 
        const allContacts = await listContacts();
        return res.status(200).json(allContacts);
    } catch (err) {
        res.status(500).json(`An error occurred: ${err}`);
    }
  }
