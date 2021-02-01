// module imports
import { LightningElement, api, track } from 'lwc';

// product card component
export default class Product extends LightningElement {

    @api product;
    @track isProductDetail;

    toggleDetailsPopup () {
        this.isProductDetail = !this.isProductDetail;
    }

}