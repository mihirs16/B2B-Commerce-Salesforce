// module imports
import { LightningElement, track } from 'lwc';

// app component
export default class App extends LightningElement {

    @track productList = [];            // list of products to show
    @track cacheProductList = [];       // list of fetched products
    
    // handling search input
    handleSearch(event) {
        this.productList = this.cacheProductList.filter(
            product => product.Name.toLowerCase().includes(event.detail)
        );
    }

    // call on render | fetch product list
    connectedCallback() {
        fetch("http://localhost:3001/api/products", { method: 'GET' })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result)
                this.productList = result.records;
                this.cacheProductList = this.productList;
            });
        })
        .catch(error => console.log('error', error));
    }
}
