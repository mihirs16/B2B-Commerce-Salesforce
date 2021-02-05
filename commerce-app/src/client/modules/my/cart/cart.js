// module imports
import { LightningElement, track, api } from 'lwc';

// export cart component
export default class Cart extends LightningElement {

    @api accountId;
    @track cartDetails;
    @track productList;
    

    // fetch all products currently in opportunity
    getCartProducts (opp) {
    
        fetch("http://localhost:3001/api/products/from-opp/"+opp.Id, {
            method: 'GET'
        })
        .then((response) => {
            response.json()
            .then((result) => {
                this.productList = result;
            })
        })
        .catch(err => console.log(err));

        return { order: opp };
    }

    // fetch open carts on render (if any)
    connectedCallback () {

        fetch("http://localhost:3001/api/orders/open/"+this.accountId, {
            method: 'GET'
        })
        .then((response) => {
            response.json()
            .then((result) => {
                this.getCartProducts (result[0]);
                this.cartDetails = result[0];
            });
        })
        .catch(err => console.log(err));

    }

    
}