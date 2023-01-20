import {fillModal, formatCurrency, setTitle, toCheckbox} from "../util.js";
import {BaseView} from "./BaseView.js";
import {Home} from "./Home.js";

export class ViewTransaction extends BaseView {
    async handleHtml() {
        const key = window.location.pathname.split("/").pop();
        this.transaction = await this.transactions.get(key);
        if (!this.transaction) {
            this.navigateTo(null);
            return;
        }
        this.background = new Home();
        setTitle("View Transaction");
        const date = new Date(this.transaction.created).toLocaleDateString();
        fillModal(
            this.navigateTo,
            `
            <h1>${this.transaction.merchant}</h1>
            <h2>(${date})</h2>
            <table>
                ${this.getDetails()}
            </table>
            <a href="/" class="button bottom-button" ajax-link>Close</a>
        `,
        );
    }

    getDetails() {
        return `
            <tr>
                <td>Amount</td>
                <td>${formatCurrency(
                    this.transaction.amount,
                    this.transaction.currency,
                )}</td>
            </tr>
            ${
                this.transaction.bank
                    ? `
            <tr>
                <td>Bank</td>
                <td>${this.transaction.bank}</td>
            </tr>
                `
                    : ""
            }
            <tr>
                <td>Billable</td>
                <td>${toCheckbox(this.transaction.billable)}</td>
            </tr>
            <tr>
                <td>Card Name</td>
                <td>${this.transaction.cardName}</td>
            </tr>
            <tr>
                <td>Category</td>
                <td>${this.transaction.category}</td>
            </tr>
            ${
                this.transaction.comment
                    ? `
            <tr>
                <td>Comment</td>
                <td>${this.transaction.comment}</td>
            </tr>
                `
                    : ""
            }
            ${
                this.transaction.currency !== "USD"
                    ? `
            <tr>
                <td>Converted Amount</td>
                <td>${formatCurrency(this.transaction.convertedAmount, "USD")}</td>
            </tr>
            <tr>
                <td>Currency Conversion Rate</td>
                <td>${this.transaction.currencyConversionRate}</td>
            </tr>
                `
                    : ""
            }
            ${
                this.transaction.details
                    ? `
            <tr>
                <td>Details</td>
                <td>${this.transaction.details}</td>
            </tr>
                `
                    : ""
            }
            <tr>
                <td>Managed Card</td>
                <td>${toCheckbox(this.transaction.managedCard)}</td>
            </tr>
            <tr>
                <td>Merchant Category Code</td>
                <td>${this.transaction.mcc}</td>
            </tr>
            <tr>
                <td>Receipt State</td>
                <td>${this.transaction.receiptState}</td>
            </tr>
            <tr>
                <td>Reimbursable</td>
                <td>${toCheckbox(this.transaction.reimbursable)}</td>
            </tr>
            ${
                this.transaction.tag
                    ? `
            <tr>
                <td>Tag</td>
                <td>${this.transaction.tag}</td>
            </tr>
                `
                    : ""
            }
            <tr>
                <td>Unverified</td>
                <td>${toCheckbox(this.transaction.unverified)}</td>
            </tr>
        `;
    }
}
