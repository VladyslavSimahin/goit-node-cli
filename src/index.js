import { program } from "commander";
import Contacts from "./contacts.js";

program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

// TODO: рефакторити
async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await Contacts.listContacts();

      return contacts;

    case "get":
      const contact = await Contacts.getContactById(id);
      return contact;

    case "add":
      const createContact = await Contacts.addContact({
        id,
        name,
        email,
        phone,
      });
      return createContact;

    case "remove":
      const removeContact = await Contacts.removeContact(id);
      return removeContact;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(program.opts()).then(console.log).catch(console.error);
