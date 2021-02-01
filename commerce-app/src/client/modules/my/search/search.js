// module imports
import { LightningElement, track } from 'lwc';

// export component
export default class Search extends LightningElement {

    handleSearch (event) {
        const searchEvent = new CustomEvent('searchevent', {
            detail: event.target.value.toLowerCase()
        });
        this.dispatchEvent(searchEvent);
    }

}