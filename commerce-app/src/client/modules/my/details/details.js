// module imports
import { LightningElement, api } from 'lwc';

// product details popup component
export default class Details extends LightningElement {

    @api product;

    closePopup () {
        const closeEvent = new CustomEvent('closeevent', {
            detail: this.product.Id
        });
        this.dispatchEvent(closeEvent);
    }

}