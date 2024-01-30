import Contact from '#schemas/contact.js';

export const indexContacts = async (req, res, next) => {
    try { 
        const allContacts = await Contact.find();
        return res.status(200).json({ data: allContacts });
    } catch (err) {
        res.status(500).json(`An error occurred: ${err}`);
    }
  }
