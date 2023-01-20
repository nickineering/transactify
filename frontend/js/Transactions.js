import {cookieExists} from "./util.js";

export class Transactions {
    constructor() {
        this.transactions = new Map();
        this.sortKey = "created";
        this.sortDir = "desc";
        this.chunkSize = 100;
        this.fetch();
    }

    async get(id) {
        await Promise.race([this.fetchPromise]);
        return this.transactions.get(id);
    }

    async wipe() {
        await Promise.race([this.fetchPromise]);
        this.transactions = new Map();
    }

    set(transaction) {
        this.transactions.set(transaction.transactionID, transaction);
    }

    search(query) {
        this.query = query;
    }

    orderBy(sortKey, sortDir) {
        this.sortKey = sortKey;
        this.sortDir = sortDir;
    }

    async list(startPage = 0) {
        await Promise.race([this.fetchPromise]);

        const start = startPage * this.chunkSize;
        if (start > this.transactions.size) {
            return [];
        }

        let transactionArray = Array.from(this.transactions.values());
        if (this.query) {
            transactionArray = transactionArray.filter((transaction) => {
                return transaction.merchant
                    .toLowerCase()
                    .includes(this.query.toLowerCase());
            });
        }

        const sorted = transactionArray.sort((a, b) => {
            if (typeof a[this.sortKey] === "number") {
                if (this.sortDir === "asc") {
                    return a[this.sortKey] - b[this.sortKey];
                }
                return b[this.sortKey] - a[this.sortKey];
            }
            if (this.sortDir === "asc") {
                return String(a[this.sortKey]).localeCompare(
                    b[this.sortKey].toString(),
                );
            }
            return String(b[this.sortKey]).localeCompare(String(a[this.sortKey]));
        });

        return sorted.slice(start, start + this.chunkSize);
    }

    fetch() {
        if (cookieExists("authToken")) {
            this.fetchPromise = fetch("/api/transaction.php")
                .then((response) => response.json())
                .then((data) => {
                    const earlyTransactions = this.transactions;
                    this.transactions = new Map(
                        data.transactions.map((transaction) => [
                            transaction.transactionID,
                            transaction,
                        ]),
                    );
                    earlyTransactions.forEach((transaction) => {
                        this.set(transaction);
                    });
                })
                .catch(() => {
                    alert("Could not load transactions. Please try again later.");
                });
        }
    }
}
