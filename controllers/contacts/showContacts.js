import { getContactById } from '#models/contacts.js';

export const showContacts = async (req, res, next) => {
    try {
    const { contactId } = req.params;
    const contacts = await getContactById(contactId);
    return res.status(200).json(contacts);
    } catch {
    res.status(404).json({message: 'Not found'});
    };
  }
