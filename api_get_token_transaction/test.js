const https = require('https');

var url = 'https://api.etherscan.io/api?module=account&action=tokenbalance';
url += '&contractaddress=0x253c4bcc5a4af985214165b6f1c7488f219e5e9a';
url += '&address=0x8090d59FB5Dca45b9aa99e7285EFC350cB5D7BDA';
url += '&tag=latest';
url += '&apikey=QAT6A1YNQWW3FSE3AXFCHZ5956Z91JC8DN';

https.get(url, (resp)=>{
    let data = '';

    resp.on('data', (chunk) => {
        data += chunk;
    });

    resp.on('end', () => {
        console.log(JSON.parse(data));
    });

});




