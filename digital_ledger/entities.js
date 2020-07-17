class Account {
    constructor({ key, name = '' }, storage) {
        if (!key) {
            throw new Error('Undefined key');
        }
        this.key = key;
        this.name = name;
        this._attach(storage);
    }


    _attach(storage) {
        Object.defineProperty(this, 'storage', {
            configurable: true,
            get: () => storage,
        });
    }
}
class Transaction {
    constructor({ sender, receiver, amount }, storage) {
        this.sender = sender;
        this.receiver = receiver;
        this.amount = amount;
        this.stamp = new Date();

        this._attach(storage);
    }

    _attach(storage) {
        Object.defineProperty(this, 'storage', {
            configurable: true,
            get: () => storage,
        });
    }
}
module.exports = { Account, Transaction };