// module imports
import { LightningElement, track, api } from 'lwc';

// export cart component
export default class Cart extends LightningElement {

    @api accountId;
    @track cartDetails;
    @track productList;
    
    // delete item from cart
    delCartItem (event) {
        const thisCart = JSON.parse(JSON.stringify(this.cartDetails));
        
        var cartItemToDel = {
            oppId: thisCart.Id,
            prodId: event.target.dataset['item']
        }

        fetch("http://localhost:3001/api/products/del-from-cart", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cartItemToDel)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result);
                this.getCartProducts({ Id: cartItemToDel.oppId });
            })
        })
        .catch(err => console.log(err));
    }

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
                this.getCartProducts(result[0]);
                this.cartDetails = result[0];
            });
        })
        .catch(err => console.log(err));

    }

    // dispatch event | close cart popup
    closeCartPopup () {
        const closeEvent = new CustomEvent('closeevent');
        this.dispatchEvent(closeEvent);
    }
    
}