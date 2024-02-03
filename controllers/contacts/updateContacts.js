import Contact from '#schemas/contact.js';

export const updateContacts = async (req, res) => {
    const { contactId } = req.params;
    const body = req.body;
    if (Object.keys(req.body).length === 0) {
      res.status(400).json({ message: 'missing fields' });
      return;
    }
    try {
      await Contact.findByIdAndUpdate(contactId, body);
      return res.status(200).json({
        contactId, ...body
      });
    } catch (error) {
      console.log(error);
      res.status(404).json({ message: 'not found' });
    }
  }
