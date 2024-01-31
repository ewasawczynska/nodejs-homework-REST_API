import Contact from '#schemas/contact.js';

export const patchContacts = async (req, res, next) => {
  const { contactId } = req.params;
  const { favourite } = req.body;
  if (favourite === undefined) {
    return res.status(400).json({
      message: "missing field favorite",
    });
  }
  try {
    const contact = await Contact.findByIdAndUpdate(contactId, { favourite });
    contact.favourite = favourite;
    res.status(200).json({
      data: contact,
    });
  } catch (error) {
    return res.status(404).json({
      message: "not found",
    });
  }
};