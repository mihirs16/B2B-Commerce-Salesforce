// module imports
import { LightningElement, api, track } from 'lwc';

// product details popup component
export default class Details extends LightningElement {

    @api product;
    @api accountId;
    @track productDetails;
    @track quantityToOrder;

    // handle quantity input
    handleQuantity (event) {
        this.quantityToOrder = parseFloat(event.target.value);
    }

    // fetch this product's details at render
    connectedCallback () {
        fetch("http://localhost:3001/api/products/"+this.product.Id, { method: 'GET' })
        .then((response) => {
            response.json()
            .then((result) => {
                this.productDetails = result[0];
            });
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong.');
        });
    }

    // dispatch event | toggle product details popup
    closePopup () {
        const closeEvent = new CustomEvent('closeevent', {
            detail: this.product.Id
        });
        this.dispatchEvent(closeEvent);
    }

    // generate new opportunity for given cart
    generateNewOpportunity (newCart) {
        console.log(newCart);
        fetch("http://localhost:3001/api/orders/new/"+this.accountId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newCart)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result);
                alert('Product added to cart.');
            })
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong.');
        });
    }

    // add to existing cart
    addToOpenOpportunity (newProduct, oppId) {
        console.log(newProduct);
        fetch("http://localhost:3001/api/products/add-to-cart/"+oppId, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newProduct)
        })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result);
                alert('Product added to cart.')
            })
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong.');
        });
    }

    // call on render | fetch product list
    addToCart () {
        fetch("http://localhost:3001/api/orders/open/"+this.accountId, {
            method: 'GET'
        })
        .then((response) => {
            response.json()
            .then((result) => {
                if (!result.length) {
                    console.log('Cart is closed.');
                    const newCart = {
                        recvOpportunity: {
                            StageName: "Proposal/Price Quote",
                            AccountID: this.accountId,
                            ProductList: {
                                [this.product.Id]: this.quantityToOrder
                            }
                        }
                    }

                    this.generateNewOpportunity (newCart);

                } else {
                    console.log('Cart is open.');
                    const newProduct = {
                        ProductRecvd: {
                            [this.product.Id]: this.quantityToOrder
                        }
                    }

                    this.addToOpenOpportunity(newProduct, result[0].Id);

                }
            });
        })
        .catch((err) => {
            console.log(err);
            alert('Something went wrong.');
        });
    }

}