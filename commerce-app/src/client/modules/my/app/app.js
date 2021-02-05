// module imports
import { LightningElement, track } from 'lwc';

// app component
export default class App extends LightningElement {

    @track productList = [];            // list of products to show
    @track cacheProductList = [];       // list of fetched products
    @track isOrderPopup;                // state of orders popup
    @track isCartPopup;                 // state of cart popup
    accountId;                          // account id for current user
    
    // toggle order popup
    toggleOrdersPopup () {
        this.isOrderPopup = !this.isOrderPopup;
    }

    // toggle cart popup
    toggleCartPopup () {
        this.isCartPopup = !this.isCartPopup;
    }

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
        this.accountId = '0015g000004iUKlAAM';

        fetch("http://localhost:3001/api/products/all", { method: 'GET' })
        .then((response) => {
            response.json()
            .then((result) => {
                this.productList = result;
                this.cacheProductList = this.productList;
            });
        })
        .catch(error => console.log('error', error));
    }
}
