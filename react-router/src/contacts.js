import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import axios from "axios";
import React, { useEffect, useState } from "react";

export async function getContacts(query) {
    let contacts_promise = await axios
        .get("http://localhost:8000/api/contacts/")
        .catch((err) => console.log(err))

    let contacts = contacts_promise.data;
    if (!contacts) contacts = [];

    if (query) {
        contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
    }

    return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact() {

    let contact = {
        "first": "placeholder",
        "last": "placeholder",
        "twitter": "placeholder",
        "avatar": "placeholder",
        "notes": "placeholder",
        "favorite": false
    }

    let contact_id = []
    let contact_ret = []
    let post1 = await axios.post(`http://localhost:8000/api/contacts/`, contact)
        .then((res) => contact_ret = res)
        ;
    console.log("post for new contact");
    console.log(contact_ret);
    console.log("after post");
    contact_id = contact_ret.data.id
    contact.id = contact_id;
    return contact;
}

export async function getContact(id) {
    let contacts = [];

    let contacts_promise = await axios
        .get("http://localhost:8000/api/contacts/")
        .then((res) => contacts = res.data)
        .catch((err) => console.log(err))


    let contact = contacts.find(contact => contact.id == String(id));

    return contact ?? null;
}

export async function updateContact(id, updates) {
    let contacts = [];

    await axios
        .get("http://localhost:8000/api/contacts/")
        .then((res) => contacts = res.data)
        .catch((err) => console.log(err))

    let contact = contacts.find(contact => String(contact.id) === id);
    if (!contact) throw new Error("No contact found for", id);
    Object.assign(contact, updates);
    console.log('update to apply');
    console.log(updates);
    console.log('updated constact');
    console.log(contact);
    await set(id, contact);
    return contact;
}

export async function deleteContact(id) {

    let del_ret = axios.delete(`http://localhost:8000/api/contacts/${id}/`);

    return true;
}

function set(id, contact) {
    axios.put(`http://localhost:8000/api/contacts/${id}/`, contact);


}

