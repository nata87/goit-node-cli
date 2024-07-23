import fs from "node:fs/promises";
import path from "node:path";

import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const updateListContacts = (contacts) =>
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

export async function listContacts() {
  const result = await fs.readFile(contactsPath);
  return JSON.parse(result);
}

export async function getContactById(id) {
  const contacts = await listContacts();
  const res = contacts.find((contact) => contact.id === id);
  return res || null;
}

export async function removeContact(id) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === id);
  if (index === -1) return null;
  const res = contacts.splice(index, 1);
  await updateListContacts(contacts);
  return res;
}

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContacts = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContacts);
  await updateListContacts(contacts);

  return newContacts;
}
