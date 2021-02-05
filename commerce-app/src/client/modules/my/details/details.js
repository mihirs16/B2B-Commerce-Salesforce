// module imports
import { LightningElement, api, track } from 'lwc';

// product details popup component
export default class Details extends LightningElement {

    @api product;
    @track productDetails;

    connectedCallback () {
        fetch("http://localhost:3001/api/products/"+this.product.Id, { method: 'GET' })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result);
                this.productDetails = result[0];
            });
        })
        .catch(error => console.log('error', error));
    }

    closePopup () {
        const closeEvent = new CustomEvent('closeevent', {
            detail: this.product.Id
        });
        this.dispatchEvent(closeEvent);
    }

}