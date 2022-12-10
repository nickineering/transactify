import {BaseView} from "./BaseView.js";

export class NotFoundView extends BaseView {
    constructor(params) {
        super(params);
        this.setTitle("Page Not Found");
    }

    async handleHtml() {
        this.fillPage(`
            <h1>We could not find that page</h1>
            <p>
                Please try again.
            </p>
        `);
    }
}