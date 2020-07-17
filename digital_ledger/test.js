const { Ledger } = require('./ledger');

let ledger = new Ledger();

ledger.createAccounts([
    { key: 'K#01', name: 'UserA'},
    { key: 'K#02', name: 'UserB'}
]);

// console.log(ledger.getAccountList());

ledger.postTransaction({
    sender: 'K#01',
    receiver: 'K#02',
    amount: 1000
});


console.log(ledger.getBalances());


ledger.postTransaction({
    sender: 'K#02',
    receiver: 'K#01',
    amount: 1000
});


console.log(ledger.getBalances());

//Invalid
[ Balance { key: 'K#01', amount: -1000 },
  Balance { key: 'K#02', amount: 1000 } ]

  //Reversal
  [ Balance { key: 'K#01', amount: 0 },
  Balance { key: 'K#02', amount: 0 } ]
