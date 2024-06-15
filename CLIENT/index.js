const axios       = require('axios');
const { encrypt, symmetricDec } = require('./enc');

const Info = 'A'
const ClientSecret = '23'
console.log('                  ... Hii host');
console.log('                 ',new Date(),'\n');
axios.request({
    method : 'get',
    url: 'http://127.0.0.1:50001',
    Headers:{ 'content-type': 'application/json'}
})
.then(( {data} ) => {
    console.log('...',data);
    console.log(new Date(),'\n');
    return data;
})
.then(({ServerPublicKey}) => {
    console.log('                  ... host SecretTransfer with ServerPublicKey encription');
    console.log('                 ',new Date(),'\n');
    axios.request({
        method : 'post',
        url: 'http://127.0.0.1:50001/SecretTransfer',
        Headers:{ 'content-type': 'application/json'},
        data : {
            ClientName : Info,
            envolope : encrypt(ClientSecret,ServerPublicKey)
        }
    })
    .then(({data})=>data)
    .then(({data}=[]) => {
        const serverResponse = symmetricDec(data,ClientSecret);
        console.log('... got this in encrypted:',JSON.parse(serverResponse));
        console.log(new Date(),'\n');
    })
    .catch(console.error);
})
.catch(console.error)