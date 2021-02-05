// module imports
import { LightningElement, api, track } from 'lwc';

// product card component
export default class Product extends LightningElement {

    @api product;
    @api accountId;
    @track isProductDetail;

    // toggle product details popup
    toggleDetailsPopup () {
        this.isProductDetail = !this.isProductDetail;
    }

}