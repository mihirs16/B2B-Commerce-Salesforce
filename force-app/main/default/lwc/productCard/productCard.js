import { LightningElement, api, wire, track } from 'lwc';
import { getRecord } from 'lightning/uiRecordApi';

const FIELDS = [
    'Product__c.Name',
    'Product__c.Unit_Price__c'
];

export default class ProductCard extends LightningElement {
    @api recordId;
    @track name;
    @track price;

    @wire (getRecord, { recordId: 'a005g00002pMeI3AAK', fields: FIELDS }) product;

    get name () {
        return this.product.data.fields.Name.value;
    }

    get price () {
        return this.product.data.fields.Unit_Price__c.value;
    }
}