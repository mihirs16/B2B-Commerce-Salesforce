// module imports
import { LightningElement, api, track } from 'lwc';

// orders component
export default class Orders extends LightningElement {

    @api accountId;
    @track opportunityList;

    // dispatch event | toggle orders popup
    handleClosePopup (event) {
        const closeEvent = new CustomEvent ('closeevent');
        this.dispatchEvent(closeEvent);
    }

    // fetch orders on render
    connectedCallback () {

        // fetch for this accountID
        fetch("http://localhost:3001/api/orders/all/"+this.accountId, { method: 'GET' })
        .then((response) => {
            response.json()
            .then((result) => {
                this.opportunityList = result;
            });
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong.');
        });
    }
}