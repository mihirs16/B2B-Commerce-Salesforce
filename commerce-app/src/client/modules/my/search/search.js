// module imports
import { LightningElement, track } from 'lwc';

// export component
export default class Search extends LightningElement {

    @track inputText;
    @track inputMin;
    @track inputMax;

    handleInput (event) {
        switch (event.target.id) {
            case 'Query-1': this.inputText = event.target.value; break;
            case 'MinPrice-1': this.inputMin = event.target.value; break;
            case 'MaxPrice-1': this.inputMax = event.target.value; break;
            default: break;
        }
    }

    handleSearch (event) {
        event.preventDefault();
        var searchObject = {
            QueryString: this.inputText,
            MinPrice: parseInt(this.inputMin),
            MaxPrice: parseInt(this.inputMax)
        }
        
        const searchEvent = new CustomEvent('searchevent', {
            detail: searchObject 
        });

        this.dispatchEvent(searchEvent);
    }

}