const fs = require("fs/promises");
const path = require("path");
const { v4 } = require("uuid");


const contactsPath = path.resolve(__dirname, "./contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;

}

async function getContactById(contactId) {
  try {
    const contacts = await listContacts();
    const result = contacts.find(({ id }) => id === contactId);
    return result;
  } catch (error) {
    console.log(error.message);
  }
}

async function updateContact(id, data) {
  const contactId = String(id);
    const contacts = await listContacts();
    const index = contacts.findIndex(item => item.id === contactId);
    if(index === -1){
        return null;
    }
    contacts[index] = {id, ...data};
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}

async function addContact(data) {
  try {
    const contacts = await listContacts();
    const newContact = {
        id: v4(),
        ...data,
    }
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return newContact;
  } catch (error) {
    console.log(error);
  }
}

async function removeContact(contactId) {
  try {
    const allContacts = await listContacts();
    const changedCollection = allContacts.filter(({ id }) => id !== contactId);
    updateContact(changedCollection);
    return allContacts.filter(({ id }) => id === contactId);
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};