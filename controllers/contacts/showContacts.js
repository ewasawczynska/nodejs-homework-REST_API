import Contact from '#schemas/contact.js';

export const showContacts = async (req, res, next) => {
  const { contactId } = req.params;
    try {
    const contacts = await Contact.findOne({ _id: contactId });
    return res.status(200).json(contacts);
    } catch {
    res.status(404).json({message: 'Not found'});
    };
  }
