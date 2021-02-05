// module imports
import { LightningElement, track } from 'lwc';

// app component
export default class App extends LightningElement {

    @track productList = [];            // list of products to show
    @track cacheProductList = [];       // list of fetched products
    
    // handling search input
    handleSearch(event) {
        var SearchQuery = event.detail;
        if (SearchQuery.Query && SearchQuery.MinPrice && SearchQuery.MaxPrice) {
            fetch("http://localhost:3001/api/products/search", {
                method: 'POST',
                body: SearchQuery
            }).then((response) => {
                console.log(response);
            }).catch(error => console.log(error));
        }
    }

    // call on render | fetch product list
    connectedCallback() {
        fetch("http://localhost:3001/api/products/all", { method: 'GET' })
        .then((response) => {
            response.json()
            .then((result) => {
                console.log(result)
                this.productList = result;
                this.cacheProductList = this.productList;
            });
        })
        .catch(error => console.log('error', error));
    }
}
