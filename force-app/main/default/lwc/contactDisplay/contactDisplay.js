import { LightningElement, wire } from 'lwc';
import pullContact from '@salesforce/apex/contactDisplayController.pullContact';

import contactChannel from '@salesforce/messageChannel/contactChannel__c';
import { MessageContext, subscribe, unsubscribe } from 'lightning/messageService';

export default class ContactDisplay extends LightningElement {

    contactId;

    contactToDisplay;

    @wire(MessageContext)
    context;

    connectedCallback() {
        this.subscription = subscribe( this.context, contactChannel, (message) => this.receiveContactMessage(message));
    }

    disconnectedCallback() {
        unsubscribe(this.subscription);
    }

    @wire(pullContact, { contactId: "$contactId" })
    handleIncomingContact({error, data}) {
        if (data) {
            this.contactToDisplay = data;
            return;
        }

        console.log(error);
    }

    get name() {
        if (!this.contactToDisplay) return 'No Contact';
        return `${this.contactToDisplay.FirstName} ${this.contactToDisplay.LastName}`;
    }

    get phone() {
        if (!this.contactToDisplay) return '---';
        return `${this.contactToDisplay.Phone}`;
    }

    get email() {
        if (!this.contactToDisplay) return '---';
        return `${this.contactToDisplay.Email}`;
    }

    get department() {
        if (!this.contactToDisplay) return 'Unknown';
        return `${this.contactToDisplay.Department}`;
    }

    get title() {
        if (!this.contactToDisplay) return 'Unknown';
        return `${this.contactToDisplay.Title}`;
    }

    get birthdate() {
        if (!this.contactToDisplay) return 'Unknown';
        return `${this.contactToDisplay.Birthdate}`;
    }

    receiveContactMessage(message) {
        if (!message || !message.contactId) {
            console.log("Message received with an empty value.");
            return;
        }
        this.contactId = message.contactId;
    }
}
