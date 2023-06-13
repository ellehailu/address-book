function AddressBook() {
    this.contacts = {};
    this.currentID = 0;
}

AddressBook.prototype.addContact = function (contact) {
    contact.id = this.assignId();
    this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function () {
    this.currentID += 1;
    return this.currentID;
}

AddressBook.prototype.findContact = function (id) {
    if (this.contacts[id] !== undefined) {
        return this.contacts[id];
    }
    return false;
};

AddressBook.prototype.deleteContact = function (id) {
    if (this.contacts[id] === undefined) {
        return false;
    }
    delete this.contacts[id];
    return true;
};

function Contact(firstName, lastName, phoneNumber, email, homeAddress, workAddress) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.addresses = {email: email, home: homeAddress, work: workAddress};
    }

Contact.prototype.fullName = function () {
   return this.firstName + " " + this.lastName;
}



// User Interface Logic
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
    let contactsDiv = document.querySelector("div#contacts");
    contactsDiv.innerText = null;
    const ul = document.createElement("ul");
    Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
        const contact = addressBookToDisplay.findContact(key);
        const li = document.createElement("li");

        li.append(" ", contact.fullName());
        li.setAttribute("id", contact.id);
        ul.append(li);
        li.append(" ", contact.phoneNumber());
        li.setAttribute("id", contact.id);
        ul.append(li);
        li.append(" ","email: ", contact.addresses.email);
        li.setAttribute("id", contact.id);
        ul.append(li);
        li.append(" ", "Home: ", contact.addresses.home);
        li.setAttribute("id", contact.id);
        ul.append(li);
        li.append(" ", "Work: ", contact.addresses.work);
        li.setAttribute("id", contact.id);
        ul.append(li);

    });
    contactsDiv.append(ul);
}

function handleFormSubmission(event) {
    event.preventDefault();
    const inputtedFirstName = document.querySelector("input#new-first-name").value;
    const inputtedLastName = document.querySelector("input#new-last-name").value;
    const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
    const inputtedEmail = document.querySelector("input#new-email").value;
    const inputtedHomeAddress = document.querySelector("input#new-home-address").value;
    const inputtedWorkAddress = document.querySelector("input#new-work-address").value;
    let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, inputtedEmail, inputtedHomeAddress, inputtedWorkAddress);
    // let newAddress = new Address();
    addressBook.addContact(newContact);
    console.log(addressBook.contacts);
    listContacts(addressBook);
}

window.addEventListener("load", function () {
    document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
});

