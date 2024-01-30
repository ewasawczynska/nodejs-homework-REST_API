import Contact from '#schemas/contact.js';

export const deleteContacts = async (req, res, next) => {
    const { contactId } = req.params;
    try {
      await Contact.findByIdAndRemove({ _id: contactId })
      res.status(200).json({ message: 'contact deleted'});
      return;
    }
    catch(error) {
      res.status(404).json({ message: 'not found'});
    }
  }

