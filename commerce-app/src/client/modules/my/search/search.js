// module imports
import { LightningElement, track } from 'lwc';

// export component
export default class Search extends LightningElement {

    handleInput (event) {
        console.log(event.target.id);
    }

    handleSearch (event) {
        event.preventDefault();
        var searchObject = {
            Query: this.template.querySelector('input')[0].value,
            MinPrice: this.template.querySelector('input')[1].value,
            MaxPrice: this.template.querySelector('input')[2].value
        }
        
        const searchEvent = new CustomEvent('searchevent', {
            detail: searchObject 
        });

        this.dispatchEvent(searchEvent);
        console.log(searchObject);
    }

}