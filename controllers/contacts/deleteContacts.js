import Contact from '#schemas/contact.js';

export const deleteContacts = async (req, res) => {
    const { contactId } = req.params;
    try {
      await Contact.findByIdAndDelete({ _id: contactId })
      res.status(200).json({ message: 'contact deleted'});
      return;
    }
    catch(error) {
      res.status(404).json({ message: 'not found'});
    }
  }

