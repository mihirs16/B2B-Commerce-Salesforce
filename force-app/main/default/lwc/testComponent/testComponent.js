import { LightningElement, api } from 'lwc';

export default class TestComponent extends LightningElement {
    @api testButton;

    handleClick() {
        console.log("Button Clicked!");
    }
}
