import { LightningElement } from 'lwc';

export default class App extends LightningElement {
    connectedCallback() {
        var requestOptions = {
            method: 'GET',
        };
          
        fetch("http://localhost:3001/api/products", requestOptions)
        .then((response) => {
            response.json()
            .then((result) => {console.log(result)});
        })
        .catch(error => console.log('error', error));
    }
}
