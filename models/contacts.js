import { promises as fs } from "fs";
import path from "path";
import { nanoid } from "nanoid";
const contactsPath = path.join(process.cwd(), "db", "contacts.json");

export const listContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
}

export const getContactById = async (contactId) => {
  const allContacts = await listContacts();
  const contact = allContacts.find((contact) => contact.id === contactId);
  if (!contact) {
    throw new Error(`There is no contact with id ${contactId}`);
  }
  return contact;
}

export const removeContact = async (contactId) => {
  const allContacts = await listContacts();
  const filteredContacts = allContacts.filter(
    (contact) => contact.id !== contactId
  );
  fs.writeFile(contactsPath, JSON.stringify(filteredContacts));
}

export const addContact = async ({name, email, phone}) => {
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
    throw new Error(`${newContact.name} is already in contacts list.`);
    return;
  }
  allContacts.push(newContact);
  fs.writeFile(contactsPath, JSON.stringify(allContacts));
  return newContact;
}

export const updateContact = async (contactId, {name, email, phone}) => {
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
