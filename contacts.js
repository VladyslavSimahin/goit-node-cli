const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "/contacts.json");

async function listContacts() {
  // ...твій код. Повертає масив контактів.
  const data = await fs.readFile(`${contactsPath}`, { encoding: "utf-8" });
  return JSON.parse(data);
}
function writeContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
}

async function getContactById(contactId) {
  // ...твій код. Повертає об'єкт контакту з таким id. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();

  const contact = contacts.find((contact) => contact.id === contactId);
  if (!contact === "undefined") {
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  // ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const removeContact = contacts.splice(index, 1)[0];
  await writeContacts(contacts);
  return removeContact;
}

async function addContact(name, email, phone) {
  // ...твій код. Повертає об'єкт доданого контакту (з id).
  const contact = await listContacts();
  const newContact = {
    ...contact,
    id: nanoid(),
    name,
    email,
    phone,
  };

  contact.push(newContact);

  await writeContacts(contact);

  return newContact;
}
module.exports = {
  listContacts,
  writeContacts,
  getContactById,
  removeContact,
  addContact,
};
