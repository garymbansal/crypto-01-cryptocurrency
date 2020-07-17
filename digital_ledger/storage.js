class Balance {
    constructor(key, amount = 0) {
        this.key = key;
        this.amount = amount;
    }
}
class Storage {
    constructor() {
        this._accounts = [];
        this._transactions = [];
        this._balances = [];

    }
    _createAccount({ key, name }) {
        this._accounts.push({ key, name });
    }
    _getAccounts() {
        return this._accounts;
    }
    _getAccount(key) {
        return this._accounts.find(account => account.key === key);
    }
    _validateTransaction() {
        //code todo:
        return true;
    }
    _postTransaction(tx) {
        this._transactions.push(tx);
        this._updateBalances(tx.sender, tx.amount, true);
        this._updateBalances(tx.receiver, tx.amount, false);
    }
    _getTransactions() {
        return this._transactions;
    }
    _updateBalances(key, amount = 0, debit = true) {
        var s = this._balances.findIndex(balance => balance.key === key);
        if (s == -1) {
            if (debit)
                amount = 0 - amount;
            let balance = new Balance(key, amount);
            this._balances.push(balance);
        }
        else {
            if (debit)
                this._balances[s].amount = this._balances[s].amount - amount;
            else
                this._balances[s].amount = this._balances[s].amount + amount;
        }

    }
    _getBalances() {
        return this._balances;
    }
}

module.exports = { Storage };