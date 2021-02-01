// module imports
import { LightningElement, track } from 'lwc';

// app component
export default class App extends LightningElement {

    @track productList;         // list of fetched products

    // call on render | fetch product list
    connectedCallback() {
        fetch("http://localhost:3001/api/products", { method: 'GET' })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result)
                this.productList = result.records;
            });
        })
        .catch(error => console.log('error', error));
    }
}
