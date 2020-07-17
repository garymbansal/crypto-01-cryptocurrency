const { Storage } = require('./storage');
const { Account, Transaction } = require('./entities');

class Ledger {

    constructor({ storage = new Storage() } = {}) {
        Object.defineProperty(this, 'storage', {
            configurable: true,
            get: () => storage,
        });
    }

    createAccounts(accounts = []) {
        for (let meta of accounts) {
            let account = new Account(meta);
            this.storage._createAccount(account);
        }
    }
    getAccountList() {
        return this.storage._getAccounts();
    }
    getAccount(key) {
        return this.storage._getAccount(key);
    }

    postTransaction(tx) {
        if (this.storage._validateTransaction(tx)) {
            this.storage._postTransaction(tx);
        }
    }
    getTransactionList() {
        return this.storage._getTransactions();
    }
    getBalances() {
        return this.storage._getBalances();
    }
}

module.exports = { Ledger };
