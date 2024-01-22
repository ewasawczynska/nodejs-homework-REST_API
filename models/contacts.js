const fs = require('fs/promises')
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.join(process.cwd(), "contacts.json");

const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath, { encoding: "utf-8" });
  if (!contacts) {
    throw new Error("There are no contacts".red);
  }
  return JSON.parse(contacts);
}

const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error(`There is no contact with id ${contactId}`.red);
  }
  return contact;
}

const removeContact = async (contactId) => {
  const allContacts = await listContacts();
    const filteredContacts = allContacts.filter(
      (contact) => contact.id !== contactId
    );
    fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
}

const addContact = async ({name, email, phone}) => {
  const allContacts = await listContacts();
  const newContact = {
    contactId: nanoid(),
    name,
    email,
    phone,
  };

  const existingContact = allContacts.find(
    (contact) => contact.name.toLowerCase() === name.toLowerCase()
  );

  if (existingContact) {
    throw new Error(`${newContact.name} is already in contacts list.`.red);
    return;
  }
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

const updateContact = async (contactId, {name, email, phone}) => {
  const allContacts = listContacts();
  const existingContact = allContacts.find(
    (contact) => contact.id === contactId
  );
  if (existingContact) {
    existingContact.name = name;
    existingContact.email = email;
    existingContact.phone = phone;
    await fs.writeFile(contactsPath, JSON.stringify(allContacts));
    return existingContact;
  } else {
    const newContact = await addContact({name, email, phone});
    return newContact;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
}
