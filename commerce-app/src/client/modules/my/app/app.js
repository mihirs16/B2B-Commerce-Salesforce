import { LightningElement, track } from 'lwc';

export default class App extends LightningElement {

    @track productList;
    @track isProductDetail;

    connectedCallback() {
        var requestOptions = {
            method: 'GET',
        };
          
        fetch("http://localhost:3001/api/products", requestOptions)
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result)
                this.productList = result.records;
            });
        })
        .catch(error => console.log('error', error));
    }

    toggleProductDetail () {
        this.isProductDetail = !this.isProductDetail;
    }
}
