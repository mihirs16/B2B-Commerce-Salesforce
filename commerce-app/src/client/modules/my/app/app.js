// module imports
import { LightningElement, track } from 'lwc';

// app component
export default class App extends LightningElement {

    @track productList = [];            // list of products to show
    @track cacheProductList = [];       // list of fetched products
    
    // handling search request
    handleSearch(event) {
        var SearchQuery = {
            Query: event.detail
        };
        
        console.log("fetch", JSON.stringify(SearchQuery));
        
        if (SearchQuery.Query.QueryString && SearchQuery.Query.MinPrice && SearchQuery.Query.MaxPrice) {
        
            fetch("http://localhost:3001/api/products/search", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SearchQuery)
            })
            .then((response) => {
            
                response.json()
                .then((result) => {
                    console.log(result);
            
                    result.forEach(element => {
                        element.Id = element.Product2Id;
                    });
                    this.productList = result;
                })
            
            })
            .catch(error => console.log(error));
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
